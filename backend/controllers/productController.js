//Import product.js file from models
const Product = require("../models/product");

//Import Error Handler
const ErrorHandler = require("../utils/errorHandler");

//Import catchAsyncErrors file
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Import APIFeatures to search method
const APIFeatures = require("../utils/apiFeatures");

//Create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products to database => /api/v1/products?keyword=name
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  /*
  con esta línea puedo probar el react-alert
  return next(new ErrorHandler('My error', 400));
  */
  
  //Pagination (Objects by each page)
  const resPerPage = 20;
  //To give total number of products in database
  const productsCount = await Product.countDocuments();

  //Add component search into getProducts method
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  //Product resource
  const products = await apiFeatures.query;
  
  //It is to wait until the products are already ready.
  setTimeout(() => {
    res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      products,
    });
  }, 0);
});

//Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //if the product id isn't found
  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  //if the product exists
  res.status(200).json({
    success: true,
    product,
  });
});

//Update Product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //if the product id isn't found
  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  //if the product exists
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  //Response
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product => /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //if the product exists
  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  //if the product exists
  await product.remove();

  //Response
  res.status(200).json({
    success: true,
    Message: "Producto eliminado exitósamente",
  });
});
