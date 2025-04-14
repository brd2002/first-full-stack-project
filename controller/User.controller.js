import User from "../model/User.model.js";
import crypto, { verify } from "crypto";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken' ; 
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
  // * get data from req body
  // validate
  // check in database is it exixt or not
  // create user in database
  // create a verification token
  // save  token in database
  // send  token as email to user
  // send success status to user
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User not register.",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token;
    await user.save();
    // send email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_USER_PASSWORD,
      },
    });
    const mailOption = {
      from: "bharatruidas261@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "verify your email please", // Subject line
      text: `Please click one following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
    };
    const res = await transporter.sendMail(mailOption);
    console.log(res);
    res.status(201).json({
      message: "User registered sucessfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not  registered ",
      success: false,
    });
  }
};
export const verifyUser = async (req, res) => {
  // get token from url
  // validate
  // find user based on token
  // if not
  // set isVerified field to true
  // remove verification token
  // save
  // return respose
  const { token } = req.params;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
};
export const loginUser = async(req , res ) => {
  const {email , password} = req.body ; 
  if (!email || !password) {
    return res.status(400).json({
      message : "all fields are required"
    })
  }
  try {
   const user =  await User.findOne({email}); 
   if(!user){
    return res.status(400).json({
      message : "Invalid email!"
    })
   }
  const isMatch = await bcrypt.compare(password , user.password) ; 
  console.log(isMatch);
  if(!isMatch){
    return res.status(400).json({
      message : "Wrong password!"
    })
  }
  const token = jwt.sign({id : user._id , name : user.name} , 'bharat' , {
    expiresIn : '1d'
   }) ;
  
   res.cookie("test" ,  token , {httpOnly : true , secure : true , maxAge : 24*60*60});
   res.status(200).json({
    message : "user login successfully",
    success : true
   })
  } catch (error) {
    res.status(400).json({
      message : "something is going wrong !"
    })
  }
   
}

// exports = { registerUser };
