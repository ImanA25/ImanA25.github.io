// script.js
document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodoBtn");
    const todoList = document.getElementById("todoList");
    const filterSelect = document.getElementById("filter");
    const totalCount = document.getElementById("totalCount");
    const completedCount = document.getElementById("completedCount");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");
  
    let todos = [];
  
    const renderTodos = () => {
      todoList.innerHTML = "";
      const filter = filterSelect.value;
  
      const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
      });
  
      filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        if (todo.completed) li.classList.add("completed");
  
        const text = document.createElement("span");
        text.textContent = todo.text;
        text.classList.add("todo-text");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleCompletion(index));
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteTodo(index));
  
        li.append(checkbox, text, deleteBtn);
        todoList.appendChild(li);
      });
  
      updateStats();
    };
  
    const addTodo = () => {
      const text = todoInput.value.trim();
      if (text === "") {
        alert("Please enter a task!");
        return;
      }
      todos.push({ text, completed: false });
      todoInput.value = "";
      renderTodos();
    };
  
    const toggleCompletion = (index) => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    };
  
    const deleteTodo = (index) => {
      todos.splice(index, 1);
      renderTodos();
    };
  
    const clearCompleted = () => {
      todos = todos.filter((todo) => !todo.completed);
      renderTodos();
    };
  
    const clearAll = () => {
      if (confirm("Are you sure you want to clear all tasks?")) {
        todos = [];
        renderTodos();
      }
    };
  
    const updateStats = () => {
      totalCount.textContent = todos.length;
      completedCount.textContent = todos.filter((todo) => todo.completed).length;
    };
  
    addTodoBtn.addEventListener("click", addTodo);
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTodo();
    });
    filterSelect.addEventListener("change", renderTodos);
    clearCompletedBtn.addEventListener("click", clearCompleted);
    clearAllBtn.addEventListener("click", clearAll);
  
    renderTodos();
  });