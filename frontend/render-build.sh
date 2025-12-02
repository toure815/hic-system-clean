#!/usr/bin/env bash
set -e

echo "🚀 Building frontend for Render..."

# Install dependencies
npm install

# Build Vite app
npm run build

# Render expects output in a folder called 'dist'
echo "🎉 Build complete! Render will now serve the dist/ folder."

