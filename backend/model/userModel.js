import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";
import validator from "validator";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter your FullName."],
        maxlength: [50, "Name can't be exceed above 50 character"],
        minlength: [2, "Name should have been more than 2 character"]
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
    password: {
        type: String,
        required: [true, "Please Enter the password"],
        trim: true,
        unique: true,
        select: false,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, "Please Re-Enter the password"],
        trim: true,
        minlength: 8,
        // Checking the password and confirm password is same or not 
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message:"password are not same"
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    bio: {
        type: String,
        maxlength: 1000
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }

});

// Pre hooks to hash the newly created or updated password
userSchema.pre("save", async function (next) {
    //    only run this function if password is modified
    if (!this.isModified("password")) {
        return next(new ErrorHandler("Password is modified", 401));
    }
    // hash password
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
})

// If the password is changed or new document is created
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) {
        return next(new ErrorHandler("password is changed", 401));
    }
    this.passwordChangedAt = Date.now() - 3000;
    next();
});

// userSchema.pre(/^find/, function (next){
//     this.find({active: {$ne: false}});
//      next();
// })

// Instance method to compare the hashed password with the input password
// userSchema.methods.correctPassword = async function () {

// }


const User = mongoose.model("UserDetails", userSchema);
export default User;