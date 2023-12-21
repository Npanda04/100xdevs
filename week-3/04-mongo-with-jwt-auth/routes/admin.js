const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    await Admin.create(
        {
            username, 
            password
        });

    res.status(201).json(
        { message: 'Admin created successfully' }
    )
});

router.post('/signin', async (req, res) => {
    const {username} = req.body;
    
    const admin = await Admin.findOne({username:username});

    const token = jwt.sign({username:admin.username}, SECRET_KEY);
    
    res.status(200).json({
        token,
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const {title, description, price, imageLink} = req.body;
    
    const newCourse = await Course.create({
        title, description, price, imageLink
    })

    res.status(200).json(
        { message: 'Course created successfully', courseId: newCourse._id }
    )
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();
    res.status(200).json({
        courses
    });
});

module.exports = router;