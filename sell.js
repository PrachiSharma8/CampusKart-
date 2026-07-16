const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first."
    }).then(() => {
        window.location.href = "login.html";
    });

    throw new Error("User not logged in");
}

const API_URL = "https://campuskart-091f.onrender.com/api/products/add";

const form = document.getElementById("sellForm");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// Image Preview
imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }

});

// Submit Form
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("category", form.category.value);
    formData.append("condition", form.condition.value);

    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    console.log("========= FORM DATA =========");

    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: formData

        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Added Successfully"
            }).then(() => {

                window.location.href = "my-listings.html";

            });

        } else {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message
            });

        }

    } catch (err) {

        console.error(err);

        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Unable to connect to server."
        });

    }

}); 