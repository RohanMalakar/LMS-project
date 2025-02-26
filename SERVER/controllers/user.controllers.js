import User from "../models/user.model.js";
import ApiError from "../utills/error.utills.js";
import emailValidator from "email-validator";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendMail from "../utills/sendMail.utills.js";
import crypto from "crypto";
import generateWelcomeEmailHTML from "../utills/registrationSubmitionMessage.js";

const cookieOptions = {
  maxAge: 7 * 1000 * 60 * 60 * 24, 
  httpOnly: true,
  secure: true,
};

const register = async function (req, res, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new ApiError(409, "Every field is required"));
  }
  const valid = emailValidator.validate(email);

  if (!valid) {
    return next(new ApiError(409, "Enter a valid email id"));
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return next(new ApiError(409, "User is already exist"));
  }

  
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: null,
      secure_url: null,
    },
  }); 

  if (!user) {
    return next(new ApiError(409, "User is not created"));
  }
  try {
    if (req.file) {
        await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "LMS",
            width: 250,
            hight: 250,
            gravity: "face",
            crop: "fill",
          },
          (error, result) => {
            
            if (result) {
              fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                  return next(err);
                }
                console.log(`File ${req.file.filename} deleted from uploads folder.`);
              });
              user.avatar.public_id=result.public_id;
              user.avatar.secure_url=result.secure_url;
            }
          }
        );
      }
  } catch (error) {
    return next(new ApiError(409, error.message)); 
  }
  await user.save();
  user.password = undefined;
  console.log(user);
  const token = await user.generateJWTtoken();
  res.cookie("token", token, cookieOptions);
  
  const messageHTML=generateWelcomeEmailHTML(user.fullName);
    try {
        await sendMail({
            email:user.email,
            subject:"Registration confirmation Email",
            messageHTML
        });
    } catch (error) {
        console.log("error",error);
  }

  return res.status(202).json({
    success: true,
    message: "Registered Successfully",
    data: user,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(409, "Every field is required"));
  }

  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    return next(new ApiError(409, "Unautherised access"));
  }
  console.log(user);
  if (!(await user.comparePassword(password))) {
    return next(new ApiError(409, "Incorrect password"));
  }
  const token = await user.generateJWTtoken();
  res.cookie("token", token, cookieOptions);

  return res.status(202).json({
    success: true,
    message: "user loged in sucessfully",
    data:user
  });
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(202).json({
    success: true,
    message: "user logged out sucessfully",
  });
};

const profile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(202).json({
      success: true,
      message: " this is user Details",
      data: user,
    });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

const forgotPassword = async (req, res, next) => {
  
  const { email } = req.body;

  if (!email) {
    return next(new ApiError(409, "Email is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, "Email is incorrect"));
  }

  const resetToken = await user.generatePasswordResetToken();
  await user.save();
  

  const resetPasswordURL = `${process.env.CLIENT_URL}/ forreset_password <a href=${resetToken} >click here</a>`;
  const message = `${resetPasswordURL}`;
  const subject = `you can reset your passwor her`;

  try {
    await sendMail(email, subject, message);
    res.status(202).json({
      success: true,
      message: `Reset password token has been send to your ${email} successfuly`,
    });
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save;
    return next(new ApiError(404, error.message));
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;
  if (!resetToken) {
    return next(new ApiError(404, "Does not have proper Information"));
  }
  if (!password) {
    return next(new ApiError(404, "Enter Your New password"));
  }
  const forgotPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError(404, "Token is invalid Please try again "));
  }
  if (!user) {
    return next(new ApiError(404, "Token is  expired , Please try again "));
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  user.password = password;
  await user.save();

  return res.status(202).json({
    success: true,
    message: "Your Password is Reset successfuly",
  });
};

const changePassword = async function (req, res, next) {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
 
  if (!oldPassword || !newPassword) {
    return next(new ApiError(400, "Every field is required "));
  }

  const user = await User.findById(id).select("+password");
  if (!user) {
    return next(new ApiError(404, "User does not exist"));
  }

  if (await !user.comparePassword(oldPassword)) {
    return next(new ApiError(400, "Enter your correct password"));
  }

  user.password = newPassword;
  await user.save();
  user.password = undefined;

  return res.status(202).json({
    success: true,
    message: "Your Password is Reset successfuly",
  });
};

const updateProfile = async (req, res, next) => {
   const id = req.user.id;
  
  const {fullName}= req.body;

  const user = await User.findById(id);
  
  if (!user) {
    return next(new ApiError(400, "Unautherized access"));
  }
 

  if (fullName) {
    user.fullName = fullName;
  }
  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        hight: 250,
        gravity: "face",
        crop: "fill",
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return next(err);
          }
          console.log(`File ${req.file.filename} deleted from uploads folder.`);
        });
      }
    } catch (error) {
      return next(
        new ApiError(500, error.message  || "file not uploaded please try again ")
      );
    }

  }
   
   await user.save()
   return res.status(202).json({
    success: true,
    message: "Your profile is Updated successfuly",
    data: user
  });
};

export {
  register,
  login,
  logout,
  profile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
