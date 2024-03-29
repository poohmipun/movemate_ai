import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const ProgramSchema = new Schema({
  img_url: String,
  title: String,
  desciption: String,
  both_arm: Boolean,
  back_bending: Boolean,
  keypoint_1: String,
  keypoint_2: String,
  keypoint_3: String,
  keypoint_4: String,
});

const Programs =
  mongoose.models.Programs || mongoose.model("Programs", ProgramSchema);

export default Programs;
