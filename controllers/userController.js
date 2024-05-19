const User = require("../models/User");

module.exports = {
    // get all users
    async getUsers ( req, res ) {
        try{
            const users = await User.find()
            .select("-__v");
            res.json(users);
        }catch(error){
            res.status(500).json(error);
        }
    },
    // get a single user
    async getSingleUser ( req, res ) {
        try{
            const user = await User.findOne ({ _id: req.params.userId })
            .select("-__v");

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
    }
}; 