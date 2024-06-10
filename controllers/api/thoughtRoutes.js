const router = require("express").Router();
const { Thought } = require("../../models/index.js")

// /api/thoughts GET route
router.get("/", async (req, res) => {
    try {
        const result = await Thought.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts POST route
router.post("/", (req, res) => {
    try {
        const newThought = new Thought({ 
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            reactions: {
                reactionBody: req.body.reactions.reactionBody,
                username: req.body.reactions.username,
            }
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