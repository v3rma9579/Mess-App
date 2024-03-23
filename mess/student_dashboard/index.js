// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
// import { getDoc, getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};

var app=initializeApp(firebaseConfig)
var auth= getAuth(app);
document.addEventListener('load',()=>{
    onAuthStateChanged(auth).then((user)=>{
        if(user){
            window.load("../Student_dashboard/index.html")
        }
        else{
            window.replace("../login_page/login.html'")
        }
    })
})