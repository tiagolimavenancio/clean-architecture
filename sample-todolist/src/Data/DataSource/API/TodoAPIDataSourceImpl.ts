import { Todo } from "../../../Domain/Model/Todo";
import { TodoDataSource } from "../TodoDataSource";
import { TodoAPIEntity } from "./Entity/TodoAPIEntity";
import localDB from "./LocalDB";

export class TodoAPIDataSourceImpl implements TodoDataSource {
  private db = localDB<TodoAPIEntity>("todos");

  async createTodo(value: string): Promise<Todo> {
    const res: Todo = {
      id: new Date().getSeconds().toString(),
      title: value,
      isComplete: false,
    };

    this.db.create({
      id: res.id,
      title: res.title,
      is_completed: res.isComplete,
    });

    return res;
  }

  async getTodos(): Promise<Todo[]> {
    const data = this.db.getAll();

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      isComplete: item.is_completed,
    }));
  }

  async removeTodo(id: string): Promise<boolean> {
    return this.db.removeById(id);
  }

  async toggleTodoCheck(id: string): Promise<boolean> {
    const item = this.db.updateByField(id, "is_completed", "toggle");
    return item.is_completed;
  }
}
