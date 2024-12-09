const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const announcementsRouter = require('./routes/announcements');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/announcements', announcementsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});