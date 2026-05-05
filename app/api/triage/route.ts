// app/api/triage/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MEDICAL_SERVICES } from '@/app/data/medical'; // Ensure this path matches your structure

// Lazy initialization - only create client when needed (at runtime, not build time)
function getOpenAIClient() {
  return new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.GITHUB_TOKEN || '', // Make sure this is in your .env.local file
  });
}

export async function POST(req: Request) {
  try {
    const token = process.env.GITHUB_TOKEN || '';
    console.log("Token starts with:", token.substring(0, 15), "...");
    const { symptoms } = await req.json();

    if (!symptoms) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 });
    }

    // 1. Prepare your doctor data so the AI knows who is available
    const availableDoctors = MEDICAL_SERVICES.flatMap(dept => 
      dept.doctors.map(doc => ({
        id: doc.id,
        name: doc.name,
        department: dept.title,
        specialty: doc.specialty,
        keywords: doc.keywords
      }))
    );

    // 2. Build the prompt for the GitHub Model
    const systemPrompt = `
      You are an expert medical triage assistant. 
      Analyze the patient's symptoms and provide a brief clinical summary and the most likely underlying issue.
      Then, review the following list of available doctors and select the ONE doctor who is best suited to treat this issue based on their specialty and keywords.
      
      Available Doctors: ${JSON.stringify(availableDoctors)}
      
      You MUST respond in strict JSON format matching this structure exactly:
      {
        "summary": "Brief clinical summary of the symptoms...",
        "likelyIssue": "The most likely medical issue...",
        "recommendedDoctorId": "the exact ID of the matched doctor (e.g., 'd1')"
      }
    `;

    // 3. Call the GitHub Model (using gpt-4o or another available model)
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Patient Symptoms: ${symptoms}` }
      ],
      response_format: { type: "json_object" }, // Forces the AI to return JSON
      temperature: 0.1, // Keep it highly factual
    });

    const aiResult = JSON.parse(response.choices[0].message.content || '{}');
    
    return NextResponse.json(aiResult);

  } catch (error: any) {
    console.error("Triage API Error:", error);
    return NextResponse.json({ error: "Failed to analyze symptoms" }, { status: 500 });
  }
}