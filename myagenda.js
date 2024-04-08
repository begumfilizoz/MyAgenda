const inputBox = document.getElementById("input-box");
const list = document.getElementById("list-container");
const apiKey = "641b6c86de7f520632a3281c124732f1";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".row2 input");
const searchButton = document.querySelector(".row2 button");
const weatherImg = document.querySelector(".weather-icon");
findWeather("Zurich");
function addTask()
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
}
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
function keepTasks()
{
    localStorage.setItem("tasks", list.innerHTML);
}
function bringTasks()
{
    list.innerHTML = localStorage.getItem("tasks");
}
bringTasks();
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
