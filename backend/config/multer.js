const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Upload path:", uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
                "-" +
                Math.round(Math.random() * 1e9) +
                path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"));
        }
    }
});

module.exports = upload; 