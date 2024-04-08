import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    console.log("Logout button clicked"); // Check if the click event is triggered
    
    // Get the Firebase Auth instance
    const auth = getAuth();
    
    console.log("Auth object:", auth); // Check if the Auth object is properly obtained
    
    // Sign out the user
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User signed out successfully');
        // Redirect user to login page
        window.location.href = "/Mess-App/index.html";
    }).catch((error) => {
        // An error happened.
        console.error('Error signing out: ', error);
    });
});

// Function to fetch student data from Firestore and populate the table

async function fetchStudents() {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Clear existing table rows
      let index = 1; // Initialize index
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        const row = `
          <tr>
            <th scope="row">${index}</th>
            <td>${studentData.name}</td>
            <td>${studentData.email}</td>
          </tr>
        `;
        tbody.innerHTML += row;
        index++; // Increment index
      });
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  }
  
  

// Call fetchStudents function to populate the table when the page loads
window.onload = fetchStudents;

// Sidebar toggle functionality
const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click", function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

// Theme toggle functionality
document.querySelector(".theme-toggle").addEventListener("click", () => {
    toggleLocalStorage();
    toggleRootClass();
});

function toggleRootClass(){
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', inverted);
}

function toggleLocalStorage(){
    if(isLight()){
        localStorage.removeItem("light");
    } else {
        localStorage.setItem("light", "set");
    }
}

function isLight(){
    return localStorage.getItem("light");
}

if(isLight()){
    toggleRootClass();
}

