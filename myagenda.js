const inputBox = document.getElementById("input-box");
const list = document.getElementById("list-container");
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