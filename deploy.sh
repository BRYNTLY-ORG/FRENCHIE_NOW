#!/bin/bash
echo "Deploying Frenchie Now to Vercel with Cache Buster..."

# Cache buster: append a timestamp to a comment in next.config.ts to force a rebuild
TIMESTAMP=$(date +%s)
echo "// Cache buster: $TIMESTAMP" >> next.config.ts

# Optionally run build locally to verify
# npm run build

# Push to GitHub to trigger Vercel deployment automatically
git add .
git commit -m "Deploy with cache buster: $TIMESTAMP"
git push origin main

echo "Deployment triggered on Vercel via GitHub push!"
