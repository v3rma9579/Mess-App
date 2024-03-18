
// Initialize Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {setDoc,getFirestore, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
var firebaseConfig = {
  apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
  authDomain: "mess-maintainance.firebaseapp.com",
  projectId: "mess-maintainance",
  storageBucket: "mess-maintainance.appspot.com",
  messagingSenderId: "823193074711",
  appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Listen for form submit
document.getElementById('complaint').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name,email,message);
    alert("Response submitted");
//   // Show alert
//   document.querySelector('.alert').style.display = 'block';

//   // Hide alert after 3 seconds
//   setTimeout(function(){
//     document.querySelector('.alert').style.display = 'none';
//   },3000);

  // Clear form
  document.getElementById('complaint').reset();
}

function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
async function  saveMessage(name, email, message){
  await setDoc(doc(db, "complaint", email), {
    'name': name,
    'email':email,
    'message':message
  });
}