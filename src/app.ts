import { TodoInterface } from "./interfaces/TodoInterface";
import { Todo } from "./classes/Todo";
import { Ui } from "./classes/Ui";
import { Store } from "./classes/Store";

const ui = new Ui();
const form = document.querySelector("form#todo-form") as HTMLFormElement;
const title = document.querySelector("input#title") as HTMLInputElement;
const titleError = document.querySelector(
  "p#title-error"
) as HTMLParagraphElement;
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  if (!title.value.trim()) {
    titleError.innerHTML = `Title is required...`;
    return;
  }
  titleError.innerHTML = "";

  const todoObj: TodoInterface = {
    id: Math.round(Math.random() * 100),
    title: title.value.trim(),
    status: false,
  };
  const todo = new Todo(todoObj);
  ui.addTodoToList(todo);
  Store.addTodo(todo);
  title.value = "";
});

(window as any).changeTodoStatus = (id: number) => {
  Store.changeTodoStatus(id);
};
(window as any).removeTodo = (event: Event, id: number) => {
  ui.removeTodo(event, id);
};

document.addEventListener("DOMContentLoaded", Store.displayTodos);
