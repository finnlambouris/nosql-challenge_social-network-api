const router = require("express").Router();
const { User } = require("../../models/index.js")

// /api/users GET route
router.get("/", async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
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

// /api/users/:id PUT route
router.put("/:id", async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.id },
            { username: req.body.username, email: req.body.email, },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/users/:id DELETE route
router.delete("/:id", async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/users/:userId/friends/:friendId POST route
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

// /api/users/:userId/friends/:friendId DELETE route
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;