/*// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";


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
*/
const apiKey = "641b6c86de7f520632a3281c124732f1";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".row2 input");
const searchButton = document.querySelector(".row2 button");
const weatherImg = document.querySelector(".weather-icon");

findWeather("Zurich");


const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});
document.getElementById('date').textContent = formattedDate;
async function findWeather(city)
{
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    if (data.weather[0].main == "Clouds")
    {
        weatherImg.src = "cloudy.png";
    }
    else if (data.weather[0].main == "Clear")
    {
        weatherImg.src = "sunny.png";
    }
    else if (data.weather[0].main == "Rain")
    {
        weatherImg.src = "rainy.png";
    }
    else if (data.weather[0].main == "Drizzle")
    {
        weatherImg.src = "drizzle.png";
    }
    else if (data.weather[0].main == "Mist")
    {
        weatherImg.src = "fog.png";
    }
    

}
searchButton.addEventListener("click", ()=>{
    findWeather(searchBox.value);
});

