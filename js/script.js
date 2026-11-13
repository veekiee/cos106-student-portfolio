
// ACADEMIC PLANNER

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });
}

if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();
        displayTasks();
        taskInput.value = "";
    });

    displayTasks();
}


// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const feedback = document.getElementById("form-feedback");

        if (!name || !email || !phone || !message) {
            feedback.textContent = "Please fill in every field.";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        if (!/^[0-9]+$/.test(phone)) {
            feedback.textContent = "Phone number must contain digits only.";
            return;
        }

        feedback.textContent = "Your form has been validated successfully!";
        contactForm.reset();
    });
}
