import mongoose from "mongoose";
import slugify from "slugify";
import Currency from "../utils/currency.js"

const productSchema = mongoose.Schema(
  {
      name: {
        type : String,
        required : [true, "Product Name Cannot be Empty!"],
        trim : true,
      },

      brand : {
        type : String,
        required : [true, "Brand Name Cannot be Empty!"],
      },

      category : {
        type : mongoose.Schema.ObjectId,
        ref : "Categorie",
      },

      description : {
        type : String,
        trim : true,
        required : [true, "Product Description Cannot be Empty!"],
      },

      images : {
        type: [String],
      },

      slug : {
        type : String,
      },

      inventory : [{

                  sku_variant : {
                      type : {},
                      max : 1,
                    },

                  sub_variants : [{

                          sub_variant : {
                          type : {},
                          max : 1,
                        },

                        price : {

                                  base: {
                                    type : Number,
                                    min : [0, "Base Price Cannot Be less than 0."],
                                    required : true,
                                  },
                      
                                  currency : {
                                    type : String,
                                    default : Currency.INR,
                                  },
                      
                                  discount : {
                                    type : Number,
                                    min : [0, "Dicount Cannot Be Less than 0."],
                                    max : [100, "Discount Cannot Exceed 100."],
                                    default : 0,
                                  },

                        },

                        coupon : {
                          type: mongoose.Schema.ObjectId,
                          ref: "Coupon",
                        },

                        in_stock : {
                          type : Boolean,
                          default : true,
                        },

                        stock : {

                                quantity : {
                                  type: Number,
                                  min: 0,
                                },
                          
                                sold: {
                                  type: Number,
                                  min: 0,
                                },
      
                        },
                    
              }],

  }],

  isActive : {
        type : Boolean,
        default : true,
    },

},

{
  timestamps : true,
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
  
  (this.product.inventory).map(sku => {

    return (sku.sub_variants).map(sub_variant => {

        return (Math.round(sub_variant.price.base-(sub_variant.price.base*(sub_variant.price.discount/100))));

    });

  });

  next();

});

const Product = mongoose.model("Product", productSchema);
export default Product;
