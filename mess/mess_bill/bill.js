const monthly_bill = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>Example 1</title>
<link rel="stylesheet" href="monthly_bill.css" media="all" />
</head>

<body>
<header class="clearfix">
    <div id="logo">
    <img src="../login_page/logo.png">
    </div>
    <h1>Student Invoice</h1>
    <div id="student-info">
    <h2>
        <div><span>NAME</span> Shubham Verma</div>
    </h2>
    <h2>
        <div><span>ROLL NO</span> MCA/10012/23</div>
    </h2>
    <h2>
        <div><span>ADDRESS</span> HZB</div>
    </h2>
    <h2>
        <div><span>EMAIL</span>xyz@gmail.com</div>
    </h2>
    <h2>
        <div><span>DATE</span> 31/01/2024</div>
    </h2>
    </div>
</header>
<main>
    <table>
    <thead>
        <tr>
        <th class="service">BILL NO.</th>
        <th class="desc">HOSTEL</th>
        <th>AMOUNT</th>
        <th>REMARKS</th>
        <th>DATE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td class="service">123893782</td>
        <td class="desc">5</td>
        <td class="unit">192</td>
        <td class="qty">Bill for Janurary Month</td>
        <td class="total">31/01/2024</td>
        </tr>
        <tr>
        <td colspan="4" class="grand total">GRAND TOTAL</td>
        <td class="grand total">192.00</td>
        </tr>
    </tbody>
    </table>
    <div id="notices">
</main>
<footer>
    This is an auto generated invoice.
</footer>
</body>
</html>        
`
function printUserData() {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(monthly_bill)
    printWindow.document.close();
    printWindow.print();

}

// var bill_no = 0;
// var tbody = document.getElementById('tbody1');

// function addStudentDataToTable(bill_no, hostel, amount, remakrs, date) {
//     let trow = document.createElement("trow");
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     let td5 = document.createElement('td');

//     td1.innerHTML = ++bill_no;
//     td2.innerHTML = hostel;
//     td3.innerHTML = amount;
//     td4.innerHTML = remakrs;
//     td5.innerHTML = date;

//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);
//     trow.appendChild(td5);

//     tbody.appendChild(trow);

// }

// function addAllItemsToTable(StudentBill) {
//     stdNo = 0;
//     tbody.innerHTML = "";
//     StudentBill.forEach(element => {
//         addStudentDataToTable(element.bill_no, element.hostel, element.amount, element.remakrs, element.date);
//     });
// }

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
//     authDomain: "mess-maintainance.firebaseapp.com",
    // databaseURL: "https://mess-maintainance-default-rtdb.firebaseio.com",
//     projectId: "mess-maintainance",
//     storageBucket: "mess-maintainance.appspot.com",
//     messagingSenderId: "823193074711",
//     appId: "1:823193074711:web:23d8c3fa137a8f15627052"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// function getAllDataOnce() {
//     const dbRef = ref(db);

//     get(child(dbRef, "StudentBill")).then((snapshot) => {
//         var student = [];

//         snapshot.forEach(childSnapshot => {
//             student.push(childSnapshot.val());
//         });
//         addAllItemsToTable(student);
//     })
// }

// window.onload = getAllDataOnce();