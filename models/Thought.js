const { mongoose, Schema } = require('mongoose');
const { format } = require('date-fns');
const reactionSchema = require('./reactionSchema.js');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true
          },
          id: false
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

thoughtSchema.virtual("formattedDate").get(function () {
    return format(this.createdAt, "yyyy-MM-dd");
});

const Thought = mongoose.model("thoughts", thoughtSchema);

module.exports = Thought;