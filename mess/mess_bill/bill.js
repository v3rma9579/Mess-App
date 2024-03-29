import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDoc, getFirestore,doc,getDocs,collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"


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
const auth = getAuth(app);
var totalMessBill = 0;

let email ; 
onAuthStateChanged(auth, async (user) => {
    if (user) {
        email =user.email;
    }
});

var totalamount=0;
export async function fetch_data() {
    // const user=auth.currentUser;
    var docRef = await getDocs(collection(db, 'monthlybill'))
    var monthlybill= [];
    // const tbody = document.getElementById('tbody');
    let index=1;
    await docRef.forEach(async (udoc)=>{
        var monthdata={};
        const userRef = await getDoc(doc(db,'monthlybill',udoc.id,'extra',email));
        const useramount = userRef.data().amount;
        monthdata[udoc.id]=udoc.data().amount;
        monthlybill.push(monthdata);
        // var rand=1;
        totalamount+=Number(useramount)+Number(udoc.data().amount);
        const tr = document.createElement('tr');
        var html = `
                    <td><a href="javascript:printUserData()">${index++}</a></td>
                    <td>5</td>
                    <td id="jan-bill">${udoc.data().amount}</td>
                    <td id="jan-bill">${useramount}</td>
                    <td id="jan-bill">${useramount+udoc.data().amount}</td>
                    <td>Mess Bill for ${udoc.id}</td>
            `
        tr.innerHTML=html;
        document.getElementById('tbody').insertBefore(tr, document.getElementById('tbody').children[0]);
        
        // document.getElementById('tbody').appendChild(tr);
        console.log(totalamount);
        document.getElementById('value').textContent=totalamount;
        document.getElementById('abcd').textContent=totalamount;
        
    })
    // const tr = document.createElement('tr');
    // var html =`
    // <td><b>Total Bill</b></td>
    // <td></td>
    // <td id="total"><b>${totalamount}</b></td>
    // `
    // tr.innerHTML=html;
    console.log(monthlybill);
    return totalamount;
}

fetch_data()

    
// async function getTotalMessBill() {
//     var docRef = await getDoc(doc(db, 'bill', 'shubham123@gmail.com'))
//     const janBill = docRef.data().jan24;
//     const febBill = docRef.data().feb24;
//     const marBill = docRef.data().mar24;
//     const aprBill = docRef.data().apr24;
//     const mayBill = docRef.data().may24;
//     totalMessBill = parseFloat(janBill) + parseFloat(febBill) + parseFloat(marBill) + parseFloat(aprBill) + parseFloat(mayBill);
//     return totalMessBill;
// }

export default totalamount;
