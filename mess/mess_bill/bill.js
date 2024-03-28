import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDoc, getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"


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

var totalMessBill = 0;

export async function fetch_data() {
    var docRef = await getDoc(doc(db, 'bill', 'shubham123@gmail.com'))

    if (docRef.exists()) {
        console.log(docRef.data())
        var jan = document.getElementById('jan-bill')
        var feb = document.getElementById('feb-bill')
        var mar = document.getElementById('mar-bill')
        var apr = document.getElementById('apr-bill')
        var may = document.getElementById('may-bill')


        var total = document.getElementById('total')
        // addEventListener(onload, fetch_data)
        // var y = fetch_data()
        jan.textContent = docRef.data().jan24
        feb.textContent = docRef.data().feb24
        mar.textContent = docRef.data().mar24
        apr.textContent = docRef.data().apr24
        may.textContent = docRef.data().may24

        console.log(docRef.data().jan24)


        var a = parseFloat(document.getElementById('jan-bill').textContent)
        var b = parseFloat(document.getElementById('feb-bill').textContent)
        var c = parseFloat(document.getElementById('mar-bill').textContent)
        var d = parseFloat(document.getElementById('apr-bill').textContent)
        var e = parseFloat(document.getElementById('may-bill').textContent)

        var t = (a + b + c + d + e)

        total.textContent = t
    }
}

fetch_data()

    
async function getTotalMessBill() {
    var docRef = await getDoc(doc(db, 'bill', 'shubham123@gmail.com'))
    const janBill = docRef.data().jan24;
    const febBill = docRef.data().feb24;
    const marBill = docRef.data().mar24;
    const aprBill = docRef.data().apr24;
    const mayBill = docRef.data().may24;
    totalMessBill = parseFloat(janBill) + parseFloat(febBill) + parseFloat(marBill) + parseFloat(aprBill) + parseFloat(mayBill);
    return totalMessBill;
}

export default getTotalMessBill;
