const { Schema, Model} = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema(
    {
        ursername: {
            type: String, 
            unique: true,
            required: true,
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [ isEmail, "invalid email" ]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: "user"   
        },
    ],
    },
    {
    toJSON: {
        virtuals:true
    },
    id: false,
    }
);

userSchema
.virtual("friendCount")
.get(function () {

})

const User = model('user', userSchema);

module.exports = User;