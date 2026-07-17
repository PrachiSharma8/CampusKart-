const cors = require("cors"); 
const productRoutes=require("./routes/productRoutes");
const express = require("express");
const dotenv = require("dotenv"); 
const path = require("path");
dotenv.config(); 
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");

console.log("Auth routes loaded:", authRoutes);
console.log(authRoutes); 



// Connect MongoDB
connectDB();

const app = express(); 
app.use(cors()); 

// Middleware
app.use(express.json()); 


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}); 
app.use("/api/auth", authRoutes);

app.use("/api/products",productRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to CampusKart Backend!");
});

const PORT = process.env.PORT || 5000; 

app.use((err, req, res, next) => {
    console.error("========= GLOBAL ERROR =========");
    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
}); 
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 
