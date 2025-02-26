import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: ["true", "Name must be required"],
      minlength: [4, "minimum length of name is 4"],
      maxlength: [50, "maximum length is 50"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: ["true", "email must be required"],
      lowercase: true,
      unique: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Use a valid email id",
      ],
    },
    password: {
      type: String,
      // required: ["true", "password must be required"],
      select: false,
      // minlength: [5, "Password must contain atleast 5 charactors"],
    },
    avatar:{
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "ADMIN",
    },
    subscription:{
      id: {
        type: String,
      },
      status:{
        type: String,
      }
    },

    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      return next();
  }
  this.password=await bcrypt.hash(this.password,10)
  return next();

})



userSchema.methods = {
  generateJWTtoken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
        subscription: this.subscription,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      }
    );
  },
  comparePassword:async function (password) {
        return await bcrypt.compare(password,this.password)
  },
  generatePasswordResetToken: async function () {
    // creating a random token using node's built-in crypto module
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Adding forgot password expiry to 15 minutes
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return resetToken;
  }
};


const User = model("User", userSchema);

export default User;
