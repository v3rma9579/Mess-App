  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import {getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
  import {getDoc,getFirestore, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
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


  const auth = getAuth(app);

  function validate_email(email){
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        return true;
    }
    else{
        return false;
    }
  }

  function validate_password(password){
    if(password.length < 6){
        return false;
    }
    else {
        return true;
    }
  }

  document.getElementById("login-btn").addEventListener('click', async (e)=>{
    e.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(validate_email(email)==false && validate_password(password)==falee){
        alert('Email and Password is wrong');
    }
    else if(validate_email(email)==false){
        alert('Email is wrong');
    }
    else if(validate_password(password)==false){
        alert('Password is wrong');
    }

    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        signInWithEmailAndPassword(auth,email,password).then(function(data){
            var user =data.currentUser
    
            alert(data.user.email+'Logged In successfully')
            window.location.href = "../Student_dashboard/dashboard.html";
        })
        .catch(function(error){
            var error_code = error.code;
            var error_message = error.message;
    
            alert("Wrong Password")
        })
    }
    else{
        alert("User does not exist")
    }


    
  })