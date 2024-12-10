const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM announcements');
        res.json(rows);
    } catch (err) {
        res.status(500).send('Error fetching announcements');
    }
});

module.exports = router;