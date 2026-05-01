import { Activity, Brain, Heart, Baby, Ear, Stethoscope } from 'lucide-react';

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialty: string;
  experience: string;
  description: string;
  shiftStart: number; // 24h format (e.g., 9 = 9 AM)
  shiftEnd: number;   // 24h format (e.g., 17 = 5 PM)
  keywords: string[]; // For AI matching simulation
}

export interface MedicalService {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  doctors: Doctor[];
}


export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'gen-med',
    title: 'General Medicine',
    category: 'Primary Care',
    description: 'Comprehensive care for common illnesses and chronic conditions.',
    icon: Stethoscope,
    doctors: [
      { 
        id: 'd1', 
        name: 'Dr. Sarah Jenkins', 
        department: 'General Medicine',
        specialty: 'Internal Medicine', 
        experience: '12+ Years',
        description: 'Specializes in the diagnosis and non-surgical treatment of adult diseases, focusing on chronic condition management like diabetes and hypertension.',
        shiftStart: 8, 
        shiftEnd: 16, 
        keywords: ['fever', 'flu', 'cough', 'diabetes', 'hypertension'] 
      },
      { 
        id: 'd2', 
        name: 'Dr. Rahul Sharma', 
        department: 'General Medicine',
        specialty: 'Family Physician', 
        experience: '8 Years',
        description: 'Dedicated family physician with a strong background in preventive care, routine checkups, and acute illness management.',
        shiftStart: 12, 
        shiftEnd: 20, 
        keywords: ['headache', 'fatigue', 'blood pressure', 'checkup'] 
      },
      {
  id: 'd9',
  name: 'Dr. Arjun Nair',
  department: 'General Medicine',
  specialty: 'General Physician',
  experience: '7 Years',
  description: 'Experienced in treating infections, fever, and acute illnesses.',
  shiftStart: 6,
  shiftEnd: 14,
  keywords: ['fever', 'infection', 'cold', 'vomiting']
},
{
  id: 'd10',
  name: 'Dr. Neha Verma',
  department: 'General Medicine',
  specialty: 'Preventive Care Specialist',
  experience: '9 Years',
  description: 'Focuses on preventive healthcare and lifestyle diseases.',
  shiftStart: 10,
  shiftEnd: 18,
  keywords: ['checkup', 'fatigue', 'diet', 'wellness']
},
{
  id: 'd11',
  name: 'Dr. Kevin Mathew',
  department: 'General Medicine',
  specialty: 'Internal Medicine',
  experience: '11 Years',
  description: 'Expert in chronic disease management and diagnostics.',
  shiftStart: 14,
  shiftEnd: 22,
  keywords: ['diabetes', 'bp', 'thyroid', 'chronic']
}
    ]
  },
  {
    id: 'neuro',
    title: 'Neurology & Neuro-Surgery',
    category: 'Specialized Surgical',
    description: 'Advanced surgical and medical treatment for brain and spinal disorders.',
    icon: Brain,
    doctors: [
      { 
        id: 'd3', 
        name: 'Dr. Emily Chen', 
        department: 'Neurology',
        specialty: 'Neurosurgeon', 
        experience: '15+ Years',
        description: 'Board-certified neurosurgeon specializing in minimally invasive spine surgery and complex cranial procedures.',
        shiftStart: 9, 
        shiftEnd: 18, 
        keywords: ['migraine', 'spine', 'brain', 'seizure', 'numbness', 'tumor'] 
      }
    ]
  },
  {
    id: 'cardio',
    title: 'Cardiology & CVTS',
    category: 'Specialty Center',
    description: 'Expert surgical and non-invasive care for the heart, lungs, and chest.',
    icon: Heart,
    doctors: [
      { 
        id: 'd4', 
        name: 'Dr. Michael Chang', 
        department: 'Cardiology',
        specialty: 'Interventional Cardiologist', 
        experience: '20 Years',
        description: 'Pioneer in catheter-based treatments of structural heart diseases and complex coronary interventions.',
        shiftStart: 10, 
        shiftEnd: 19, 
        keywords: ['chest pain', 'heart', 'palpitations', 'breathlessness', 'angina'] 
      },
      { 
        id: 'd5', 
        name: 'Dr. Anita Desai', 
        department: 'Cardiothoracic',
        specialty: 'Cardiothoracic Surgeon', 
        experience: '18 Years',
        description: 'Expert in adult cardiac surgery, including coronary artery bypass grafting and heart valve repair.',
        shiftStart: 7, 
        shiftEnd: 15, 
        keywords: ['bypass', 'valve', 'surgery', 'blockage'] 
      },
      {
  id: 'd12',
  name: 'Dr. Rajat Mehta',
  department: 'Neurology',
  specialty: 'Neurophysician',
  experience: '10 Years',
  description: 'Treats neurological disorders like epilepsy and stroke.',
  shiftStart: 12,
  shiftEnd: 20,
  keywords: ['seizure', 'stroke', 'epilepsy']
},
{
  id: 'd13',
  name: 'Dr. Ananya Bose',
  department: 'Neurology',
  specialty: 'Pediatric Neurologist',
  experience: '8 Years',
  description: 'Specializes in neurological conditions in children.',
  shiftStart: 9,
  shiftEnd: 15,
  keywords: ['child brain', 'development', 'seizure']
},
{
  id: 'd14',
  name: 'Dr. Karthik Iyer',
  department: 'Neurology',
  specialty: 'Spine Specialist',
  experience: '13 Years',
  description: 'Expert in spinal cord and nerve-related conditions.',
  shiftStart: 15,
  shiftEnd: 23,
  keywords: ['spine', 'nerve pain', 'numbness']
},
{
  id: 'd15',
  name: 'Dr. Rohan Gupta',
  department: 'Cardiology',
  specialty: 'Cardiologist',
  experience: '11 Years',
  description: 'Specialist in heart disease diagnosis and treatment.',
  shiftStart: 8,
  shiftEnd: 16,
  keywords: ['heart', 'chest pain', 'bp']
},
{
  id: 'd16',
  name: 'Dr. Sneha Reddy',
  department: 'Cardiology',
  specialty: 'Cardiac Electrophysiologist',
  experience: '14 Years',
  description: 'Focuses on heart rhythm disorders.',
  shiftStart: 12,
  shiftEnd: 20,
  keywords: ['palpitations', 'arrhythmia']
},
{
  id: 'd17',
  name: 'Dr. Vivek Menon',
  department: 'Cardiothoracic',
  specialty: 'Cardiac Surgeon',
  experience: '17 Years',
  description: 'Performs advanced heart surgeries.',
  shiftStart: 7,
  shiftEnd: 15,
  keywords: ['bypass', 'surgery', 'valve']
}
    ]
  },
  {
    id: 'ortho',
    title: 'Orthopaedics',
    category: 'Specialized Surgical',
    description: 'Specialized care for bones, joints, and sports injuries.',
    icon: Activity,
    doctors: [
      { 
        id: 'd6', 
        name: 'Dr. James Wilson', 
        department: 'Orthopaedics',
        specialty: 'Orthopaedic Surgeon', 
        experience: '14 Years',
        description: 'Renowned for total joint replacement surgeries and advanced sports medicine arthroscopy.',
        shiftStart: 8, 
        shiftEnd: 17, 
        keywords: ['bone', 'fracture', 'joint', 'knee', 'back pain', 'arthritis'] 
      },
      {
  id: 'd18',
  name: 'Dr. Akash Patel',
  department: 'Orthopaedics',
  specialty: 'Sports Injury Specialist',
  experience: '9 Years',
  description: 'Treats sports injuries and ligament damage.',
  shiftStart: 10,
  shiftEnd: 18,
  keywords: ['injury', 'ligament', 'sports']
},
{
  id: 'd19',
  name: 'Dr. Meera Nair',
  department: 'Orthopaedics',
  specialty: 'Joint Replacement Surgeon',
  experience: '15 Years',
  description: 'Expert in knee and hip replacements.',
  shiftStart: 8,
  shiftEnd: 16,
  keywords: ['knee', 'hip', 'joint']
},
{
  id: 'd20',
  name: 'Dr. Suresh Kumar',
  department: 'Orthopaedics',
  specialty: 'Spine Orthopaedic',
  experience: '12 Years',
  description: 'Specialist in spinal disorders.',
  shiftStart: 14,
  shiftEnd: 22,
  keywords: ['back pain', 'spine']
}
    ]
  },
  {
    id: 'obgyn',
    title: 'Obstetrics & Gynaecology',
    category: 'Specialty Center',
    description: 'Dedicated care for maternal health and female reproductive wellness.',
    icon: Baby,
    doctors: [
      { 
        id: 'd7', 
        name: 'Dr. Priya Patel', 
        department: 'Obstetrics',
        specialty: 'Gynaecologist & Obstetrician', 
        experience: '10 Years',
        description: 'Compassionate care provider for high-risk pregnancies, reproductive endocrinology, and general women’s health.',
        shiftStart: 9, 
        shiftEnd: 14, 
        keywords: ['pregnancy', 'maternal', 'period', 'womens health', 'pcos'] 
      },
      {
  id: 'd21',
  name: 'Dr. Kavya Iyer',
  department: 'Obstetrics',
  specialty: 'Gynecologist',
  experience: '7 Years',
  description: 'Focuses on women’s reproductive health.',
  shiftStart: 10,
  shiftEnd: 16,
  keywords: ['period', 'pcos']
},
{
  id: 'd22',
  name: 'Dr. Aishwarya Singh',
  department: 'Obstetrics',
  specialty: 'Fertility Specialist',
  experience: '11 Years',
  description: 'Expert in infertility treatments.',
  shiftStart: 9,
  shiftEnd: 15,
  keywords: ['fertility', 'pregnancy']
},
{
  id: 'd23',
  name: 'Dr. Nisha Kapoor',
  department: 'Obstetrics',
  specialty: 'Maternal Care',
  experience: '13 Years',
  description: 'Handles high-risk pregnancies.',
  shiftStart: 12,
  shiftEnd: 20,
  keywords: ['maternal', 'pregnancy']
}
    ]
  },
  {
    id: 'ent',
    title: 'ENT (Otolaryngology)',
    category: 'Specialty Center',
    description: 'Specialized treatment for Ear, Nose, and Throat disorders.',
    icon: Ear,
    doctors: [
      { 
        id: 'd8', 
        name: 'Dr. Robert King', 
        department: 'Otolaryngology',
        specialty: 'ENT Specialist', 
        experience: '11 Years',
        description: 'Specializes in endoscopic sinus surgery, pediatric ENT conditions, and hearing preservation.',
        shiftStart: 11, 
        shiftEnd: 20, 
        keywords: ['ear', 'hearing', 'throat', 'sinus', 'tonsils', 'vertigo'] 
      },
      {
  id: 'd24',
  name: 'Dr. Arvind Rao',
  department: 'Otolaryngology',
  specialty: 'ENT Surgeon',
  experience: '10 Years',
  description: 'Expert in sinus and throat surgeries.',
  shiftStart: 9,
  shiftEnd: 17,
  keywords: ['sinus', 'throat']
},
{
  id: 'd25',
  name: 'Dr. Pooja Shah',
  department: 'Otolaryngology',
  specialty: 'Audiologist',
  experience: '8 Years',
  description: 'Specialist in hearing disorders.',
  shiftStart: 11,
  shiftEnd: 19,
  keywords: ['hearing', 'ear']
},
{
  id: 'd26',
  name: 'Dr. Manish Verma',
  department: 'Otolaryngology',
  specialty: 'ENT Specialist',
  experience: '12 Years',
  description: 'Treats ear, nose, and throat conditions.',
  shiftStart: 14,
  shiftEnd: 22,
  keywords: ['ear pain', 'tonsils']
}
    ]
  }
];