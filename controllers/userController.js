const { User, Thought } = require("../models")

module.exports = {
    // get all users
    async getUsers ( req, res ) {
        try{
            const users = await User.find()
            .select("-__v")
            .populate("thoughts")
            .populate("friends")

            res.json(users);
        }catch(error){
            res.status(500).json(error);
        }
    },
    // get a single user
    async getSingleUser ( req, res ) {
        try{
            const user = await User.findOne ({ _id: req.params.userId })
            .select("-__v")
            .populate("thoughts")
            .populate("friends")
            
        if(!user){
            return res.status(404).json(
                {
                    message: "No user with that ID"
                }
            );
        }
        res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // create a new user
    async createUser ( req, res ) {
        try {
            const dbUserData = await User.create ( req.body );
            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // select one user and update
    async updateUser ( req, res ) {
        try {
            const user = await User.findeOneAndUpdate( 
            {
                _id: req.params.userId,
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        );

        if(!user) {
            return res.status(404).json(
                {
                    message: "No user with that ID!"
                }
            )
        };

        res.status(200).json(user);

        }catch (error) {
            res.status(500).json(error);
        }
    },

    // delete the user
    async deleteUser ( req, res ) {
        try {
            const user = await User.findOneAndDelete(
                {
                    _id: req.params.userId,
                }
            );

            if(!user) {
                return res.status(404).json(
                    {
                        message: "No user with that ID!"
                    }
                )
            };

            await Thought.deleteMany({ _id: { $in: user.thoughts }});

            res.satus(200).json(
                {
                    message: "User and all his thoughts deleted!!"
                }
            );

        }catch (error) {
            res.status(500).json(error);
        }
    }
}; 