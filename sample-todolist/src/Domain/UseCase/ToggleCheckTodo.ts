import { TodoRepository } from "../Repository/TodoRepository";

export interface IToggleCheckTodo {
  invoke(id: string): Promise<boolean>;
}

export class ToggleCheckTodo implements IToggleCheckTodo {
  private todoRepo: TodoRepository;

  constructor(todoRepo: TodoRepository) {
    this.todoRepo = todoRepo;
  }

  invoke(id: string): Promise<boolean> {
    return this.todoRepo.markAsRead(id);
  }
}
