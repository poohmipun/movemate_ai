import mongoose, { Schema } from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

mongoose.Promise = global.Promise;

const ProgramSchema = new Schema({
  img_url: String,
  title: String,
  description: String,
  joint_rotation_1: String,
  joint_rotation_2: String,
});

const Program =
  mongoose.models.Program || mongoose.model("Program", ProgramSchema);

export default Program;
