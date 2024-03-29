// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getDoc, getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let currentuser;
const auth = getAuth(app);

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true;
    }
    else {
        return false;
    }
}

function validate_password(password) {
    if (password.length < 6) {
        return false;
    }
    else {
        return true;
    }
}

document.getElementById("login-btn").addEventListener('click', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false && validate_password(password) == false) {
        // alert('Email and Password is wrong');
        document.getElementById("erroremail").innerHTML = "Please Enter Email";
        document.getElementById("errorpass").innerHTML = "Please Enter password";
    }
    else if (validate_email(email) == false) {
        // alert('Email is wrong');
        document.getElementById("erroremail").innerHTML = "Email is Incorrect";
    }
    else if (validate_password(password) == false) {
        // alert('Password is wrong');
        document.getElementById("errorpass").innerHTML = "Pass is Incorrect";
    }

    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        signInWithEmailAndPassword(auth, email, password).then(function (data) {
             currentuser = data.currentUser
             if(data.user.email == 'admin@gmail.com'){
                window.location.replace("../admin1/index.html");
             }
             else{
                 alert(data.user.email + ' Logged In successfully')
                 window.location.replace ("../Student_dashboard/index.html");
             }
        })
            .catch(function (error) {
                var error_code = error.code;
                var error_message = error.message;

                alert("Wrong Password")
            })
    }
    else {
        alert("User does not exist")
    }



})

export {auth};
// })
// export {app,db,auth,currentuser}
