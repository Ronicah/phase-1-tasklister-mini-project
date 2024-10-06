document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const taskDetails = {
      text: form["task-input"].value.trim(),
      user: form["user-input"].value.trim(),
      duration: form["duration-input"].value.trim(),
      dueDate: form["due-date-input"].value,
      priority: form["priority-select"].value,
    };

    if (Object.values(taskDetails).some(v => !v)) return;

    addTask(taskDetails);
    form.reset(); 
  });

  function addTask({ text, user, duration, dueDate, priority }) {
    const li = document.createElement("li");
    li.innerHTML = `${text} (User: ${user}, Duration: ${duration}, Due: ${dueDate}) <span class="priority">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>`;
    li.className = priority;
    li.style.color = getColor(priority);

    li.appendChild(createButton("Edit", () => editTask(li, { text, user, duration, dueDate, priority })));
    li.appendChild(createButton("Remove", () => li.remove()));
    
    taskList.appendChild(li);
  }

  function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  function getColor(priority) {
    return { high: "red", medium: "orange", low: "green" }[priority];
  }

  function editTask(li, details) {
    const newDetails = {
      text: prompt("Edit your task:", details.text),
      user: prompt("Edit user:", details.user),
      duration: prompt("Edit duration:", details.duration),
      dueDate: prompt("Edit due date:", details.dueDate),
      priority: prompt("Edit priority (high, medium, low):", details.priority),
    };

    if (Object.values(newDetails).every(v => v)) {
      li.innerHTML = `${newDetails.text} (User: ${newDetails.user}, Duration: ${newDetails.duration}, Due: ${newDetails.dueDate}) <span class="priority">${newDetails.priority.charAt(0).toUpperCase() + newDetails.priority.slice(1)}</span>`;
      li.className = newDetails.priority;
      li.style.color = getColor(newDetails.priority);
    }
  }

  document.getElementById("sort-button").addEventListener("click", () => {
    const sortedTasks = Array.from(taskList.children).sort((a, b) => {
      const priorityA = { high: 1, medium: 2, low: 3 }[a.className];
      const priorityB = { high: 1, medium: 2, low: 3 }[b.className];
      return priorityA - priorityB;
    });
    
    taskList.innerHTML = ""; 
    sortedTasks.forEach(task => taskList.appendChild(task));
  });
}); 



