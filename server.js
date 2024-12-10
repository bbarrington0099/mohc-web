const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const announcementsRouter = require('./routes/announcements');
const apiRouter = require('./routes/api');
const webhookRouter = require('./routes/webhook');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/announcements', announcementsRouter);
app.use('/api', apiRouter);
app.use('/webhook', webhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    process.send('ready');
    console.log(`Server running on port ${PORT}`);
});