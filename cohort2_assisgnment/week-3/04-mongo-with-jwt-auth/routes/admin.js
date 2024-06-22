const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { User, Course, Admin } = require('../db/index')
const router = Router();
const jwt_secret = "ajay";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const { username, password } = req.body;

    const user = await Admin.find({ username });
    if (user) {
        res.status(200).json("user already exist in the database");
    }
    await Admin.create({ username, password });
    res.status(200).json("account has created successfully");
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const { username, password } = req.body;
    const user = await Admin.find({ username });
    if (!user) {
        res.status(401).json("user doesn't exist");
    }
    // here we have need to add the hashing verify password
    const token = await jwt.sign({ username }, jwt_secret);
    res.status(200).json(token);


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const { title, description, price, imageLink } = req.body;

    await Course.create({ title, description, price, imageLink });
    res.status(200).json("course has been added");



});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const course = await Course.find({});
    res.status(200).json(course);
});

module.exports = router;