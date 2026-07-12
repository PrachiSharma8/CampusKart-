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
const API_URL = "http://localhost:5000/api/products/add";

const form = document.getElementById("sellForm"); 
console.log("FORM =", form);   
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (file) {

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    }

}); 
console.log("Reached before addEventListener"); 

form.addEventListener("submit", async (e) => { 
     console.log("SUBMIT EVENT WORKING"); 
     

    e.preventDefault();

    const formData = new FormData(form);

    // Automatically send logged-in user's ID
    

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
    title: "Success!",
    text: "Product Added Successfully"
}).then(() => {

    window.location.href = "my-listings.html";

}); 

            form.reset();

           
        } else {

           Swal.fire({
    icon: "error",
    title: "Error",
    text: data.message
}); 

        }

    } catch (error) {

        console.error(error);

       Swal.fire({
    icon: "error",
    title: "Server Error",
    text: "Something went wrong!"
}); 

    }

}); 