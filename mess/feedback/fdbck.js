
// Initialize Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {setDoc,getFirestore, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"

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
// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var food_quality = getInputVal('food_quality');
  var cleanliness = getInputVal('cleanliness');
  var behaviour = getInputVal('behaviour');
  var message = getInputVal('message');

  // Check if message field is empty
  if (message.trim() === '') {
      alert('Please enter your feedback message.');
      return; // Stop form submission if message field is empty
  }

  // Save message
  console.log('Message:', message);
saveMessage(food_quality, cleanliness, behaviour, message);

  // saveMessage(food_quality, cleanliness, behaviour, message);
  alert("Response submitted");

  // Clear form
  document.getElementById('feedback').reset();
}


function getInputVal(id) {
  var element = document.getElementById(id);
  if (element) {
      return element.value;
  } else {
      console.error('Element with id ' + id + ' not found.');
      return ''; // Return empty string if element is not found
  }
}

const auth =getAuth(app);
// Save message to firebase
async function saveMessage(food_quality, cleanliness, behaviour, message) {
    try {
        // Reference the document using the user's email as the document ID
        onAuthStateChanged(auth,async(user)=>{
        const feedbackRef = doc(db, 'feedback', user.email);
        await setDoc(feedbackRef, {
            food_quality: food_quality,
            cleanliness: cleanliness,
            behaviour: behaviour,
            message: message
        });
        console.log('Feedback saved successfully.');
        alert('Feedback submitted successfully.');
        })
    } catch (error) {
        console.error('Error saving feedback:', error);
        alert('Error saving feedback. Please try again.');
    }
}


// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars1 = document.querySelectorAll(".stars1 i");
const stars2 = document.querySelectorAll(".stars2 i");
const stars3 = document.querySelectorAll(".stars3 i");

// Function to update the hidden input field with the selected rating value
function updateRating(inputId, rating) {
  document.getElementById(inputId).value = rating;
}

// Loop through the "stars" NodeList for food quality rating
stars1.forEach((star1, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star1.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars1.forEach((star1, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? star1.classList.add("active") : star1.classList.remove("active");
    });
    // Update the hidden input field value with the selected rating value
    updateRating('food_quality', index1 + 1);
  });
});

// Loop through the "stars" NodeList for cleanliness rating
stars2.forEach((star2, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star2.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars2.forEach((star2, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? star2.classList.add("active") : star2.classList.remove("active");
    });
    // Update the hidden input field value with the selected rating value
    updateRating('cleanliness', index1 + 1);
  });
});

// Loop through the "stars" NodeList for staff behaviour rating
stars3.forEach((star3, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star3.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars3.forEach((star3, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? star3.classList.add("active") : star3.classList.remove("active");
    });
    // Update the hidden input field value with the selected rating value
    updateRating('behaviour', index1 + 1);
  });
});

  