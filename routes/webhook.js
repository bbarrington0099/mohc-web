const express = require('express');
const { exec } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { writeToFile } = require('../appUtils/fileHandeling');
const router = express.Router();

const APP_PATH = (process.env.APP_PATH).replace('$HOME', os.homedir());

const OUTPUT_LOG = path.join(APP_PATH, 'logs', 'output.log');
const ERROR_LOG = path.join(APP_PATH, 'logs', 'error.log');

const GITHUB_SECRET = process.env.GITHUB_SECRET || "";

// Middleware to verify GitHub signature
const verifyGitHubSignature = (req, res, next) => {
    const signature = req.headers["x-hub-signature-256"];
    const payload = JSON.stringify(req.body);

    if (!signature || !payload) {
        return res.status(400).send("Invalid request");
    }

    const hmac = crypto.createHmac("sha256", GITHUB_SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;

    if (signature !== digest) {
        return res.status(401).send("Invalid signature");
    }

    next();
};

// Webhook route
router.post("/gitpush", verifyGitHubSignature, (req, res) => {
    const branch = req.body.ref;

    // Check if the pushed branch is "main"
    if (branch === "refs/heads/main") {
        const scriptPath = path.resolve(APP_PATH, "refresh-repo.sh");
        const command = `${scriptPath} -t "Git Push"`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                writeToFile(ERROR_LOG, `${new Date()} App Update Error: ${error.message}`);
                return res.status(500).send("Error Updating App");
            }
            if (stderr) {
                writeToFile(ERROR_LOG, `${new Date()} App Update Stderr: ${stderr}`);
            }
            writeToFile(OUTPUT_LOG, `${new Date()} App Update Stdout: ${stdout}`);
            res.status(200).send("App Update Complete");

            // Now execute pm2 restart in the background (after the response is sent)
            exec(`pm2 restart ${process.env.APP_NAME}`, (error, stdout, stderr) => {
                if (error) {
                    writeToFile(ERROR_LOG, `${new Date()} App Update Error restarting app: ${error.message}`);
                    return;
                }
                if (stderr) {
                    writeToFile(ERROR_LOG, `${new Date()} App Update Stderr during restart: ${stderr}`);
                }
                writeToFile(OUTPUT_LOG, `${new Date()} App Update Restarted: ${stdout}`);
            });
        });
    } else {
        res.status(200).send("Not the main branch, ignoring.");
    }
});

module.exports = router;
