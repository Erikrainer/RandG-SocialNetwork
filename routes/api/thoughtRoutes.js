const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);


module.exports = router;