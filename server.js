const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

app.get("/", async (req, res) => {
    try {
    res.status(200).send("this worked!");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});