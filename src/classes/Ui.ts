import { TodoInterface } from "../interfaces/TodoInterface";
import { Store } from "./Store";
import Swal from "sweetalert2";
export class Ui {
  addTodoToList(todo: TodoInterface) {
    const list = document.querySelector(
      "tbody#todo-list"
    ) as HTMLTableSectionElement;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <th>${todo.id}</th>
        <td>
          <input ${todo.status ? "checked" : ""} onchange="changeTodoStatus(${
      todo.id
    })" type="checkbox" class="form-check-input" />
        </td>
        <td>${todo.title}</td>
    
        <td>
          <button onclick="removeTodo(event,${
            todo.id
          })" class="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </td>
        
        
        `;
    list.appendChild(tr);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "added!",
    });
  }
  removeTodo(e: Event, id: number) {
    const element = e.target as HTMLElement;
    element.parentElement!.parentElement!.remove();
    Store.removeTodo(id);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "deleted!",
    });
  }
}
