// Initialize Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

const complaintsList = document.getElementById('complaints-list');

// Fetch complaints from Firebase Firestore
async function fetchComplaints() {
  const querySnapshot = await getDocs(collection(db, 'complaint'));
  complaintsList.innerHTML = ''; // Clear existing list
  querySnapshot.forEach((doc) => {
    const complaint = doc.data();
    const complaintItem = `
      <div class="complaint-item">
        <div class="complaint-details">
          <h3>Name: ${complaint.name}</h3>
          <p>Email: ${complaint.email}</p>
        </div>
        <p>Message: ${complaint.message}</p>
      </div>
    `;
    complaintsList.innerHTML += complaintItem;
  });
}

// Fetch complaints when the page loads
window.onload = fetchComplaints;
