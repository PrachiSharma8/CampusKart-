const API = "https://campuskart-091f.onrender.com/api/auth/register";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const body = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value

    };

    const res = await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(body)

    });

    const data = await res.json();

    if(data.success){

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

       Swal.fire({

    icon: "success",

    title: "Registration Successful",

    text: "Your account has been created.",

    timer: 1800,

    showConfirmButton: false

}).then(() => {

    window.location.href = "login.html";

}); 

        window.location.href = "index.html";

    }

    else{

        alert(data.message);

    }

}); 