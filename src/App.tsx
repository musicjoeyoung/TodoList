import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";
import todoImg from "./todo.png";

// React func comp type `React.FC`
const App: React.FC = () => {
  const [task, setTask] = useState<string>(""); //type string
  const [deadline, setDeadline] = useState<number>(0); //type number
  // state hook with type `ITask[]`-- array of objects with properties `taskName` and `deadline`
  const [todo, setTodo] = useState<ITask[]>([]);

  // event handler for handling changes in input fields--typing is specified with `ChangeEvent<HTMLInputElement>`; return nothing so void
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    //return nothing so void
    // creates new task object w/properties `taskName` and `deadline`
    const newTask = {
      taskName: task,
      deadline: deadline,
    };
    // adds new task object to the `todo` state and resets input fields
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //type React.KeyboardEvent<HTMLInputElement
    if (event.key === "Enter") {
      addTask();
    }
  };

  // event handler for completing a task; takes in a `taskNameToDelete` string type; returns nothing so voide
  const completeTask = (taskNameToDelete: string): void => {
    // filters out the task with the specified name and updates the `todo` state
    setTodo(
      todo.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="banner">
          <img src={todoImg} alt="to do banner" />
        </div>
        <div className="entry">
          <h1>To-Do List</h1>
          <div className="inputContainer">
            <input
              type="text"
              name="task"
              placeholder="Add a task:"
              value={task}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {/*     <input
            type="number"
            name="deadline"
            placeholder="Set a deadline (in days)"
            value={deadline}
            onChange={handleChange}
          /> */}
            <button onClick={addTask}>Add</button>
          </div>
        </div>
      </div>
      <div className="todoList">
        {todo.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
