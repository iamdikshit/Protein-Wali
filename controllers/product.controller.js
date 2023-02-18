import Product from "../models/product.Schema.js";
import asyncHandler from "../services/asyncHandler.js";

/******************************************************
 * @GET_ALL_PRODUCTS
 * @REQUEST_TYPE GET
 * @Route       /
 * @Description Controller to fetch all the products from the database
 * @Middleware
 * @Parameters
 * @Returns Product Object
 ******************************************************/
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});
