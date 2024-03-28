// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

// Reference to the feedback collection
const feedbackCollection = collection(db, 'feedback');

// Fetch feedback data
const feedbackList = document.getElementById('feedbackList');

function renderFeedback(doc) {
  const feedbackItem = document.createElement('div');
  feedbackItem.classList.add('feedback-item');
  const foodQuality = doc.data().food_quality;
  const cleanliness = doc.data().cleanliness;
  const behaviour = doc.data().behaviour;
  const message = doc.data().message;

  feedbackItem.innerHTML = `
    <h2>Student Feedback</h2>
    <div class="ratings">
      <span>Food Quality: ${foodQuality} stars</span><br>
      <span>Cleanliness: ${cleanliness} stars</span><br>
      <span>Staff Behaviour: ${behaviour} stars</span>
    </div>
    <p class="message">${message}</p>
  `;

  feedbackList.appendChild(feedbackItem);
}

// Fetch feedback documents from Firestore
async function getFeedback() {
  const querySnapshot = await getDocs(feedbackCollection);
  querySnapshot.forEach((doc) => {
    renderFeedback(doc);
  });
}

// Reference to the button
const clearFeedbacksBtn = document.getElementById('clearFeedbacksBtn');

// Add event listener to the button
clearFeedbacksBtn.addEventListener('click', clearAllFeedbacks);

// Function to clear all feedbacks
async function clearAllFeedbacks() {
    try {
        // Query all feedback documents
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        
        // Iterate over each feedback document and delete it
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        // Show success message
        alert('All feedbacks have been cleared successfully.');
    } catch (error) {
        console.error('Error clearing feedbacks:', error);
        alert('Error clearing feedbacks. Please try again.');
    }
}


getFeedback();
