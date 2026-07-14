
// ==============================
// CampusKart - script.js
// ==============================

// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Product Card Hover Effect
document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".product-card")) {
        e.target.closest(".product-card").style.transform = "translateY(-10px)";
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".product-card")) {
        e.target.closest(".product-card").style.transform = "translateY(0)";
    }
});

// Back To Top Button
const topBtn = document.createElement("button");
topBtn.innerHTML = "⬆";
topBtn.id = "topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    display: "none",
    zIndex: "999"
});

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Welcome
window.addEventListener("load", () => {
    console.log("🎉 Welcome to CampusKart!");
});



// ==============================
// Live Product Search
// ==============================
const searchInput = document.getElementById("searchInput"); 

function searchProducts() {

    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === "") {
        displayProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(product => {

        return (
            product.title.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword)
        );

    });

    displayProducts(filtered);

}

if (searchInput) {

    searchInput.addEventListener("input", searchProducts);

}  
// ==============================
// Load Products
// ==============================

const API_URL = "https://campuskart-091f.onrender.com/api/products";

let allProducts = [];

async function loadProducts() {

    const loader = document.getElementById("loader");

    try {

        loader.style.display = "block";

        const res = await fetch(API_URL);

        const data = await res.json();

        allProducts = data.products || [];

        displayProducts(allProducts);

    } catch (err) {

        console.error(err);

    } finally {

        loader.style.display = "none";

    }

} 


// ==============================
// Display Products
// ==============================

function displayProducts(products){

    const productGrid = document.getElementById("product-grid");

    if(!productGrid) return;

    productGrid.innerHTML = "";
     
 
    if(products.length===0){

    productGrid.innerHTML=`

        <div class="no-products">

            <i class="fa-solid fa-box-open"
               style="font-size:70px;color:#2563eb;"></i>

            <h2>No Products Available</h2>

            <p>

                Be the first student to sell something on CampusKart.

            </p>

            <a href="sell.html" class="explore-btn">

                Sell Your First Product

            </a>

        </div>

    `;

    return;

} 

    products.forEach(product=>{

        productGrid.innerHTML += `

        <div class="product-card fade-in">

            <img src="${
                product.image
                ? `https://campuskart-091f.onrender.com/uploads/${product.image}`
                : "https://picsum.photos/300/200"
            }"

            alt="${product.title}">

            <div style="padding:20px;">

                <h3>${product.title}</h3>

                <p class="price">

                    ₹${product.price}

                </p>

                <div class="product-tags">

    <span class="category-tag">
        ${product.category}
    </span>

    <span class="condition-tag">
        ${product.condition}
    </span>

</div> 

                <button

                class="view-btn"

                onclick="location.href='product.html?id=${product._id}'">

                View Details

                </button>

            </div>

        </div>

        `;

    });

}

loadProducts(); 
// ==============================
// Category Filter
// ==============================

const categoryCards = document.querySelectorAll(".category-grid .card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        const filteredProducts = allProducts.filter(product => {

            return (
                product.category &&
                product.category.toLowerCase() === category.toLowerCase()
            );

        });

        displayProducts(filteredProducts);

        // Scroll to products
        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    });

}); 
// ==============================
// Show All Products
// ==============================

const showAllBtn = document.getElementById("showAllBtn");

if (showAllBtn) {

    showAllBtn.addEventListener("click", () => {

        displayProducts(allProducts);

    });

} 
const sortProducts = document.getElementById("sortProducts");

if (sortProducts) {

    sortProducts.addEventListener("change", () => {

        let sorted = [...allProducts];

        switch (sortProducts.value) {

            case "low":

                sorted.sort((a, b) => a.price - b.price);

                break;

            case "high":

                sorted.sort((a, b) => b.price - a.price);

                break;

            case "az":

                sorted.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );

                break;

            default:

                sorted.reverse();

        }

        displayProducts(sorted);

    });

} 
