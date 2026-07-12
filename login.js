const API="http://localhost:5000/api/auth/login";

const form=document.getElementById("loginForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const body={

email:document.getElementById("email").value,

password:document.getElementById("password").value

};

const res=await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(body)

});

const data=await res.json();

if(data.success){

localStorage.setItem("token",data.token);

localStorage.setItem("user",JSON.stringify(data.user));

Swal.fire({

    icon: "success",

    title: "Login Successful",

    text: "Welcome back!",

    timer: 1500,

    showConfirmButton: false

}).then(() => {

    window.location.href = "index.html";

}); 

window.location.href="index.html";

}

else{

alert(data.message);

}

}); 