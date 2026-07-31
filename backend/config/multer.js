const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

console.log("Cloudinary object:", cloudinary);
console.log("Cloudinary uploader:", cloudinary.uploader);

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CampusKart",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
    },
});

const upload = multer({ storage });

module.exports = upload; 