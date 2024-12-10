#!/bin/bash

# Define log file path
LOG_FILE="$HOME/mohc-web/logs/git.log"

# Get current date
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

# Write current date and echo statements to log file
echo "$CURRENT_DATE - Fetching updates from GitHub..." >> "$LOG_FILE"
git fetch origin main >> "$LOG_FILE" 2>&1

# Capture initial PID before reset
INITIAL_PID=$(pm2 pid mohc-web)
echo "$CURRENT_DATE - Initial PID: $INITIAL_PID" >> "$LOG_FILE"

# Sleep to ensure proper Git reset and app stability
sleep 2

# Perform the reset step
echo "$CURRENT_DATE - Resetting local branch to match remote..." >> "$LOG_FILE"
git reset --hard origin/main >> "$LOG_FILE" 2>&1

# Capture the PID after reset
FINAL_PID=$(pm2 pid mohc-web)
echo "$CURRENT_DATE - Final PID: $FINAL_PID" >> "$LOG_FILE"

# Check if the PID has changed
if [ "$INITIAL_PID" != "$FINAL_PID" ]; then
    echo "$CURRENT_DATE - The app was restarted due to code changes" >> "$LOG_FILE"
else
    echo "$CURRENT_DATE - No code changes." >> "$LOG_FILE"
fi

# Restart the app with PM2
echo "$CURRENT_DATE - Restarting app with PM2..." >> "$LOG_FILE"
pm2 restart mohc-web >> "$LOG_FILE" 2>&1

echo "$CURRENT_DATE - Script finished" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"  # Line break