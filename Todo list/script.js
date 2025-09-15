const form = document.getElementById("form");
const input = document.querySelector(".input");
const todosUL = document.getElementById("todos");
const clearAllBtn = document.getElementById("clearAll");
const todoCount = document.getElementById("todoCount");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

clearAllBtn.addEventListener("click", () => {
  const todos = todosUL.querySelectorAll("li");
  todos.forEach((todo, index) => {
    setTimeout(() => {
      todo.classList.add("removing");
      setTimeout(() => todo.remove(), 500);
    }, index * 100);
  });
  setTimeout(() => updateTodoCount(), todos.length * 100 + 500);
});

function addTodo() {
  const todoText = input.value.trim();
  
  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todoEl.classList.add("removing");
      setTimeout(() => {
        todoEl.remove();
        updateTodoCount();
      }, 500);
    });

    todoEl.appendChild(deleteBtn);
    todosUL.appendChild(todoEl);
    input.value = "";
    updateTodoCount();
  }
}

function updateTodoCount() {
  const totalTodos = todosUL.children.length;
  const completedTodos = todosUL.querySelectorAll(".completed").length;
  const remainingTodos = totalTodos - completedTodos;
  
  if (totalTodos === 0) {
    todoCount.textContent = "0 todos";
  } else if (completedTodos === 0) {
    todoCount.textContent = `${totalTodos} todo${totalTodos > 1 ? 's' : ''}`;
  } else {
    todoCount.textContent = `${remainingTodos} of ${totalTodos} remaining`;
  }
}
