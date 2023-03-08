const express = require("express");
const router = express.Router();

//Import methods from productController
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//Import auth file (middleware)
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//-------------------------------------------------------------------//

//Obtain all products in route /products
router.route("/products").get(getProducts);

//Obtain a single products in route /product/:id
router
  .route("/product/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleProduct);

//create product in route /product/new
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

//Update and delete a single products params in route /product/:id
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
