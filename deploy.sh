#1/bin/bash

# Deploy to gh-pages
npm run deploy

# Stage all files
git add .

# Ask for commit message
echo "Enter commit message: "
read msg

# Commit and push
git commit -m $msg
git push