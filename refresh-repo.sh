#!/bin/bash

# Navigate to the app directory
cd ~/mohc-web || exit

# Fetch updates from the remote repo
echo "Fetching updates from GitHub..."
git fetch origin main

# Reset the local branch to match the remote
echo "Resetting local branch to match remote..."
git reset --hard origin/main

# Restart the app with pm2
echo "Restarting app with PM2..."
pm2 restart mohc-web # Replace 'app-name' with your PM2 app name