import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";
import todoImg from "./todo.png";
import { v4 as uuidv4 } from "uuid";

// React func comp type `React.FC`
const App: React.FC = () => {
  const [task, setTask] = useState<string>(""); //type string

  // state hook with type `ITask[]`-- array of objects with properties `taskName` and `deadline`
  const [todo, setTodo] = useState<ITask[]>([]);

  // event handler for handling changes in input fields--typing is specified with `ChangeEvent<HTMLInputElement>`; return nothing so void
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    }
  };

  const addTask = (): void => {
    //return nothing so void
    // creates new task object w/properties `taskName` and `deadline`
    const newTask = {
      id: uuidv4(),
      taskName: task,
    };
    //console.log(newTask.id);
    // adds new task object to the `todo` state and resets input fields
    setTodo([...todo, newTask]);
    setTask("");
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
        return task.id !== taskNameToDelete;
        //changed this from task.taskName to task.id so that tasks are deleted by unique id (uuid)
        //before, when deleting based on taskName, if multiples tasks had the same text, ALL of them would be deleted when one was deleted
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
            <button onClick={addTask}>Add</button>
          </div>
        </div>
      </div>
      <div className="todoList">
        {todo.map((task: ITask) => {
          return (
            <TodoTask
              key={task.id}
              task={task}
              completeTask={() => completeTask(task.id)} //(see delete function above--was just completeTask=completeTask before)
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
