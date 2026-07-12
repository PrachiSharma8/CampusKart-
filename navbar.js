const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const guestMenu = document.getElementById("guestMenu");
const userMenu = document.getElementById("userMenu");

const userBtn = document.getElementById("userBtn");
const userName = document.getElementById("userName");

const dropdown = document.getElementById("dropdown");

const logoutBtn = document.getElementById("logoutBtn");

// =========================
// Logged In
// =========================

if(token && user){

    guestMenu.style.display="none";

    userMenu.style.display="block";

    userName.innerText=user.name;

}

// =========================
// Dropdown
// =========================

if(userBtn){

    userBtn.addEventListener("click",()=>{

        dropdown.classList.toggle("show");

    });

}

// =========================
// Close Dropdown
// =========================

window.addEventListener("click",(e)=>{

    if(!e.target.closest(".user-menu")){

        dropdown.classList.remove("show");

    }

});

// =========================
// Logout
// =========================

if(logoutBtn){

logoutBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    Swal.fire({

        icon:"success",

        title:"Logged Out",

        text:"You have been logged out successfully."

    }).then(()=>{

        window.location.href="login.html";

    });

});

} 