import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Function to render menu table
async function renderMenu() {
    const menuTable = document.getElementById('menuTable').getElementsByTagName('tbody')[0];
   // menuTable.innerHTML = ''; // Clear the table before adding new data
    
    try {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Loop through each day of the week
        for (let i = 0; i < daysOfWeek.length; i++) {
            const currentDay = daysOfWeek[i];
            
            // Retrieve menu data for the current day
            const menuDoc = doc(firestore, 'menu', currentDay);
            const menuSnap = await getDoc(menuDoc);
            
            if (menuSnap.exists()) {
                const data = menuSnap.data();
                const row = `<tr>
                                <td>${currentDay}</td>
                                <td><input type="text" id="breakfast-${currentDay}" value="${data.breakfast || ''}"></td>
                                <td><input type="text" id="lunch-${currentDay}" value="${data.lunch || ''}"></td>
                                <td><input type="text" id="snack-${currentDay}" value="${data.snack || ''}"></td>
                                <td><input type="text" id="dinner-${currentDay}" value="${data.dinner || ''}"></td>
                                <td><button onclick="updateMenu('${currentDay}')">Update</button></td>
                            </tr>`;
                menuTable.innerHTML += row;
            } else {
                console.log(`No menu found for ${currentDay}`);
            }
        }
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Function to handle menu update
window.updateMenu = async function(day) {
    try {
        const breakfastInput = document.getElementById(`breakfast-${day}`);
        const lunchInput = document.getElementById(`lunch-${day}`);
        const snackInput = document.getElementById(`snack-${day}`);
        const dinnerInput = document.getElementById(`dinner-${day}`);

        const menuData = {
            breakfast: breakfastInput.value,
            lunch: lunchInput.value,
            snack: snackInput.value,
            dinner: dinnerInput.value
        };

        await setDoc(doc(firestore, 'menu', day), menuData);
        console.log(`Menu updated successfully for ${day}`);
    } catch (error) {
        console.error(`Error updating menu for ${day}:`, error);
    }
}

// function to initialize the menu table
renderMenu();
