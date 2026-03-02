const apiUrl = 'http://localhost:3000/todos';

async function fetchTodos() {
  const res = await fetch(apiUrl);
  const todos = await res.json();
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.task + (todo.done ? ' ✅' : '');
    li.onclick = () => toggleTodo(todo.id);
    list.appendChild(li);
  });
}

async function addTodo() {
  const task = document.getElementById('taskInput').value;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  document.getElementById('taskInput').value = '';
  fetchTodos();
}

async function toggleTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'PATCH' });
  fetchTodos();
}

fetchTodos();