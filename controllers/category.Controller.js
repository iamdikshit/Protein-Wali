import Category from "../models/category.Schema.js";
import asyncHandler from "../services/asyncHandler.js";
import AppError from "../services/appError.js";



/******************************************************
 * @GET_CATEGORIES_BY_ID
 * @REQUEST_TYPE GET
 * @Route       /:id
 * @Description Controller to Fetch an Existing Category in the Database 
 *              based on ID of Category passed in URL
 * @Middleware  auth.Middleware, roles.Middleware
 * @Parameters  id from URL
 * @Returns     Category Object
 ******************************************************/

export const getCategoryById = asyncHandler(async (req, res, next) => {

  const { id : categoryId } = req.params;

  const category = await Category.findById(categoryId);

  // Check Whether Category is Found By ID
  if(!category){

    next(new AppError("Category Not Found.",404));

  };

  // Sending Response if Category gets Sucessfully Fetched by ID from the Database
  return res.status(200).json({
    status: "success",
    data: category,
  });

});





/******************************************************
 * @GET_ALL_CATEGORIES
 * @REQUEST_TYPE GET
 * @Route       /
 * @Description Controller to Fetch all the Categories from the Database
 * @Middleware  auth.Middleware, roles.Middleware
 * @Parameters  None
 * @Returns     Category Object
 ******************************************************/

export const getAllCategories = asyncHandler(async (_req, res, next) => {

  const categories = await Category.find();

  // Check Whether All Category Fetched Successfully
  if(!categories){

    next(new AppError("No Categories Found.",404));

  };

  // Sending Response if Categories List gets Sucessfully Fetched from the Database
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
 * @Description Controller to Insert a New Category in the Database
 * @Middleware  auth.Middleware, roles.Middleware
 * @Parameters  name
 * @Returns     Success Message
 ******************************************************/

export const insertCategory = asyncHandler(async (req, res, next) => {

  // Grab Name from Frontend
  const {name} = req.body;

  // Validate Whether "name" is Empty or Not.
  if(!name){

      next(new CustomError("Category Name is Required",400));

  };

  // Inserting New Category Name Entry in the Database
  const category = await Category.create(name);

  // Check Whether Category is Insert
  if(!category){

    next(new AppError("Unable to Create New Category.",401));

  };

  // Sending Response if Category gets Sucessfully Inserted in the Database
 return res.status(201).json({
    status: "success",
    data: category,
  });

});








/******************************************************
 * @UPDATE_CATEGORIES
 * @REQUEST_TYPE POST
 * @Route       /id
 * @Description Controller to Update an Existing Category in the Database 
 *              based on ID of Category passed in URL
 * @Middleware  auth.Middleware, roles.Middleware
 * @Parameters  id from URL, name
 * @Returns     Success Message
 ******************************************************/

export const updateCategory = asyncHandler(async (req, res, next) => {

  // Grab ID From URL
  const { id : categoryId } = req.params;

  // Grab Name from Frontend
  const {name} = req.body;

  // Validate wether Name is Empty or Not.
  if(!name){

    next(new CustomError("Category Name is Required.",400));

  };

  const category = await Category.findByIdAndUpdate(
        categoryId,

        {
            name,
        },

        {
            new : true,
            runValidators : true,
        }
  );
  
  // Check Whether Category is Updated
  if(!category){

    next(new AppError("Unable to Update Category.",401));

  };

  // Sending Response if Category gets Updated Sucessfully in the Database
  return res.status(200).json({
    status: "success",
    data: category,
  });

});








/******************************************************
 * @DELETE_CATEGORIES
 * @REQUEST_TYPE POST
 * @Route       /id
 * @Description Controller to Delete an Existing Category in the Database 
 *              based on ID of Category passed in URL
 * @Middleware  auth.Middleware, roles.Middleware
 * @Parameters  id from URL
 * @Returns     Success Message
 ******************************************************/

export const deleteCategory = asyncHandler(async (req, res, next) => {

  // Grab ID From URL
  const { id : categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  // Check Whether Category is Deleted
  if(!category){

    next(new AppError("Unable to Delete Category.",401));

  };

  // Sending Response if Category gets Deleted Sucessfully in the Database
  return res.status(204).json({
    status: "success",
  });

});
