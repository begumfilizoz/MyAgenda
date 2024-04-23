// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCGwmCNI7u84Nl9aG2Rwb-3fAzA2D5xAIc",
    authDomain: "myagenda-c3eb6.firebaseapp.com",
    projectId: "myagenda-c3eb6",
    storageBucket: "myagenda-c3eb6.appspot.com",
    messagingSenderId: "460083733290",
    appId: "1:460083733290:web:3e56a4f7b69bb17e9cf453",
    measurementId: "G-0BPZQWD0B5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const db2 = getFirestore(app);

const inputBox = document.getElementById('input-box');
const list = document.getElementById('list-container');
const add = document.getElementById('add');


add.addEventListener("click", function (e)
{
    if(inputBox.value === '')
    {
        alert("Please enter a task... If you don't have any, enjoy your day!");
    }
    else
    {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    keepTasks();
}, false);
list.addEventListener("click", function(e)
{
    if (e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        keepTasks();
    }
    else if(e.target.tagName === "SPAN")
    {
        e.target.parentElement.remove();
        keepTasks();
    }
}, false);

async function keepTasks() {
  const userJSON = localStorage.getItem('currentUser');
  const user = JSON.parse(userJSON);

  const listContainer = document.getElementById('list-container'); 
  const taskItems = Array.from(listContainer.getElementsByTagName('li')); 

  // Extract text content from <li> elements into an array of strings
  const tasks = taskItems.map(item => item.textContent.trim());

  // Store tasks array in Firestore
  await setDoc(doc(db2, "users", user.uid), {
      tasks: tasks
  });
}
  // Function to retrieve tasks from Firestore
/*async function bringTasks() {
    const userJSON = localStorage.getItem('currentUser');
    const user = JSON.parse(userJSON);
    const docRef = doc(db2, "users", user.uid);
    const docSnap = await getDoc(docRef);
    list.innerHTML = docSnap;
}*/

async function bringTasks() {
  const userJSON = localStorage.getItem('currentUser');
  const user = JSON.parse(userJSON);

  const docRef = doc(db2, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const tasks = docSnap.data().tasks; 

      const listContainer = document.getElementById('list-container');
      listContainer.innerHTML = ''; 
      tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task;
          const span = document.createElement('span');
          span.textContent = '\u00d7';
          span.addEventListener('click', () => {
              // Handle deletion of task
              li.remove();
              keepTasks(); // Update Firestore after task deletion
          });
          li.appendChild(span);
          listContainer.appendChild(li);
      });
  }
}
  bringTasks ();
