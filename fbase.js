
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...firebaseapp.com",
    projectId: "myagenda-c3eb6",
    storageBucket: "myagenda-c3eb6.appspot.com",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);


  const register = document.getElementById('registerbut');
  register.addEventListener("click", function(event) {
    event.preventDefault();
    const emailReg = document.getElementById('emailreg').value;
    const passwordReg = document.getElementById('passwordreg').value;
    createUserWithEmailAndPassword(auth, emailReg, passwordReg)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Your account is getting ready. Close the alert & login to use the app.")
    window.location.href = 'login.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ...
  });
  })
