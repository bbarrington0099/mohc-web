#!/bin/bash
set -x
# Define log file path
LOG_FILE="$HOME/mohc-web/logs/git.log"

# Get current date
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

echo "$CURRENT_DATE - Environment: $(env)" >> "$LOG_FILE"
echo "$CURRENT_DATE - Working directory: $(pwd)" >> "$LOG_FILE"
echo "$CURRENT_DATE - Running as user: $(whoami)" >> "$LOG_FILE"
echo "$CURRENT_DATE - Git version: $(git --version)" >> "$LOG_FILE"

cd ~/mohc-web

# Write current date and echo statements to log file
echo "$CURRENT_DATE - Pulling from GitHub..." >> "$LOG_FILE"
git pull origin main
echo "$CURRENT_DATE - Git Pull Completed" >> "$LOG_FILE"

echo "$CURRENT_DATE - Repo Fresh" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"