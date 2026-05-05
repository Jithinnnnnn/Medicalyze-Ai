# Azure Deployment Checklist

## ✅ Completed Setup

### 1. Project Configuration
- [x] Updated `next.config.ts` with standalone output mode
- [x] Created `server.js` startup script for Azure
- [x] Created `.deployment` config file
- [x] Updated `.gitignore` for Azure artifacts
- [x] Created GitHub Actions workflow (`.github/workflows/main_medicalizer.yml`)

### 2. Build Verification
- [x] Local build tested successfully
- [x] Standalone folder generated (`.next/standalone/`)
- [x] Static assets ready (`.next/static/`)

## 🔧 Required Azure Portal Configuration

### Step 1: Configure Application Settings
Go to Azure Portal > Your App (medicalizer) > Configuration > Application settings

Add these settings:

```
WEBSITE_NODE_DEFAULT_VERSION = 22-lts
NODE_ENV = production
PORT = 8080
```

### Step 2: Configure Startup Command
Go to Azure Portal > Configuration > General settings

Set **Startup Command** to:
```
node server.js
```

### Step 3: Add Your Environment Variables
Based on your `.env.local`, add these (with your actual values):

```
OPENAI_API_KEY = your-actual-key
GOOGLE_CLIENT_ID = your-actual-client-id
GOOGLE_CLIENT_SECRET = your-actual-secret
NEXTAUTH_URL = https://medicalizer.azurewebsites.net
NEXTAUTH_SECRET = generate-random-secret
```

To generate NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

### Step 4: Save and Restart
1. Click **Save** in Azure Portal
2. Click **Restart** to apply changes

## 🚀 Deploy

### Option 1: Automatic (Recommended)
```bash
git add .
git commit -m "Configure Azure deployment"
git push origin main
```

GitHub Actions will automatically build and deploy.

### Option 2: Manual Trigger
1. Go to GitHub > Actions tab
2. Select "Build and deploy Node.js app to Azure Web App - medicalizer"
3. Click "Run workflow"

## 📊 Monitor Deployment

### Check Build Status
- GitHub: Repository > Actions tab
- Watch for green checkmark ✓

### Check Deployment Status
- Azure Portal > Deployment Center > Logs
- Look for "Deployment successful"

### Check Application
- Visit: https://medicalizer.azurewebsites.net
- Should see your homepage

### View Logs
- Azure Portal > Log stream
- Real-time application logs

## 🐛 Troubleshooting

### Build Fails in GitHub Actions
1. Check the Actions log for specific error
2. Common issues:
   - Missing dependencies: Check package.json
   - TypeScript errors: Run `npm run build` locally
   - Environment variables: Check workflow file

### Deployment Succeeds but App Doesn't Start
1. Check Azure Portal > Log stream
2. Verify startup command: `node server.js`
3. Verify Node version: 22-lts
4. Check environment variables are set

### App Starts but Shows Errors
1. Check missing environment variables
2. Verify NEXTAUTH_URL matches your Azure URL
3. Check API keys are valid

## 📝 Next Steps

1. **Test the deployment**
   - Visit https://medicalizer.azurewebsites.net
   - Test all features (login, triage, services)

2. **Configure custom domain** (optional)
   - Azure Portal > Custom domains
   - Add your domain and SSL certificate

3. **Enable monitoring** (recommended)
   - Azure Portal > Application Insights
   - Set up alerts for errors/downtime

4. **Performance optimization**
   - Enable "Always On" (prevents cold starts)
   - Configure auto-scaling if needed

## 🔄 Differences from Vercel

| Feature | Vercel | Azure |
|---------|--------|-------|
| Deployment | Automatic on push | GitHub Actions |
| Environment Variables | Vercel Dashboard | Azure Portal |
| Build Output | Serverless | Standalone |
| Domain | vercel.app | azurewebsites.net |
| Logs | Vercel Dashboard | Azure Portal |

## 📚 Documentation

- Full guide: `AZURE_DEPLOYMENT.md`
- Environment variables: `.env.azure.example`
- Workflow file: `.github/workflows/main_medicalizer.yml`

## ✨ Quick Commands

```bash
# Test build locally
npm run build

# Check if standalone folder exists
ls -la .next/standalone

# Deploy to Azure
git push origin main

# View deployment logs
# Go to: Azure Portal > Deployment Center > Logs
```

## 🆘 Need Help?

1. Check `AZURE_DEPLOYMENT.md` for detailed troubleshooting
2. Review Azure Portal logs
3. Check GitHub Actions logs
4. Verify all environment variables are set correctly
