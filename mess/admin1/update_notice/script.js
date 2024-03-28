import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Initialize Firebase
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

// Function to update notice in Firestore
async function updateNotice(title, content) {
    try {
      const noticeRef = doc(db, 'notice', 'notice-1'); // Use correct collection name 'notices'
      await setDoc(noticeRef, {
        // title: title,
        n1: content // Include content in the document data
      });
      console.log('Notice updated successfully.');
      alert('Notice updated successfully.');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Error updating notice. Please try again.');
    }
  }
  


// Event listener for update notice button
document.getElementById('updateNoticeBtn').addEventListener('click', () => {
  const title = document.getElementById('noticeTitle').value;
  const content = document.getElementById('noticeContent').value;
  updateNotice(title, content);
});
