const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    await User.create(
        {
            username, 
            password
        });

    res.json(
        { message: 'User created successfully' }
    )
});

router.post('/signin', async (req, res) => {
    const {username} = req.body;
    
    const user = await User.findOne({username:username});

    const token = jwt.sign({username:user.username}, SECRET_KEY);
    
    res.status(200).json({
        token,
    })
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const { username } = req.headers;

    const course = await Course.exists({_id: courseId});
    const user = await User.findOne({username:username});

    const purchasedCourseId = user.purchasedCourses.find(purchasedCourse => purchasedCourse._id.toString() === courseId);
    
    if(purchasedCourseId){
        res.json({
            message: "Already purchased"
        });
        return;
    }

    user.purchasedCourses.push(course);
    await user.save();

    res.status(200).json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const { username } = req.headers;

    const user = await User.findOne({username: username});
    const { purchasedCourses}  = await user.populate("purchasedCourses");
    
    res.json({
        purchasedCourses
    })
});

module.exports = router;