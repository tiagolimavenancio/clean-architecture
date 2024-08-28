import { Todo } from "../Model/Todo";
import { TodoRepository } from "../Repository/TodoRepository";

export interface IGetTodosUseCase {
  invoke(): Promise<Todo[]>;
}

export class GetTodos implements IGetTodosUseCase {
  private todoRepo: TodoRepository;

  constructor(todoRepo: TodoRepository) {
    this.todoRepo = todoRepo;
  }

  async invoke(): Promise<Todo[]> {
    return this.todoRepo.getTodos();
  }
}
