import { Todo } from "../../Domain/Model/Todo";
import { TodoRepository } from "../../Domain/Repository/TodoRepository";
import { TodoDataSource } from "../DataSource/TodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
  private dataSource: TodoDataSource;

  constructor(dataSource: TodoDataSource) {
    this.dataSource = dataSource;
  }

  async createTodo(value: string): Promise<Todo> {
    return this.dataSource.createTodo(value);
  }

  async getTodos(): Promise<Todo[]> {
    return this.dataSource.getTodos();
  }

  async markAsRead(id: string): Promise<boolean> {
    return this.dataSource.toggleTodoCheck(id);
  }

  async removeTodo(id: string): Promise<boolean> {
    return this.dataSource.removeTodo(id);
  }
}
