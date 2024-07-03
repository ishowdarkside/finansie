import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<UserInterface>({
  firstName: {
    type: String,
  },
});
