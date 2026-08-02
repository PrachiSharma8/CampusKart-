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
router.post(
    "/add",
    (req, res, next) => {
        console.log("STEP 1");
        next();
    },

    auth,

    (req, res, next) => {
        console.log("STEP 2");
        next();
    },

    upload.single("image"),

    (req, res, next) => {
        console.log("STEP 3");
        console.log(req.body);
        console.log(req.file);
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