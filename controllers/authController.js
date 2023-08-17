const OTP = require("../models/OTP");
const User = require("../models/UserModel");
const otpGenerator = require("otp-generator")
const bcrypt = require('bcrypt');


exports.generateOTP = async (req, res) => {
    try{
        const {email} = req.body;

        const userOTP = await User.findOne({email});
        //console.log(userOTP)
        if(userOTP) {
            return res.status(400).json({
                success: false,
                message: "User already exsits"
            })
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log(otp);

        const otpPush = await OTP.create({
            email: email,
            otp: otp,
        })

        return res.status(200).json({
            success: true,
            message: "OTP generated successfully.",
            data: otp
        })

    }catch(err) {
        return res.status(500).json({
            success:false,
            message: err
        })
    }

}

exports.signUp = async (req, res) => {
    try{
        const {name, email, password, otp} = req.body;
        const checkUser = await User.findOne({email});

        if(checkUser) {
            return res.status(500).json({
                success: false,
                message: "User already exists."
            })
        }
        const checkOTP = await OTP.findOne({email});

        console.log(checkOTP);
        if(checkOTP.otp !== otp) {
            return res.status(501).json({
                success: false,
                message: "OTP does not match.",
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);
        const user = await User.create({
            name, email, password: encryptedPassword
        })
        
        res.status(200).json({
            success: true,
            message: "User created successfully."
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message: err
        })
    }
}