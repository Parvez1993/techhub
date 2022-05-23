import mongoose from "mongoose";

const landingScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    subDescription: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Landing = mongoose.model("Landing", landingScheme);

export default Landing;
