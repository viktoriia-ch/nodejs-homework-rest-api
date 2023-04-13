const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", handleMongooseError);

const registerAndLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerAndLoginSchema,
};
