
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
document.getElementById('feedback').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var food_quality = getInputVal('food_quality');
  var cleanliness = getInputVal('cleanliness');
  var behaviour = getInputVal('behaviour');
  var message = getInputVal('message');

  // Save message
  saveMessage(food_quality,cleanliness,behaviour,message);
    alert("Response submitted");
//   // Show alert
//   document.querySelector('.alert').style.display = 'block';

//   // Hide alert after 3 seconds
//   setTimeout(function(){
//     document.querySelector('.alert').style.display = 'none';
//   },3000);

  // Clear form
  document.getElementById('feedback').reset();
}

function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
async function  saveMessage(food_quality,cleanliness,behaviour,message){
  await setDoc(doc(db, "feedback"), {
    'food_quality': food_quality,
    'cleanliness':cleanliness,
    'behaviour':behaviour,
    'message':message
  });
}


// Select all elements with the "i" tag and store them in a NodeList called "stars"
 const stars1 = document.querySelectorAll(".stars1 i");
 const stars2 = document.querySelectorAll(".stars2 i");
 const stars3 = document.querySelectorAll(".stars3 i");

 // Loop through the "stars" NodeList
 stars1.forEach((star1, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star1.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars1.forEach((star1, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star1.classList.add("active") : star1.classList.remove("active");
     });
   });
 });
 // Loop through the "stars" NodeList
 stars2.forEach((star2, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star2.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars2.forEach((star2, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star2.classList.add("active") : star2.classList.remove("active");
     });
   });
 });
 // Loop through the "stars" NodeList
 stars3.forEach((star3, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star3.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars3.forEach((star3, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star3.classList.add("active") : star3.classList.remove("active");
     });
   });
 });