import { TodoInterface } from "../interfaces/TodoInterface";

export class Todo implements TodoInterface {
  id: number;
  title: string;
  status: boolean;
  constructor(todo: TodoInterface) {
    this.id = todo.id;
    this.title = todo.title;
    this.status = todo.status;
  }
}
