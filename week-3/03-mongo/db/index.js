const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:1vaAcgcHBb6f7ygM@100xdevs.qe8nt4o.mongodb.net/assignment');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password : String
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description : String,
    price:Number,
    img: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}