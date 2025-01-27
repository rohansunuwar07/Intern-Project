import mongoose from "mongoose";
import { isLowercase, trim } from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your FullName."],
        maxlength: [50, "Name can't be exceed above 50 character"],
        minlength: [2, "Name should have been more than 2 character"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowecase: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please enter the validate email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, "Please Enter Your Phone Number"],
        trim: true,
        unique: true,
        minlength: 10,
        validate: [/^\d{10,}$/, "Please enter a valid number"]
    },
    address:{
        type:String,
        required:[true, "Please Enter your Address"],
        minlength:50,
    },
    relatedCollegeName: {
        type: String,
        required: [true, "Please Enter Your college or institute name"],
        maxlength: [100, "College or Institute Name cannot exceed more than 100 characters"],
        minlength: [10, "College or Institute Name must be more than 10 characters"]
    },
    acadmicStatus: {
        type: String,
        required: [true, "Please Enter your Academic Status"]
    },
    interestedCourse: {
        type: String,
        required: [true, "Please Enter the Name of the Course which is in your interest"],
    },
    preferredShift: {
        type: String,
        required: [true, "Please Enter your preferred time"]
    },
    internshipChoice: {
        type: String,
        required: [true, "Please Enter your intern choice"]
    },
    relatedQuestions: {
        type: String,
    },

})