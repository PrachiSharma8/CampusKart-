const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
} 

const API = "http://localhost:5000/api/products";



const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("editForm");

// ================= Load Product =================

async function loadProduct() {

    try {

        const res = await fetch(`${API}/${id}`);

        const data = await res.json();

        if (!data.success) {

            alert("Product Not Found");

            return;

        }

        const product = data.product;

        document.getElementById("title").value =
            product.title;

        document.getElementById("description").value =
            product.description;

        document.getElementById("price").value =
            product.price;

        document.getElementById("category").value =
            product.category;

        document.getElementById("condition").value =
            product.condition;

        document.getElementById("preview").src =
            product.image
            ? `http://localhost:5000/uploads/${product.image}`
            : "https://picsum.photos/300/200";

    }

    catch (error) {

        console.log(error);

    }

}

loadProduct();

// ================= Image Preview =================

document.getElementById("image").addEventListener("change", function () {

    if (this.files[0]) {

        document.getElementById("preview").src =
            URL.createObjectURL(this.files[0]);

    }

});

// ================= Update Product =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "description",
        document.getElementById("description").value
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "category",
        document.getElementById("category").value
    );

    formData.append(
        "condition",
        document.getElementById("condition").value
    );

    const image = document.getElementById("image").files[0];

    if (image) {

        formData.append("image", image);

    }

    try {

        const res = await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`

            },

            body: formData

        });

        const data = await res.json();

        if (data.success) {

          Swal.fire({

    icon:"success",

    title:"Product Updated",

    text:"Changes saved successfully.",

    timer:1500,

    showConfirmButton:false

}).then(()=>{

    window.location.href="my-listings.html";

});   

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

    }

}); 
