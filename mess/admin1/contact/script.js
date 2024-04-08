// Initialize Firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

// Function to fetch and display complaints
async function fetchComplaints() {
  const complaintsList = document.getElementById('complaintList');
  complaintsList.innerHTML = ''; // Clear existing complaints

  // Fetch complaints from Firestore
  const complaintsRef = collection(db, 'contact');
  const complaintsSnapshot = await getDocs(complaintsRef);

  complaintsSnapshot.forEach((doc) => {
    const complaint = doc.data();
    const complaintCard = `
      <div class="complaint-card">
        <h2>Name: ${complaint.name}</h2>
        <p>Hostel: ${complaint.hostel}</p>
        <p>Email: ${complaint.email}</p>
        <p>Phone: ${complaint.phone}</p>
        <p>Message: ${complaint.message}</p>
        <p class="timestamp">Timestamp: ${doc.id}</p>
        <button class="delete-btn" data-id="${doc.id}">Delete</button>
      </div>
    `;
    complaintsList.insertAdjacentHTML('beforeend', complaintCard);
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const complaintId = button.getAttribute('data-id');
      await deleteComplaint(complaintId);
      fetchComplaints(); // Refresh complaints list after deletion
    });
  });
}

// Function to delete a single complaint
async function deleteComplaint(complaintId) {
  await deleteDoc(doc(db, 'contact', complaintId));
}

// Event listener for clear all complaints button
document.getElementById('clearAllComplaintsBtn').addEventListener('click', clearAllComplaints);

// Function to clear all complaints
async function clearAllComplaints() {
  const confirmDelete = confirm('Are you sure you want to delete all complaints? This action cannot be undone.');
  if (confirmDelete) {
    const complaintsRef = collection(db, 'contact');
    const complaintsSnapshot = await getDocs(complaintsRef);
    complaintsSnapshot.forEach(async (doc) => {
      await deleteComplaint(doc.id);
    });
    fetchComplaints(); // Refresh complaints list after clearing
  }
}

// Fetch and display complaints when the page loads
window.onload = fetchComplaints;
