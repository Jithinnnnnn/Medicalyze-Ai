# Google OAuth Setup Guide

## ✅ What's Been Implemented

Your login page now has a fully functional "Continue with Google" button that uses Google Identity Services (the latest Google Sign-In solution).

## 🔧 Setup Instructions

### Step 1: Add Your Google Client ID

Open `.env.local` and replace `your_google_client_id_here` with your actual Google Client ID:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### Step 2: Configure Authorized JavaScript Origins

In your [Google Cloud Console](https://console.cloud.google.com/):

1. Go to **APIs & Services** → **Credentials**
2. Click on your OAuth 2.0 Client ID
3. Add these to **Authorized JavaScript origins**:
   - `http://localhost:3000` (for local development)
   - Your production domain (e.g., `https://yourdomain.azurestaticapps.net`)

### Step 3: Configure Authorized Redirect URIs

Add these to **Authorized redirect URIs**:
   - `http://localhost:3000` (for local development)
   - Your production domain (e.g., `https://yourdomain.azurestaticapps.net`)

### Step 4: Restart Your Development Server

```bash
npm run dev
```

## 🎯 How It Works

1. **User clicks "Continue with Google"** → Google's One Tap prompt appears
2. **User selects their Google account** → Google returns a JWT credential
3. **App decodes the JWT** → Extracts user info (name, email, profile picture)
4. **User is logged in** → Redirected to the home page

## 📦 What's Included

### User Information Available from Google:
- `name` - Full name
- `email` - Email address
- `picture` - Profile picture URL
- `sub` - Unique Google user ID
- `email_verified` - Email verification status

### Current Implementation:
- ✅ Google Sign-In button on login page
- ✅ JWT token decoding
- ✅ User info extraction
- ✅ Success/error handling
- ✅ Loading states
- ✅ Automatic redirect after login

## 🚀 Next Steps (Optional Backend Integration)

To persist user sessions, you'll want to:

1. **Create an API endpoint** (e.g., `/api/auth/google`) to:
   - Verify the Google JWT token on the server
   - Create/update user in your database
   - Generate your own session token

2. **Update the `handleGoogleSignIn` function** to send the credential to your backend:

```typescript
const handleGoogleSignIn = async (response: any) => {
  try {
    setIsLoading(true);
    
    // Send credential to your backend
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });
    
    const data = await res.json();
    
    if (data.success) {
      // Store session token
      localStorage.setItem('authToken', data.token);
      router.push('/');
    }
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    alert('Google Sign-In failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## 🔒 Security Notes

- The `NEXT_PUBLIC_` prefix makes the Client ID visible in the browser (this is safe and required)
- **Never** expose your Client Secret in frontend code
- Always verify the JWT token on your backend before trusting the user data
- Use HTTPS in production

## 📚 Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [Google Cloud Console](https://console.cloud.google.com/)
- [JWT.io - Token Decoder](https://jwt.io/)

## 🐛 Troubleshooting

### "Google Sign-In is still loading"
- Check your internet connection
- Verify the Google script is loading (check browser console)

### "Invalid Client ID"
- Verify your Client ID in `.env.local` is correct
- Make sure you've restarted your dev server after adding the Client ID

### "Unauthorized JavaScript origin"
- Add your domain to Authorized JavaScript origins in Google Cloud Console
- Wait a few minutes for changes to propagate

### "Popup blocked"
- The One Tap prompt might be blocked by browser settings
- Try allowing popups for localhost/your domain
