"use strict";
// class Todo implements TodoInterface {
//   // id: string;
//   // title: string;
//   // status: boolean;
//   // todoList = document.getElementById("todo-list") as HTMLElement;
//   // constructor(todo: TodoInterface) {
//   //   this.id = todo.id;
//   //   this.title = todo.title;
//   //   this.status = todo.status;
//   // }
//   addTodoToList() {
//     // const tr = document.createElement("tr");
//     const r = storageTodos.map((todo: object) => {
//       return `
//       <tr>
//       <th >${todo.id}</th>
//                     <td>
//                       <input type="checkbox" class="form-check-input" ${
//                         this.status ? "checked" : ""
//                       }  onchange="todo.changeTodo(event)"/>
//                     </td>
//                     <td>${this.title}</td>
//                     <td>
//                       <button onclick="todo.removeTodoFromList(event)"  class="btn btn-sm btn-outline-danger">
//                         delete
//                       </button>
//                     </td>
//                     </tr>
//       `;
//     });
//     this.todoList.appendChild(r);
//     this.updateStorage(this.todoList);
//   }
//   removeTodoFromList(e: Event) {
//     const element = e.target as HTMLElement;
//     element.parentElement!.parentElement!.remove();
//     this.updateStorage(this.todoList);
//   }
//   updateStorage(todoList: HTMLElement) {
//     localStorage.setItem("todos", todoList.innerHTML.toString());
//   }
//   changeTodo(e: Event) {
//     console.log(e.target);
//     // e.target!.setAttribute("checked",true)
//     this.updateStorage(this.todoList);
//   }
// }
const storageTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
const todoList = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const inputTitle = document.getElementById("title");
const titleError = document.querySelector("p#title-error");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputTitle.value.trim()) {
        titleError.innerHTML = "Title is required...";
        return;
    }
    titleError.innerHTML = "";
    const todoItem = {
        id: Math.round(Math.random() * 100).toString(32),
        title: inputTitle.value.trim(),
        status: false,
    };
    storageTodos.push(todoItem);
    console.log(storageTodos);
    const r = storageTodos.map((todo) => {
        return `
<h1>${todo.id}</h1>
`;
    });
    console.log(r);
    todoList.appendChild(r);
    // const todo = new Todo(todoItem);
    // todo.addTodoToList();
    inputTitle.value = "";
});
