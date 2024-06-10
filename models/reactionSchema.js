const { mongoose, Schema } = require('mongoose');
const { format } = require('date-fns');

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: function () {
            return this.createdAt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        }
    },
});

module.exports = reactionSchema;