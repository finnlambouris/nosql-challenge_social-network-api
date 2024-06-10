const router = require("express").Router();
const { Thought, User } = require("../../models/index.js")

// /api/thoughts GET route
router.get("/", async (req, res) => {
    try {
        const result = await Thought.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts/:id GET route
router.get("/:id", async (req, res) => {
    try {
        const result = await Thought.findOne({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts POST route
router.post("/", async (req, res) => {
    try {
        const newThought = new Thought({ 
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: req.body.userId
        });
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: newThought } },
            { new: true }
        );
        newThought.save();
        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts/:id PUT route
router.put("/:id", async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { thoughtText: req.body.thoughtText, username: req.body.username, userId: req.body.userId },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts/:id DELETE route
router.delete("/:id", async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts/:thoughtId/reactions POST route
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username, } } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/thoughts/:thoughtId/reactions DELETE route
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;