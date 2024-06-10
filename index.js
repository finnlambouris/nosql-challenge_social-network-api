const express = require('express');
const db = require('./config/connection');
const routes = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});