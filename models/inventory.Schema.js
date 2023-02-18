import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    variant_name: {
      type: String,
      trim: true,
      required: [true, "Variant name field cannot empty"],
    },
    product_Id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    sku: {
      type: String,
    },
    // options given by user
    option: [],
    price: {
      type: Number,
      required: [true, "Price field cannot empty"],
    },
    quantity: {
      type: Number,
    },
    images: [],

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventorie", inventorySchema);
export default Inventory;
