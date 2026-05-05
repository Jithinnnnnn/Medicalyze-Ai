# Azure Deployment Guide for Medicalizer

## Overview
This Next.js application is configured for deployment to Azure Web Apps using GitHub Actions CI/CD.

## Prerequisites
- Azure Web App created (already done: `medicalizer`)
- GitHub repository with Azure secrets configured
- Node.js 22.x runtime on Azure

## Azure Web App Configuration

### Application Settings (Environment Variables)
You need to configure these in the Azure Portal under **Configuration > Application settings**:

1. **WEBSITE_NODE_DEFAULT_VERSION**: `22-lts`
2. **NODE_ENV**: `production`
3. **OPENAI_API_KEY**: `your-openai-api-key` (if using AI features)
4. **GOOGLE_CLIENT_ID**: `your-google-oauth-client-id` (if using Google OAuth)
5. **GOOGLE_CLIENT_SECRET**: `your-google-oauth-client-secret` (if using Google OAuth)
6. **NEXTAUTH_URL**: `https://medicalizer.azurewebsites.net` (your Azure app URL)
7. **NEXTAUTH_SECRET**: `generate-a-random-secret-string`

### General Settings
In Azure Portal > Configuration > General settings:
- **Stack**: Node
- **Major version**: 22 LTS
- **Minor version**: 22 LTS
- **Startup Command**: `node server.js`

### Platform Settings
- **Platform**: 64 Bit
- **Always On**: Enabled (recommended for production)
- **ARR affinity**: Enabled

## GitHub Secrets
These are already configured in your workflow file:
- `AZUREAPPSERVICE_CLIENTID_AD3CF73A676F4695A1D6AEBF1C3F3524`
- `AZUREAPPSERVICE_TENANTID_35EE28BE9EA94FAABF7F7C76640963CD`
- `AZUREAPPSERVICE_SUBSCRIPTIONID_6224754458FD4709B5A083F0E97841FD`

## Deployment Process

### Automatic Deployment
1. Push code to `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds Next.js in standalone mode
   - Creates deployment package with static files
   - Deploys to Azure Web App

### Manual Deployment
Trigger manually from GitHub Actions tab > "Build and deploy Node.js app to Azure Web App - medicalizer" > Run workflow

## Build Configuration

### next.config.ts
- **output**: `standalone` - Creates optimized standalone build for Azure
- **compress**: `true` - Enables gzip compression
- **poweredByHeader**: `false` - Removes X-Powered-By header for security

### Standalone Build
The standalone build includes:
- Minimal Node.js server
- Only necessary dependencies
- Static assets (.next/static)
- Public files

## Troubleshooting

### Build Failures
1. **Check Node version**: Ensure Azure is using Node 22.x
2. **Check logs**: Azure Portal > Deployment Center > Logs
3. **Environment variables**: Verify all required env vars are set
4. **Dependencies**: Run `npm ci` locally to verify package-lock.json

### Runtime Errors
1. **Application logs**: Azure Portal > Log stream
2. **Startup command**: Verify `node server.js` is set
3. **Port binding**: Azure automatically sets PORT env var
4. **File paths**: Use relative paths, not absolute

### Common Issues

#### "Cannot find module 'next'"
- Solution: Ensure standalone build is properly created
- Check that `.next/standalone` folder exists in build

#### "ENOENT: no such file or directory"
- Solution: Verify static files are copied to deployment package
- Check workflow copies `.next/static` and `public` folders

#### "Application didn't respond to HTTP pings"
- Solution: Check startup command is `node server.js`
- Verify app listens on `process.env.PORT`

#### Build succeeds but app doesn't start
- Solution: Check Application Settings in Azure Portal
- Verify WEBSITE_NODE_DEFAULT_VERSION is set to 22-lts

## Monitoring

### Azure Portal
- **Metrics**: Monitor CPU, Memory, Response time
- **Log stream**: Real-time application logs
- **Application Insights**: Detailed telemetry (optional)

### Health Check
- URL: `https://medicalizer.azurewebsites.net`
- Expected: Homepage loads successfully

## Rollback
If deployment fails:
1. Azure Portal > Deployment Center
2. Select previous successful deployment
3. Click "Redeploy"

## Performance Optimization

### Recommendations
1. Enable **Always On** to prevent cold starts
2. Configure **Application Insights** for monitoring
3. Use **Azure CDN** for static assets (optional)
4. Enable **HTTP/2** in Azure settings
5. Configure **Custom domain** with SSL

### Scaling
- **Scale Up**: Increase instance size (CPU/RAM)
- **Scale Out**: Add more instances (horizontal scaling)
- Configure in: Azure Portal > Scale up/out

## Cost Optimization
- Use **Free/Basic tier** for development
- Use **Standard tier** for production with Always On
- Monitor usage in Cost Management

## Security

### Best Practices
1. Store secrets in Azure Key Vault (advanced)
2. Enable HTTPS only
3. Configure CORS if needed
4. Use managed identity for Azure services
5. Regular security updates via CI/CD

## Support
- Azure Documentation: https://docs.microsoft.com/azure/app-service/
- Next.js on Azure: https://nextjs.org/docs/deployment
- GitHub Actions: https://docs.github.com/actions

## Migration from Vercel

### Key Differences
1. **Environment Variables**: Set in Azure Portal, not Vercel dashboard
2. **Build Output**: Uses standalone mode instead of Vercel's serverless
3. **Deployment**: GitHub Actions instead of Vercel's Git integration
4. **Domain**: Azure provides `.azurewebsites.net` subdomain
5. **Edge Functions**: Not available (use Azure Functions separately if needed)

### Checklist
- [x] Update next.config.ts with standalone output
- [x] Create GitHub Actions workflow
- [x] Configure Azure secrets in GitHub
- [ ] Set environment variables in Azure Portal
- [ ] Configure custom domain (optional)
- [ ] Test deployment
- [ ] Update DNS if using custom domain
