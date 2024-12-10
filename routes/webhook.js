const express = require('express');
const { exec } = require("child_process");
const crypto = require("crypto");
const path = require("path");
const os = require("os");
const fs = require("fs");
const router = express.Router();

// Replace with your GitHub webhook secret
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
router.post("/", verifyGitHubSignature, (req, res) => {
    const branch = req.body.ref;
    const logFilePath = path.resolve(os.homedir(), "mohc-web", "logs", "git.log");

    // Check if the pushed branch is "main"
    if (branch === "refs/heads/main") {
        const scriptPath = path.resolve(os.homedir(), "mohc-web", "refresh-repo.sh");
        exec(scriptPath, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).send("Error executing script");
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            res.status(200).send("Update pulled");

            // Now execute pm2 restart in the background (after response is sent)
            exec("pm2 restart mohc-web", (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error restarting app: ${error.message}`);
                    fs.appendFileSync(logFilePath, `${currentDate} - Error restarting app: ${error.message}\n`);
                    return;
                }
                if (stderr) {
                    console.error(`Stderr during restart: ${stderr}`);
                }
                console.log(`App restarted: ${stdout}`);
                fs.appendFileSync(logFilePath, `${currentDate} - App restarted successfully\n`);
            });
        });
    } else {
        res.status(200).send("Not the main branch, ignoring.");
    }
});

module.exports = router;