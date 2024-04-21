// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginButton = document.querySelector('.btn'); 

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');

});
loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
    
});

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


  const login = document.getElementById('loginbut');
  login.addEventListener("click", function(event) {
    event.preventDefault();
    const emailLog = document.getElementById('emaillog').value;
    const passwordLog = document.getElementById('passwordlog').value;
    signInWithEmailAndPassword(auth, emailLog, passwordLog)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location.href = 'index.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ...
  });
  })
