#!/bin/bash

# Deploy to gh-pages
npm run deploy

# Stage all files
git add .

# Ask for commit message
read -p "Enter commit message: " msg

# Commit and push
git commit -m $msg
git push