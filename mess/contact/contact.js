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
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var hostel = getInputVal('hostel');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, hostel, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
async function  saveMessage(name, hostel, email, phone, message){
  await setDoc(doc(db, "contact", email), {
    'name': name,
    'hostel':hostel,
    'email':email,
    'phone':phone,
    'message':message
  });
}


//Addition of validation
function validateForm() {
  var name = document.getElementById("name").value.trim();
  
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var nameError = document.getElementById("nameError");
 
  var emailError = document.getElementById("emailError");
  var phoneError = document.getElementById("phoneError");


  var isValid = true;

  // Validate name
  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  } else {
    nameError.textContent = "";
  }
 

  // Validate email
  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else {
    emailError.textContent = "";
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Invalid email format";
      isValid = false;
    }
  }

  // Validate phone number
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', () => {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(\+\d{1,3})? ?(\d{10})$/;
  
    if (phoneRegex.test(phoneValue)) {
      phoneInput.classList.remove('invalid');
      phoneInput.classList.add('valid');
    } else {
      phoneInput.classList.remove('valid');
      phoneInput.classList.add('invalid');
    }
  });

  return isValid;
}





