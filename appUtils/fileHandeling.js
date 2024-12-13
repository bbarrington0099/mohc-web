const fs = require("fs");

// Function to write writes asynchronously with proper error handling
const writeToFile = (filePath, message) => {
    fs.appendFile(filePath, "\n" + message, (err) => {
        if (err) {
            console.error(`Failed to write to file: ${filePath}`, err);
        }
    });
};

module.exports = { writeToFile };