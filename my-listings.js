const authToken = localStorage.getItem("token");

if (!authToken) {
    alert("Please login first.");
    window.location.href = "login.html";
}



const grid = document.getElementById("myProducts");

async function loadMyProducts() {

    try {

        const res = await fetch(
            "https://campuskart-091f.onrender.com/api/products/my-products",
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        const data = await res.json(); 
        document.getElementById("totalProducts").innerText =
    data.products.length;

let total = 0;

data.products.forEach(product => {

    total += Number(product.price);

});

document.getElementById("totalValue").innerText =
    "₹" + total; 
        console.log("Response:", data);
console.log("Token:", authToken); 

        if (!data.success) {
            alert(data.message);
            return;
        }

        if (data.products.length === 0) {

        grid.innerHTML = `
<div class="empty-state">

    <i class="fa-solid fa-box-open"></i>

    <h2>No Products Yet</h2>

    <p>Start selling your first item on CampusKart.</p>

    <a href="sell.html" class="sell-btn">
        Sell Your First Product
    </a>

</div>
`; 

            return; 
        }

        grid.innerHTML = "";

        data.products.forEach(product => {

            grid.innerHTML += `

                <div class="product-card">

                    <img
                        src="${
                            product.image
                                ? `https://campuskart-091f.onrender.com/uploads/${product.image}`
                                : "https://picsum.photos/300/200"
                        }"
                        alt="${product.title}"
                    >

                    <h3>${product.title}</h3>

                    <p class="price">₹${product.price}</p>

                    <div class="card-buttons">

                        <a href="product.html?id=${product._id}">
                            <button>
                                View Details
                            </button>
                        </a>

                        <a href="edit-product.html?id=${product._id}">
                            <button class="edit-btn">
                                Edit
                            </button>
                        </a>

                        <button
                            class="delete-btn"
                            onclick="deleteProduct('${product._id}')">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({
 
    icon:"error",

    title:"Oops...",

    text:"Failed to load products."

});

    }

}

// ================= Delete Product =================

async function deleteProduct(id) {

    const result = await Swal.fire({

        title: "Delete Product?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#2563eb",

        cancelButtonColor: "#d33",

        confirmButtonText: "Yes, Delete"

    });

    if (!result.isConfirmed) return;

    try {

        const res = await fetch(
            `https://campuskart-091f.onrender.com/api/products/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();

        if (data.success) {

            await Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "Product deleted successfully."

            });

            loadMyProducts();

        } else {

            Swal.fire("Error", data.message, "error");

        }

    } catch (error) {

        Swal.fire("Error", "Something went wrong!", "error");

    }

} 

loadMyProducts(); 
            

        