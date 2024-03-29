import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDoc,getDocs, getFirestore, doc, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
// import {fetch_data} from "../mess_bill/bill.js";
// import  totalMessBill  from "../mess_bill/bill.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
// import { getDoc, getFirestore, doc,} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);



// const totalMessBill = await fetch_data();
// document.getElementById('abcd').textContent = totalMessBill;

async function fetch_Notice() {
    var mess_Notice = await getDoc(doc(db, 'notices', 'notice-1'))

    if(mess_Notice.exists()) {
        var notice = document.getElementById('mess-notice')

        notice.textContent = mess_Notice.data().n1
    }
}

fetch_Notice()
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
let email ; 
    onAuthStateChanged(auth, async (user) => {
        if (user) {
        email =user.email;
        console.log(user.uid);
        const docRef = await getDoc(doc(db, 'user', user.email));
        if (docRef.exists()) {
            const userData = docRef.data();
            const name = userData.name; // Assuming 'name' is a field in your user document
            document.getElementById('name1').textContent = `Welcome ${name}`;
            document.getElementById('gmail1').textContent = `${user.email}`;
            // Assuming 'profilePicUrl' is the URL of the profile picture
            const profilePicUrl = userData.profilePicUrl;
            if (profilePicUrl) {
                document.getElementById("profile-img").src = profilePicUrl;
            }

        }
    } else {
        window.location.replace('../login_page/login.html');
    }
});




// document.getElementById('abcd').innerHTML = totalMessBill
// console.log("aayush gan")
// document.getElementById('name1').textContent =`Welcome, ${currentuser.email}`
var totalamount=0;
async function fetch_data() {
    // const user=auth.currentUser;
    var docRef = await getDocs(collection(db, 'monthlybill'))
    await docRef.forEach(async (udoc)=>{
        const userRef = await getDoc(doc(db,'monthlybill',udoc.id,'extra',email));
        const useramount = userRef.data().amount;
        totalamount+=Number(useramount)+Number(udoc.data().amount);        
        // document.getElementById('tbody').appendChild(tr);
        console.log(totalamount);
        document.getElementById('abcd').textContent=totalamount;
        
    })
}
fetch_data();