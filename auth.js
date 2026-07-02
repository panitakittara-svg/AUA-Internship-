import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ================= LOGIN =================

const loginBtn=document.getElementById("loginBtn");

if(loginBtn){

loginBtn.onclick=async()=>{

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const message=document.getElementById("message");

if(email===""||password===""){

message.innerHTML="Please fill in all fields.";

return;

}

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

window.location.href="dashboard.html";

}

catch(error){

message.innerHTML=error.message;

}

};

}

// ================= LOGOUT =================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick=async()=>{

await signOut(auth);

window.location.href="login.html";

};

}

// ================= CHECK LOGIN =================

onAuthStateChanged(auth,(user)=>{

const page=window.location.pathname.split("/").pop();

if(page==="dashboard.html"&&!user){

window.location.href="login.html";

}

});