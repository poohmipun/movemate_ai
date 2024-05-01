import mongoose, { Schema } from "mongoose";

// Set up MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

mongoose.Promise = global.Promise;

// Define the schema for the conditions
const conditionSchema = new Schema({
  id: { type: String, required: true }, // Ensure every condition has a unique ID
  condition: { type: String, required: true },
  formData: { type: Schema.Types.Mixed, required: true }, // Allows dynamic data based on condition type
  order: { type: Number, required: true }, // Track the order of conditions
});

// Define the main schema for the workout program data
const WorkoutProgramSchema = new Schema({
  img_url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_condition: [conditionSchema], // Use the condition schema for start conditions
  end_condition: [conditionSchema], // Use the same for end conditions
});

// Create a model using the schema
const WorkoutProgram =
  mongoose.models.WorkoutProgram ||
  mongoose.model("WorkoutProgram", WorkoutProgramSchema);

export default WorkoutProgram;
