import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDoc, getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import getTotalMessBill from "../mess_bill/bill.js";

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



const totalMessBill = await getTotalMessBill();
document.getElementById('abcd').textContent = (Math.round(totalMessBill * 100) / 100).toFixed(2)

async function fetch_Notice() {
    var mess_Notice = await getDoc(doc(db, 'notice', 'notice-1'))

    if(mess_Notice.exists()) {
        var notice = document.getElementById('mess-notice')

        notice.textContent = mess_Notice.data().n1
    }
}

fetch_Notice()
