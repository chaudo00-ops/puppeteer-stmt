#!/bin/bash

# Hard-coded source and destination paths
SOURCE="/path/to/my/source/file.txt"
DESTINATION="/path/to/my/destination/folder/"

# Copy the file
cp "$SOURCE" "$DESTINATION"

# Check if the copy succeeded
if [ $? -eq 0 ]; then
  echo "File copied successfully!"
else
  echo "Error: Failed to copy file."
  exit 1
fi
