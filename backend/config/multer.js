const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CampusKart",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
    },
});

const upload = multer({ storage });

module.exports = upload; 
console.log("Uploading image to Cloudinary..."); 