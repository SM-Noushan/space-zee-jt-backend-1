import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config/index.js";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

// hash password
userSchema.pre("save", async function (next) {
  if (this.password)
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRounds)
    );
  next();
});

// hide password
userSchema.post("save", async function (doc, next) {
  if (doc.password) doc.password = "🤫";
  next();
});

// check if user already exists
userSchema.statics.isUserExistsByUsername = async function (username) {
  const isUserExists = await this.findOne({
    username: { $regex: username, $options: "i" },
  });

  return isUserExists;
};

export const User = model("User", userSchema);