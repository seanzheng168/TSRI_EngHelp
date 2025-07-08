
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  const search = document.getElementById("search-input").value.toLowerCase();
  list.innerHTML = "";

  todos
    .filter(todo => todo.text.toLowerCase().includes(search))
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.innerHTML = \`
        <span onclick="toggleComplete(\${index})">\${todo.text}</span>
        <button class="delete-btn" onclick="deleteTodo(\${index})">刪除</button>
      \`;
      list.appendChild(li);
    });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = "";
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function filterTodos() {
  renderTodos();
}

renderTodos();
