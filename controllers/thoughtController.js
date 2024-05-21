const { Thought, User, Reaction } = require("../models");


module.exports = {
    // get all the thought
    async getThought ( req, res ) {
        try {
            const thought = await Thought.find()
            .select("-__v")
            .populate("reactions");
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get a single thought
    async getSingleThought ( req, res ) {
        try {
            const thought = await Thought.findOne (
                { 
                _id: req.params.thoughtId 
            }
        )
        .select("-__v")
        .populate("reactions");
            if(!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a new thought
    async createThought ( req, res ) {
        try{
        const thought = await Thought.create (req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId},
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if(!user) {
            return res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' });
        }

        res.status(200).json(
            {
                message: "Thought created!!"
            }
        );
    } catch (error) {
        res.status(500).json(error);
      }
    },

    // Select one thought and update
    async updateThought ( req, res ) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId,
                },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true,
                },
            );

            if(!thought) {
                return res.status(404).json(
                    {
                        message: "No thought with that ID!"
                    }
                )
            };

            res.status(200).json(thought);
        }catch (error) {
            res.status(500).json(error);
        }
    },

    // delete on thought
    async deleteThought ( req, res ) {
        try{
            const thought = await Thought.findOneAndDelete(
                {
                    _id: req.params.thoughtId,
                },
            );

            if(!thought) {
                return res.status(404).json(
                    {
                        message: "No thought with that ID!"
                    }
                )
            };
        res.status(200).json(
            {
                message: "thoughts and all his reaction deleted!!"
            }
        );
        }catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    async deleteReaction ( req, res ) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId,
                },
                {
                    $pull: {
                        reactions: 
                        { 
                            reactionId: req.params.reactionId
                        }
                    }
                },
                {
                    runValidators: true,
                    new: true,
                },
        );
            if(!thought){
                return res.status(404).json(
                    {
                        message: "No thought with that ID!"
                    }
                )
            };
            res.status(200).json(thought);
        }catch (error) {
            res.status(500).json(error);
        }
    },

    async createReaction ( req, res ) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId,
                },
                {
                    $addToSet: {
                        reactions: req.body,
                    }
                },
                {
                    runValidators: true,
                    new: true,
                },
        );
        if(!thought){
            return res.status(404).json(
                {
                    message: "No thought with that ID!"
                }
            )
        }
            res.status(200).json(thought);
        }catch (error) {
            res.status(500).json(error);
        }
    }
};