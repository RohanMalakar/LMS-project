import { ContactUs } from "../models/contact.model.js";
import User from "../models/user.model.js";
import AppError from "../utills/error.utills.js";
import sendMail from "../utills/sendMail.utills.js";

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("Name, Email, Message are required"));
  }

  const contact = await ContactUs.create({
    name,
    email,
    message,
  });

  contact.save();

  res.status(200).json({
    success: true,
    message: "Your message has send successfully",
    data: contact,
  });
};
export const getcontactUs = async (req, res, next) => {
  const contact = await ContactUs.find();
  res.status(200).json({
    success: true,
    message: "Contact Details",
    data: contact,
  });
};
export const userStats = async (req, res, next) => {
  try {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
      "subscription.status": "active",
    });

    res.status(200).json({
      success: true,
      message: "All registered users count",
      allUsersCount,
      subscribedUsersCount,
    });
  } catch (error) {
    return next(new AppError(400, error.message));
  }
};
