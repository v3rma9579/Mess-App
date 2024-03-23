// import  totalMessBill  from "../mess_bill/bill.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getDoc, getFirestore, doc,} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
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

const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth,async(user)=>{
    if(user){
        console.log (user.uid);
        const docref = await getDoc(doc(db,'user',user.email));
        const name = docref.data().name;
        document.getElementById('name1').textContent = `Welcome ${name}`
        document.getElementById('gmail1').textContent = `${user.email}`
    }
    else{
        window.location.replace('../login_page/login.html')
    }
})



// document.getElementById('abcd').innerHTML = totalMessBill
console.log("aayush gan")
// document.getElementById('name1').textContent =`Welcome, ${currentuser.email}`
