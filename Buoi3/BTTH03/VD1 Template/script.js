let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filter = filterSelect.value;

  tasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "active" && task.completed)
    ) {
      return; // Bỏ qua nếu không khớp bộ lọc
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.name;
    span.className = "task-content";
    if (task.completed) span.classList.add("completed");

    // Toggle hoàn thành khi click vào nội dung
    span.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Nút sửa
    const editBtn = document.createElement("button");
    editBtn.textContent = "Sửa";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      const newName = prompt("Nhập tên công việc mới:", task.name);
      if (newName !== null && newName.trim() !== "") {
        task.name = newName.trim();
        saveTasks();
        renderTasks();
      }
    });

    // Nút xoá (gạch ngang thay vì xóa thật)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      task.completed = true;
      saveTasks();
      renderTasks();
    });

    // Gộp nút
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
  });
}

// Thêm task
addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  if (name === "") return;

  tasks.push({ name, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// Bộ lọc
filterSelect.addEventListener("change", renderTasks);

// Lần đầu load
renderTasks();
