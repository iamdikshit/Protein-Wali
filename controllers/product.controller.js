import asyncHandler from "../services/asyncHandler.js";
import AppError from "../services/appError.js";
import Product from "../models/product.Schema.js";









export const insertProduct = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const category = await Product.create(req.body);
  
    res.status(201).json({
      status: "success",
      data: category,
    });
  });