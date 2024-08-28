import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Todo } from "../Domain/Model/Todo";
import { TodoAPIDataSourceImpl } from "../Data/DataSource/API/TodoAPIDataSourceImpl";
import { TodoRepositoryImpl } from "../Data/Repository/TodoRepositoryImpl";
import { GetTodos } from "../Domain/UseCase/GetTodos";
import { CreateTodo } from "../Domain/UseCase/CreateTodo";
import { ToggleCheckTodo } from "../Domain/UseCase/ToggleCheckTodo";
import { RemoveTodo } from "../Domain/UseCase/RemoveTodo";

function TodoListViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  const todosDataSourceImpl = new TodoAPIDataSourceImpl();
  const todosRepositoryImpl = new TodoRepositoryImpl(todosDataSourceImpl);

  const getTodosUseCase = new GetTodos(todosRepositoryImpl);
  const createTodosUseCase = new CreateTodo(todosRepositoryImpl);
  const toggleCheckTodoUseCase = new ToggleCheckTodo(todosRepositoryImpl);
  const removeTodosUseCase = new RemoveTodo(todosRepositoryImpl);

  function resetValue() {
    setValue("");
  }

  async function getTodos() {
    setTodos(await getTodosUseCase.invoke());
  }

  async function createTodo() {
    try {
      const createdTodo = await createTodosUseCase.invoke(value);
      setTodos((prev) => [...prev, createdTodo]);
      resetValue();
    } catch (e) {
      resetValue();
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  }

  async function toggleRead(id: string) {
    const createdTodo = await toggleCheckTodoUseCase.invoke(id);
    setTodos((prev) => [
      ...prev.map((i) => {
        const isToggled = i.id === id;

        return {
          ...i,
          isComplete: isToggled ? createdTodo : i.isComplete,
        };
      }),
    ]);
  }

  async function removeTodo(id: string) {
    const isRemoved = await removeTodosUseCase.invoke(id);
    if (isRemoved) {
      setTodos((prev) => {
        return [...prev.filter((i) => i.id !== id)];
      });
    }
  }

  function onChangeValue(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue(e.target.value);
  }

  return {
    todos,
    value,

    createTodo,
    toggleRead,
    removeTodo,
    getTodos,
    onChangeValue,
  };
}

export default TodoListViewModel;
