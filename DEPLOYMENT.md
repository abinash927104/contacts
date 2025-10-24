# Deploy Contact List to Vercel

## Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)

## Method 1: Deploy via Vercel CLI (Recommended)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from your project directory
```bash
cd /Users/abinashbarman/Desktop/ContactList
vercel
```

### 4. Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (for first deployment)
- **What's your project's name?** → contact-list (or your preferred name)
- **In which directory is your code located?** → `./` (current directory)

### 5. Production deployment
```bash
vercel --prod
```

## Method 2: Deploy via Vercel Dashboard

### 1. Push to Git Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Contact List app"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/contact-list.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"

## Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/contact-list)

## Configuration Files

The following files are already configured for Vercel deployment:

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

### `.vercelignore`
Excludes unnecessary files from deployment.

## Environment Variables

If you need environment variables (for future API integration):

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables:
   - `VITE_API_URL` (if you have a backend API)
   - `VITE_APP_NAME` (optional)

## Build Configuration

The project is configured to build with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x (Vercel default)

## Post-Deployment

After successful deployment:

1. **Get your live URL**: Vercel provides a URL like `https://your-project.vercel.app`
2. **Custom Domain**: Add your own domain in Vercel dashboard
3. **Automatic Deployments**: Every push to main branch triggers a new deployment

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check Node.js version compatibility
2. **Missing Dependencies**: Ensure all dependencies are in `package.json`
3. **Environment Variables**: Add them in Vercel dashboard

### Build Logs:
- Check Vercel dashboard → Functions → Build Logs
- Common error: Missing dependencies or TypeScript errors

## Performance Optimization

### Vercel Features:
- **Edge Functions**: For API routes (future enhancement)
- **Image Optimization**: Automatic image optimization
- **CDN**: Global content delivery
- **Analytics**: Built-in performance monitoring

### Recommended Settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Monitoring

After deployment, monitor your app:
- **Vercel Dashboard**: Real-time deployment status
- **Analytics**: User metrics and performance
- **Functions**: Serverless function logs
- **Domains**: Custom domain management

## Next Steps

1. **Custom Domain**: Add your own domain
2. **Environment Variables**: Configure for production
3. **Analytics**: Enable Vercel Analytics
4. **Monitoring**: Set up error tracking
5. **CI/CD**: Automatic deployments on git push

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Deployment**: [vitejs.dev/guide/static-deploy.html](https://vitejs.dev/guide/static-deploy.html)
- **Contact List App**: Check the README.md for app-specific documentation
