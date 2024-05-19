const { Thought, User } = require("../models");


module.exports = {
    // get all the thought
    async getThought ( req, res ) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //get a single thought
    async getSingleThought ( req, res ) {
        try {
            const thought = await Thought.findOne ({ _id: req.params.thoughtId });

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
            { $addToSet: { thought: thought._id } },
            { new: true }
        );

        if(!user) {
            return res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' });
        }

        res.json("Created the thought!");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
};