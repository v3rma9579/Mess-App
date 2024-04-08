import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

var firebaseConfig = {
    apiKey: "AIzaSyDRl9n7bOgYSegReCR0CFJ_BRb63IoKy0w",
    authDomain: "mess-maintainance.firebaseapp.com",
    projectId: "mess-maintainance",
    storageBucket: "mess-maintainance.appspot.com",
    messagingSenderId: "823193074711",
    appId: "1:823193074711:web:23d8c3fa137a8f15627052"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

document.getElementById("upload").addEventListener('click', async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const csvData = event.target.result;
        processData(csvData);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  })

  async function processData(csvData) {
    const lines = csvData.split(/\r?\n/);
    const students = [];

    lines.forEach(line => {
      const [email,name, phone,bill] = line.split(',');
      students.push({ email, name,phone,bill });
    //   saveMessage(email);
    });

    await createAccounts(students);
  }

  async function createAccounts(students) {
    const auth = getAuth(app);
    

    for (const student of students) {
      try {
        // console.log(student.email);
        await setDoc(doc(firestore, "user", student.email), student);
        await setDoc(doc(firestore, "bills", student.email), student);
        await createUserWithEmailAndPassword(auth,student.email, student.phone);
        // await firestore.collection('user').doc(email).set({
        //   email: student.email,
        // //   phone: student.phone
        // });
        console.log(`Account created for ${student.email}`);
      } catch (error) {
        console.error(`Error creating account for ${student.email}: ${error.message}`);
      }
    }

    alert('Accounts created and data stored successfully!');
  }
// async function  saveMessage(e,email){
//     e.preventDefault();
//     await setDoc(doc(firestore, "user", email), {
//       'email':email,
//     });
//   }