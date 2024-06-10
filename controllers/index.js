const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get("/", async (req, res) => {
    try {
    res.status(200).send("this worked again!");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;
