import { TodoRepository } from "../Repository/TodoRepository";

export interface IRemoveTodoUseCase {
  invoke(id: string): Promise<boolean>;
}

export class RemoveTodo implements IRemoveTodoUseCase {
  private todoRepo: TodoRepository;

  constructor(todoRepo: TodoRepository) {
    this.todoRepo = todoRepo;
  }

  invoke(id: string): Promise<boolean> {
    return this.todoRepo.removeTodo(id);
  }
}
