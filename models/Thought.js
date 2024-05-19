const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");

const formatDate = (date) => {
    if (!date) return '';
    const options = 
    { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
  };


const thoughsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        toObject: { 
            getters: true 
        },
        id: false
    }
);

thoughsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughsSchema);

module.exports = Thought;