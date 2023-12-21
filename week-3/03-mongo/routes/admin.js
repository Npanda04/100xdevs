const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
app.post('/signup', (req, res) => {
    // Implement admin signup logic
    const {username , password} = req.body;

    const admin = new Admin({username, password})
    admin.save()
    res.status(201).json({ msg: "admin created successfully" });

});

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const { id, title, description, price, image } = req.body;

    Course.create({
      id: id,
      title: title,
      description: description,
      price: price,
      image: image,
    });
  
    res.status(201).json({ msg: "course added successfully" });

});

app.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then((courses) => {
        res.send(courses);
      });
});

module.exports = router;