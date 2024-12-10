#!/bin/bash

# Define log file path
LOG_FILE="$HOME/mohc-web/logs/git.log"

# Get current date
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Write current date and echo statements to log file
echo "$CURRENT_DATE - Fetching updates from GitHub..." >> "$LOG_FILE"
git fetch origin main >> "$LOG_FILE" 2>&1

echo "$CURRENT_DATE - Resetting local branch to match remote..." >> "$LOG_FILE"
git reset --hard origin/main >> "$LOG_FILE" 2>&1

echo "$CURRENT_DATE - Restarting app with PM2..." >> "$LOG_FILE"
pm2 restart mohc-web >> "$LOG_FILE" 2>&1

echo "$CURRENT_DATE - Script finished" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"  # Line break