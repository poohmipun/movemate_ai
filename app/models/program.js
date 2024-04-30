import mongoose, { Schema } from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

mongoose.Promise = global.Promise;

// Define the schema for dynamic data
const DynamicSchema = new Schema({
  img_url: String,
  title: String,
  description: String,
  start_condition: [
    {
      condition: String,
      formData: Schema.Types.Mixed,
    },
  ],
  end_condition: [
    {
      condition: String,
      formData: Schema.Types.Mixed,
    },
  ],
});

// Create a model for dynamic data
const DynamicModel =
  mongoose.models.DynamicModel || mongoose.model("DynamicModel", DynamicSchema);

export default DynamicModel;
