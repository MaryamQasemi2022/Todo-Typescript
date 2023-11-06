import { TodoInterface } from "../interfaces/TodoInterface";
import { Ui } from "./Ui";

export class Store {
  static getTodos() {
    let todos: TodoInterface[] = [];
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos")!);
      return todos;
    }
    return todos;
  }
  static displayTodos() {
    let todos = Store.getTodos();
    const ui = new Ui();
    todos.forEach((todo) => {
      ui.addTodoToList(todo);
    });
  }
  static addTodo(todo: TodoInterface) {
    let todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  static removeTodo(id: number) {
    let todos = Store.getTodos();
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  static changeTodoStatus(id: number) {
    let todos = Store.getTodos();
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
