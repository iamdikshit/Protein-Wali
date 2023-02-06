import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  
  {
      name: {
        type: String,
        required: [true, "Category Cannot Be Empty!"],
      },
  },

  {
      timestamps: true,
  },

);

export default mongoose.model("Categorie", categorySchema);
