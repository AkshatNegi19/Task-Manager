const API = "http://localhost:5000/api/tasks";

const form = document.getElementById("task-form");
const list = document.getElementById("task-list");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const task = {
    title: title.value,
    description: description.value,
    status: status.value
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  form.reset();
  loadTasks();
});

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  list.innerHTML = "";

  tasks.forEach(t => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.description || ""}</p>
      <select onchange="updateStatus('${t._id}', this.value)">
        <option ${t.status==="pending" && "selected"}>pending</option>
        <option ${t.status==="in-progress" && "selected"}>in-progress</option>
        <option ${t.status==="completed" && "selected"}>completed</option>
      </select>
      <button onclick="deleteTask('${t._id}')">Delete</button>
    `;

    list.appendChild(div);
  });
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

async function updateStatus(id, status) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
}

loadTasks();
