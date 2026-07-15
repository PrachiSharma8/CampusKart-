// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/auth");
// const upload = require("../config/multer");

// const {
//     addProduct,
//     getProducts,
//     getSingleProduct,
//     updateProduct,
//     deleteProduct, 
//     getMyProducts 
// } = require("../controllers/productController");

// console.log("✅ Product routes loaded");

// // Create Product
// router.post(
//     "/add",
//     auth,
//     upload.single("image"),
//     addProduct
// );

// // Get All Products
// router.get("/", getProducts);

// router.get("/my-products", auth, getMyProducts); 
// // Get Single Product
// router.get("/:id", getSingleProduct);

// // Update Product
// router.put(
//     "/:id",
//     auth,
//     upload.single("image"),
//     updateProduct
// ); 

// // Delete Product
// router.delete("/:id", auth, deleteProduct); 

// module.exports = router; 

// Create Product
router.post("/add", (req, res, next) => {
    console.log("✅ POST /add route matched");
    next();
}, auth, upload.single("image"), addProduct);

// Get All Products
router.get("/", getProducts);

router.get("/my-products", auth, getMyProducts);

// TEMPORARY TEST
router.get("/add", (req, res) => {
    console.log("✅ GET /add route matched");
    res.json({
        success: true,
        message: "GET /add works"
    });
});

// Get Single Product
router.get("/:id", getSingleProduct);

router.put("/:id", auth, upload.single("image"), updateProduct);

router.delete("/:id", auth, deleteProduct); 