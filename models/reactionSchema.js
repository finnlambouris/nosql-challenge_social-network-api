const { mongoose, Schema } = require('mongoose');
const { format } = require('date-fns');

const reactionSchema = new mongoose.Schema(
    {
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
        },
    },
    {
        toJSON: {
            virtuals: true
            },
            id: false
    }
);

reactionSchema.virtual("formattedDate").get(function () {
    return format(this.createdAt, "yyyy-MM-dd");
});

module.exports = reactionSchema;