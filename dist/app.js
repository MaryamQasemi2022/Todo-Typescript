"use strict";
class Todo {
    constructor(todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.status = todo.status;
    }
}
class Ui {
    addTodoToList(todo) {
        const list = document.querySelector("tbody#todo-list");
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <th>${todo.id}</th>
    <td>
      <input ${todo.status ? "checked" : ""} onchange="Store.changeTodoStatus(${todo.id})" type="checkbox" class="form-check-input" />
    </td>
    <td>${todo.title}</td>

    <td>
      <button onclick="ui.removeTodo(event,${todo.id})" class="btn btn-sm btn-outline-danger">
        Delete
      </button>
    </td>
    
    
    `;
        list.appendChild(tr);
    }
    removeTodo(e, id) {
        const element = e.target;
        element.parentElement.parentElement.remove();
        Store.removeTodo(id);
        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
        // Toast.fire({
        //   icon: "success",
        //   title: "deleted!",
        // });
    }
}
class Store {
    static getTodos() {
        let todos = [];
        if (localStorage.getItem("todos")) {
            todos = JSON.parse(localStorage.getItem("todos"));
            return todos;
        }
        return todos;
    }
    static displayTodos() {
        let todos = Store.getTodos();
        todos.forEach((todo) => {
            ui.addTodoToList(todo);
        });
    }
    static addTodo(todo) {
        let todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    static removeTodo(id) {
        let todos = Store.getTodos();
        todos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    static changeTodoStatus(id) {
        let todos = Store.getTodos();
        todos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { status: !todo.status }) : todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
const ui = new Ui();
const form = document.querySelector("form#todo-form");
const title = document.querySelector("input#title");
const titleError = document.querySelector("p#title-error");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!title.value.trim()) {
        titleError.innerHTML = `Title is required...`;
        return;
    }
    titleError.innerHTML = "";
    const todoObj = {
        id: Math.round(Math.random() * 100),
        title: title.value.trim(),
        status: false,
    };
    const todo = new Todo(todoObj);
    ui.addTodoToList(todo);
    Store.addTodo(todo);
    title.value = "";
});
document.addEventListener("DOMContentLoaded", Store.displayTodos);
