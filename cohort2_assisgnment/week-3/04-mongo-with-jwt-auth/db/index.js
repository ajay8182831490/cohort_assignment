const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ajay8182831490:*****@blogapi.dstwlyr.mongodb.net/?retryWrites=true&w=majority');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here

    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    sername: String,
    password: String,
    purchaseCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Course
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here

    title: String,
    description: String,
    image: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}