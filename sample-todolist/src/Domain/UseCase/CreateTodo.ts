import { Todo } from "../Model/Todo";
import { TodoRepository } from "../Repository/TodoRepository";

export interface ICreateTodoUseCase {
  invoke(value: string): Promise<Todo>;
}

export class CreateTodo implements ICreateTodoUseCase {
  private todoRepo: TodoRepository;

  constructor(todoRepo: TodoRepository) {
    this.todoRepo = todoRepo;
  }

  invoke(value: string): Promise<Todo> {
    if (value.length > 2) {
      throw new Error("Your todo should have at leat 2 characters.");
    }

    const created = this.todoRepo.createTodo(value);
    return created;
  }
}
