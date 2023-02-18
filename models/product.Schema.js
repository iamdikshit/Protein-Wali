import mongoose from "mongoose";
import slugify from "slugify";
import Currency from "../utils/currency.js";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name Cannot be Empty!"],
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Brand Name Cannot be Empty!"],
    },
    manufaturer: {
      type: String,
      required: [true, "Brand Name Cannot be Empty!"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Categorie",
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Product Description Cannot be Empty!"],
    },

    images: {
      type: [String],
    },

    slug: {
      type: String,
    },
    pricing: {
      price: {
        type: Number,
        required: [true, "Price Cannot be Empty!"],
      },
      Compare_at_price: {
        type: Number,
      },
      cost_per_item: {
        type: Number,
      },
      profits: {
        profit: {
          type: Number,
        },
        margin: {
          type: Number,
        },
      },
    },
    sku_name: {
      type: String,
      trim: true,
    },
    options: [],
    varients: [],
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
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
  this.product.inventory.map((sku) => {
    return sku.sub_variants.map((sub_variant) => {
      return (sub_variant.price.amount = Math.round(
        sub_variant.price.base -
          sub_variant.price.base * (sub_variant.price.discount / 100)
      ));
    });
  });

  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
