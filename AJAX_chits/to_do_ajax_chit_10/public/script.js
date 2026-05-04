// Load tasks
window.onload = loadTasks;

// GET
function loadTasks() {
    fetch("/tasks")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                let li = document.createElement("li");

                li.innerHTML = `
                    ${task.text}
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;

                list.appendChild(li);
            });
        });
}

// ADD
function addTask() {
    let text = document.getElementById("taskInput").value;

    if (!text) return;

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    })
    .then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

// DELETE (FIXED)
function deleteTask(id) {
    fetch(`/tasks/${id}`, {   // ✅ backticks used
        method: "DELETE"
    })
    .then(() => loadTasks());
}

// UPDATE (FIXED)
function editTask(id) {
    let newText = prompt("Enter new task:");

    if (!newText) return;

    fetch(`/tasks/${id}`, {   // ✅ backticks used
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newText })
    })
    .then(() => loadTasks());
}