#!/bin/bash

# Contact List Deployment Script for Vercel
echo "🚀 Deploying Contact List to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

# Build the project first
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "📱 Your app is now live on Vercel!"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi
