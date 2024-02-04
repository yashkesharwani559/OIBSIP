document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var taskName = taskInput.value;
        var taskDescription = prompt("Please enter a description for the task:");

        if (taskDescription === null || taskDescription.trim() === "") {
            alert("Description cannot be empty. Task not added.");
            return;
        }

        var task = {
            name: taskName,
            description: taskDescription,
            completed: false
        };

        saveTask(task);
        displayTask(task);
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function saveTask(task) {
    var tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

function loadTasks() {
    var tasks = getTasksFromLocalStorage();
    tasks.forEach(displayTask);
}

function displayTask(task) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = task.name + " - " + task.description;

    var tickButton = document.createElement("button");
    tickButton.textContent = "✔";
    tickButton.classList.add("tick-btn");
    tickButton.onclick = function() {
        li.classList.toggle("completed");
        updateTaskCompletion(task, !task.completed);
    };

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() {
        li.remove();
        removeTask(task);
    };

    li.appendChild(tickButton);
    li.appendChild(deleteButton);

    if (task.completed) {
        li.classList.add("completed");
    }

    taskList.appendChild(li);
}

function updateTaskCompletion(task, completed) {
    var tasks = getTasksFromLocalStorage();
    var index = tasks.findIndex(t => t.name === task.name && t.description === task.description);
    
    if (index !== -1) {
        tasks[index].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function removeTask(task) {
    var tasks = getTasksFromLocalStorage();
    var index = tasks.findIndex(t => t.name === task.name && t.description === task.description);

    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function clearAllTasks() {
    localStorage.removeItem("tasks"); // Remove the "tasks" key from local storage
    document.getElementById("taskList").innerHTML = ""; // Clear the task list displayed on the page
}
