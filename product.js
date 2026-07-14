            
            
const API = "https://campuskart-091f.onrender.com/api/products";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadProduct() {

    const res = await fetch(`${API}/${id}`);

    const data = await res.json();

    const product = data.product;

    document.getElementById("title").innerText =
        product.title;

    document.getElementById("price").innerText =
        "₹" + product.price;

    document.getElementById("description").innerText =
        product.description;

    document.getElementById("category").innerText =
        product.category;

    document.getElementById("condition").innerText =
        product.condition;

    document.getElementById("productImage").src =
        product.image
        ? `https://campuskart-091f.onrender.com/uploads/${product.image}`
        : "https://picsum.photos/500";

    document.getElementById("sellerName").innerText =
        product.seller.name;

    document.getElementById("sellerPhone").innerText =
        product.seller.phone;

    document.getElementById("sellerAddress").innerText =
        product.seller.address;

    document.getElementById("whatsappBtn").onclick = () => {

        const message =
        `Hi ${product.seller.name}, I am interested in your product "${product.title}".`;

        window.open(

            `https://wa.me/91${product.seller.phone}?text=${encodeURIComponent(message)}`,

            "_blank"

        );

    };

}

loadProduct(); 