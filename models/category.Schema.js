import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Field Cannot be Empty!"],
      unique: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Categorie", categorySchema);
 
