const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt_secret = "ajay";

const { User, Course, Admin } = require('../db/index')


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    // firstly we will check user exist or not if the user not exist then we will create a new account

    const username = req.body;
    const password = req.body;

    const findUser = await User.find({ username });
    if (findUser) {
        res.status(201).json("user already exist")
    }

    await User.create({ username: username, password: password });

    res.status(201).json("account has been created");

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    // here we will check the user exist or not if the user exist then we will verift the passwrod with secret code
    const username = req.body;
    const password = req.body;

    const findUser = await User.find({ username, password });// here we have need to verify the password (after storing the hash password during the creation of new account)
    if (!findUser) {
        res.status(401).json("user does not exist in the database")
    }

    const token = await jwn.sign({ username }, jwt_secret);
    res.status(201).json({ token: token });


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    // here we will return all the list of list Course.find({});
    const course = await Course.find({});
    res.status(201).json(course);

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic



    const userId = req.user._id;

    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
        res.status(401).json("course does not exist in the database")
    }

    const user = await User.findByIdAndUpdate(userId,);
    if (!user) {
        res.status(401).json("something error please try again later");
    }
    if (Course.purchasedCourses.include(courseId)) {
        res.status(201).json("course already exist in the user account");
    }

    user.purchasedCourses.push(courseId);
    user.save();
    res.status(201).json("course is added in your account");

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const userId = req.user._id;
    await Course.findById(userId).
        popoulate('purchasedCourses')
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ purchasedCourses: user.purchasedCourses });
        });
});

module.exports = router