const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const os = require('os');
const util = require('util');
const router = express.Router();

// Promisify exec to use async/await
const execPromise = util.promisify(exec);

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
router.post("/", verifyGitHubSignature, async (req, res) => {
    const branch = req.body.ref;

    // Check if the pushed branch is "main"
    if (branch === "refs/heads/main") {
        const scriptPath = path.resolve(os.homedir(), "mohc-web", "refresh-repo.sh");

        try {
            // Execute the script and wait for it to finish
            const { stdout, stderr } = await execPromise(scriptPath);
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Stdout: ${stdout}`);
            
            // Send the response to GitHub after the script execution is done
            res.status(200).send("Update pulled");

            // After the response is sent, execute pm2 restart
            const { stdout: pm2Stdout, stderr: pm2Stderr } = await execPromise("pm2 restart mohc-web");
            if (pm2Stderr) {
                console.error(`Stderr during restart: ${pm2Stderr}`);
            }
            console.log(`App restarted: ${pm2Stdout}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send("Error executing script or restarting app");
        }
    } else {
        res.status(200).send("Not the main branch, ignoring.");
    }
});

module.exports = router;
