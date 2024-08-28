import { useEffect } from "react";
import { List, ListItem, ListItemIcon, Checkbox, ListItemText } from "@mui/material";
import useViewModel from "./TodoListViewModel";

export function TodoListView() {
  const { getTodos, createTodo, onChangeValue, toggleRead, removeTodo, value, todos } =
    useViewModel();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <List>
      <input onChange={onChangeValue} placeholder="add your todo" type="text" value={value} />
      <button onClick={createTodo}>add</button>

      {todos.map((todo, i) => {
        return (
          <ListItem key={i}>
            <ListItemIcon>
              <Checkbox checked={todo.isComplete} onChange={() => toggleRead(todo.id)} />
            </ListItemIcon>
            <ListItemText primary={todo.title} />
            <button onClick={() => removeTodo(todo.id)}>remove</button>
          </ListItem>
        );
      })}
    </List>
  );
}
