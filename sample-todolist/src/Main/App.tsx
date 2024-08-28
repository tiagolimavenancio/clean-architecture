import React from "react";
import { ToastContainer } from "react-toastify";
import { TodoListView } from "../Presentation/TodoListView";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <TodoListView />
    </div>
  );
}

export default App;
