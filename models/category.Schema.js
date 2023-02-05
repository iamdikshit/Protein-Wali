import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category field cannot be empty!"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categorie", categorySchema);
