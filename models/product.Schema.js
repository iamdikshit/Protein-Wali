import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = mongoose.Schema(
  {
      name: {
        type: String,
        required: [true, "Product name cannot be empty!"],
        trim: true,
      },

      category: {
        type: mongoose.Schema.ObjectId,
        ref: "Categorie",
      },

      specification: [],

      description: {
        type: String,
        trim: true,
        required: [true, "Product description cannot be empty!"],
      },

      images: {
        type: [String],
      },

      mrp: {
        type: Number,
        required: [true, "MRP field cannot be empty!"],
        min: [0, "Price must be grater than 0"],
      },

      discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      price: {
        type: Number,
        min: 0,
      },

      slug: {
        type : String,
      },

      stock: {
        type: Number,
        min: 0,
      },

      sold: {
        type: Number,
        min: 0,
      },

      isActive: Boolean,
    },

    {
      timestamps: true,
    },

);

/*
@DOCUMENT MIDDLEWARE TO MAKE THE SLUG USING PRODUCT NAME
*/
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/*
@DOCUMENT MIDDLEWARE TO CALCULATE THE PRICE BASED ON MRP AND DISCOUNT
*/
productSchema.pre("save", function (next) {
  this.price = Math.round(this.mrp - this.mrp * (this.discount / 100));
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
