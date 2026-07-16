const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../config/multer");

const {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getMyProducts
} = require("../controllers/productController");

// ===================== ADD PRODUCT =====================
// TEMPORARY: upload middleware removed for testing
router.post(
    "/add",
    auth,
    upload.single("image"),
    (req, res, next) => {

        console.log("====== AFTER MULTER ======");
        console.log("BODY =", req.body);
        console.log("FILE =", req.file);

        next();

    },
    addProduct
); 

// ===================== GET ALL PRODUCTS =====================
router.get("/", getProducts);

// ===================== MY PRODUCTS =====================
router.get("/my-products", auth, getMyProducts);

// ===================== SINGLE PRODUCT =====================
router.get("/:id", getSingleProduct);

// ===================== UPDATE PRODUCT =====================
router.put(
    "/:id",
    auth,
    upload.single("image"),
    updateProduct
);

// ===================== DELETE PRODUCT =====================
router.delete("/:id", auth, deleteProduct);

module.exports = router; 