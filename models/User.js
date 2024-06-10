const { mongoose, Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;