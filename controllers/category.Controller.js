import Category from "../models/category.Schema.js";
import asyncHandler from "../services/asyncHandler.js";

/******************************************************
 * @GET_ALL_CATEGORIES
 * @REQUEST_TYPE GET
 * @Route       /
 * @Description Controller to fetch all the categories from the database
 * @Middleware
 * @Parameters
 * @Returns Category Object
 ******************************************************/
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  return res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories,
  });
});

/******************************************************
 * @INSERT_CATEGORIES
 * @REQUEST_TYPE POST
 * @Route       /
 * @Description Controller to insert the categories into the database
 * @Middleware
 * @Parameters
 * @Returns Category Object
 ******************************************************/
export const insertCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: category,
  });
});

/******************************************************
 * @UPDATE_CATEGORIES
 * @REQUEST_TYPE POST
 * @Route       /id
 * @Description Controller to update the categories into the database
 * @Middleware
 * @Parameters
 * @Returns Category Object
 ******************************************************/
export const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: category,
  });
});

/******************************************************
 * @DELETE_CATEGORIES
 * @REQUEST_TYPE POST
 * @Route       /id
 * @Description Controller to delete the categories into the database
 * @Middleware
 * @Parameters
 * @Returns Category Object
 ******************************************************/
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
