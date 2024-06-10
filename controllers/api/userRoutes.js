const router = require("express").Router();
const User = require("../../models/User")

// /api/users GET route
router.get("/", async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/users POST route
router.post("/", (req, res) => {
    try {
        const newUser = new User({ 
            username: req.body.username,
            email: req.body.email,
        });
        newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/users/:id GET route
router.get("/:id", async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;