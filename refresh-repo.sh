#!/bin/bash

# Define log file path
LOG_FILE="$HOME/mohc-web/logs/git.log"

# Get current date
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

cd ~/mohc-web
#
# Write current date and echo statements to log file
echo "$CURRENT_DATE - Fetching updates from GitHub..." >> "$LOG_FILE"
git fetch origin main >> "$LOG_FILE" 2>&1
echo "$CURRENT_DATE - Git fetch completed" >> "$LOG_FILE"

# Sleep to ensure proper Git reset and app stability
sleep 10

# Perform the reset step
echo "$CURRENT_DATE - Resetting local branch to match remote..." >> "$LOG_FILE"
git reset --hard origin/main >> "$LOG_FILE" 2>&1
echo "$CURRENT_DATE - Git reset completed" >> "$LOG_FILE"

echo "$CURRENT_DATE - Repo Fresh" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"