const taskInput = document.getElementById("task-title");
const deadlineInput = document.getElementById("task-deadline");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const searchTaskInput = document.getElementById("search-task");

let tasks = [];

// show tasks
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = ""; // Clear existing tasks
    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.toggle("completed", task.completed);

        // Task title and deadline
        listItem.innerHTML = `
        <span>${task.title} (Due: ${formatDate(task.deadline)})</span>
        <div>
          <button onclick="toggleComplete(${index})">Complete</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;

        taskList.appendChild(listItem);
    });
}

// add task
addTaskBtn.addEventListener("click", () => {
    const taskTitle = taskInput.value;
    const taskDeadline = deadlineInput.value;

    if (taskTitle === "") {
        alert("Task title cannot be empty");
        return;
    }

    tasks.push({ title: taskTitle, deadline: taskDeadline, completed: false });
    taskInput.value = "";
    deadlineInput.value = "";
    renderTasks();
});

// mark task as completed
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// edit a task
function editTask(index) {
    const newTitle = prompt("Edit task title:", tasks[index].title);
    const newDeadline = prompt("Edit task deadline (YYYY-MM-DD):", tasks[index].deadline);

    if (newTitle !== null) tasks[index].title = newTitle;
    if (newDeadline !== null) tasks[index].deadline = newDeadline;

    renderTasks();
}

// delete task
function deleteTask(index) {
    tasks.splice(index, 1); // remove task
    renderTasks();
}

// search tasks
searchTaskInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm));
    renderTasks(filteredTasks);
});

// format date as MM-DD-YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // month
    const day = String(date.getDate()).padStart(2, '0'); // day
    const year = date.getFullYear(); // year

    return `${month}-${day}-${year}`;
}

renderTasks();