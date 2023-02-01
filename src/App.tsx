import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  //store what user writes; monitors values in input fields and store them
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  //add task when add button is clicked
  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline,
    };
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            name="task"
            placeholder="Add a task:"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            placeholder="Set a deadline (in days)"
            value={deadline}
            onChange={handleChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>
      <div className="todoList"></div>
    </div>
  );
};

export default App;
