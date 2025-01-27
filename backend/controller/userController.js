import User from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = async (req, res, next) => {
    try {
        const { email, phone, } = req.body;

        // checking existed email
        const existedEmail = await User.findOne({ email: email });
        if (existedEmail) {
            return next(new ErrorHandler("Email Already registered", 401));
        }

        // checking existed phone number
        const existedPhone = await User.findOne({ phone: phone });
        if (existedPhone) {
            return next(new ErrorHandler("Phone Number is already registered", 401));
        }

        const user = await User.create({
            userName,
            email,
            phone,
            password,
            role: "user",
            isVerified: false,
            avatar: {
                photo_id: "this is sample id",
                url: "photourl"
            }
        });

        res.stauts(200).json({
            success:true,
            message:"User Register Successfully",
            data:user
        })

    } catch (error) {
        next(new ErrorHandler(error.message));
    }
}
