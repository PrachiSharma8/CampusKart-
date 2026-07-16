const Product = require("../models/Product");
const mongoose = require("mongoose");

// ===================== Add Product =====================
// const addProduct = async (req, res) => {
//     try {

//         console.log("===== ADD PRODUCT =====");

//         console.log("User:");
//         console.log(req.user);

//         console.log("Body:");
//         console.log(req.body);

//         console.log("File:");
//         console.log(req.file);

//         const productData = {
//             ...req.body,
//             seller: req.user.id
//         };

//         // Cloudinary automatically gives the image URL
//         if (req.file) {
//             productData.image = req.file.path;
//         }

//         console.log(productData);

//         const product = await Product.create(productData);

//         return res.status(201).json({
//             success: true,
//             product
//         });

//     } catch (error) {

//         console.error("ADD PRODUCT ERROR");
//         console.error(error);

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }; 

const addProduct = async (req, res) => {
    try {

        console.log("BODY =", req.body);
        console.log("FILE =", req.file);
        console.log("USER =", req.user);

        const productData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            seller: req.user.id
        };

        // We'll add image back later
        // if (req.file) {
        //     productData.image = req.file.path;
        // }

        console.log(productData);

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};  
// ===================== Get All Products =====================
const getProducts = async (req, res) => {
    try {
        console.log("➡️ getProducts started");

        const products = await Product.find()
    .populate("seller", "name phone address")
    .sort({ createdAt: -1 }); 

        console.log("✅ Product.find() completed");
        console.log(products);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.log("❌ getProducts Error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 

// ===================== Get Single Product =====================
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
.populate(
    "seller",
    "name email phone address"
); 

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
            error
        });

    }
};

// ===================== Update Product =====================
const updateProduct = async (req, res) => {

    try {
        console.log("===== UPDATE PRODUCT =====");
        console.log("req.user =", req.user);
        console.log("Product ID =", req.params.id); 
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });

        }
         
        // Find product
        const product = await Product.findById(req.params.id); 
        console.log("Product =", product); 

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });

        }
        console.log("req.user =", req.user); 
        // Check ownership 
        console.log("Seller =", product.seller.toString());
console.log("Logged in User =", req.user?.id); 
        if (product.seller.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this product."
            });

        }

        // Prepare update data
        const updateData = {

            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition

        };

        // Update image only if a new one is uploaded
        if (req.file) {

            updateData.image = req.file.path; 

        }

        const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,

            updateData,

            {

                new: true,

                runValidators: true

            }

        );

        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product: updatedProduct

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}; 
// ===================== Delete Product =====================
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });

        }

        // Only the owner can delete the product
        if (product.seller.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product."
            });

        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}; 
// ===================== My Products =====================

const getMyProducts = async (req, res) => {

    try {

        console.log("========== DEBUG ==========");
        console.log("Logged In User ID:", req.user.id);

        const products = await Product.find({
            seller: req.user.id
        });

        console.log("Products Found:", products.length);
        console.log(products);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}; 
module.exports = {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getMyProducts
}; 