import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection,setDoc, getDocs,getDoc, doc, updateDoc,increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Function to update bills for all students according to the selected month
async function updateBillsForAllStudents(month, amount) {
    try {
        
        // const studentsSnapshot = await getDocs(collection(db, 'bills'));
        
        // studentsSnapshot.forEach(async (doc) => {
        //     const studentRef = doc(db, 'bills', doc.id);
        //     const currentBill = doc.data().monthlyBill || 0;
        //     const updatedBill = currentBill + parseFloat(amount);
        //     await updateDoc(studentRef, {
        //         monthlyBill: updatedBill
        //     });
        // });
        // console.log('Bills updated for all students successfully.');
        await setDoc(doc(db,'monthlybill',month),{amount});

    } catch (error) {
        console.error('Error updating bills:', error);
    }
}

async function addExtraExpenseForStudent(month,studentEmail, extraExpense) {
    try {
        // const studentDocRef = doc(db, 'bills', studentEmail);
        // const studentDocSnapshot = await getDoc(studentDocRef);
        
        // if (studentDocSnapshot.exists()) {
        //     const currentBill = studentDocSnapshot.data().monthlyBill || 0;
        //     const updatedBill = currentBill + parseFloat(extraExpense);

        //     await updateDoc(studentDocRef, { monthlyBill: updatedBill });

        //     console.log('Extra expense added for student successfully.');
        // } else {
        //     console.log('Student document does not exist.');
        // }

        const docref=await getDoc(doc(db,'monthlybill',month,'extra',studentEmail));
        if(docref.exists()){
            await updateDoc(doc(db,'monthlybill',month,'extra',studentEmail),{amount : increment(extraExpense)})
        }else{
            await setDoc(doc(db,'monthlybill',month,'extra',studentEmail),{amount : extraExpense})
        }
        renderAllStudentsData(month);
    } catch (error) {
        console.error('Error adding extra expense:', error);
    }
}




// Function to render all student data
async function renderAllStudentsData(month) {
    try {
        const studentsList = document.getElementById('studentsList');
        if (!studentsList) {
            console.error('Students list element not found.');
            return;
        }

        studentsList.innerHTML = ''; // Clear previous list

        const monthlySnapshot = await getDoc(doc(db, 'monthlybill',month));
        const monthlyamount = monthlySnapshot.data().amount;
        const extraSnapshot = await getDocs(collection(db, 'monthlybill',month,'extra'));
        extraSnapshot.forEach((doc) => {
            const studentData = doc.data();
            const studentItem = document.createElement('div');
            studentItem.classList.add('student-item');
            studentItem.innerHTML = `
                <div>Email: ${doc.id}</div>
                <div>Monthly Bill: ${monthlyamount || 'N/A'}</div>
                <div>Extra Bill: ${studentData.amount || 'N/A'}</div>
                <div>Total amount: ${studentData.amount+monthlyamount || 'N/A'}</div>
            `;
            studentsList.appendChild(studentItem);
        });
        console.log('All students data rendered successfully.');
    } catch (error) {
        console.error('Error rendering students data:', error);
    }
}

// Event listener for updating bills for all students
document.getElementById('updateBillsBtn').addEventListener('click', async () => {
    const selectedMonth = document.getElementById('monthSelect').value;
    const amount = Number(document.getElementById('amountInput').value);
    updateBillsForAllStudents(selectedMonth, amount);
});

// Event listener for adding extra expense for a specific student
document.getElementById('addExtraExpenseBtn').addEventListener('click', async () => {
    const month = document.getElementById('monthSelectextra').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const extraExpense = Number(document.getElementById('extraExpenseInput').value);
    addExtraExpenseForStudent(month,studentEmail, extraExpense);
});

// Render all student data on page load
renderAllStudentsData('january2024');
document.getElementById('renderstudent').addEventListener('change',(e)=>{
    e.preventDefault();
    const month = e.target.value;
    renderAllStudentsData(month);

})  