const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    condition: {
        type: String,
        enum: ["New", "Like New", "Good", "Fair"],
        default: "Good"
    },

    image: {
        type: String,
        default: ""
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        default: "Available"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema); 