// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Initialize Firebase app
var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};

const app = initializeApp(firebaseConfig);

// Get references to Firebase Authentication, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to fetch and display user details
const fetchUserDetails = () => {
    // Check if user is authenticated
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Fetch user document from Firestore using user email
                const userDoc = doc(db, "user", user.email);
                const docSnapshot = await getDoc(userDoc);

                if (docSnapshot.exists()) {
                    // Update UI with user details
                    const userData = docSnapshot.data();
                    document.getElementById("firstname").value = userData.firstname;
                    document.getElementById("lastname").value = userData.lastname;
                    document.getElementById("email").value = userData.email;
                    document.getElementById("phone").value = userData.phone;
                    // Update profile picture
                    document.getElementById("profile-pic").src = userData.profilePicUrl;
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
    });
};

// Function to update profile picture
const updateProfilePicture = async (file) => {
    // Check if user is authenticated
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Upload profile picture to Firebase Storage
                const storageRef = ref(storage, `profile_pictures/${user.email}`);
                const snapshot = await uploadBytes(storageRef, file);

                // Get download URL of uploaded image
                const downloadUrl = await getDownloadURL(snapshot.ref);

                // Update profile picture URL in Firestore
                const userDoc = doc(db, "user", user.email);
                await updateDoc(userDoc, { profilePicUrl: downloadUrl });

                // Display success message to user
                alert("Profile picture updated successfully!");
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        }
    });
};

// Function to update user details (first name and last name)
const updateProfileDetails = async (firstName, lastName) => {
    // Check if user is authenticated
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Update user document in Firestore
                const userDoc = doc(db, "user", user.email);
                await updateDoc(userDoc, { 
                    firstname: firstName,
                    lastname: lastName
                });

                // Display success message to user
                alert("Profile details updated successfully!");
            } catch (error) {
                console.error("Error updating profile details:", error);
            }
        }
    });
};

// Event listener for Save Changes button
document.getElementById("saveChangesBtn").addEventListener("click", () => {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    updateProfileDetails(firstName, lastName);
});


// Get reference to the input file and profile picture elements
const inputFile = document.getElementById("input-file");

// Event listener for file input change
inputFile.onchange = () => {
    const file = inputFile.files[0];
    updateProfilePicture(file);
};

// Call fetchUserDetails function to display user details on page load
fetchUserDetails();
