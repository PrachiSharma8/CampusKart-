const token = localStorage.getItem("token");

if (!token) {

    Swal.fire({

        icon: "warning",
        title: "Login Required",
        text: "Please login to continue."

    }).then(() => {

        window.location.href = "login.html";

    });

} 