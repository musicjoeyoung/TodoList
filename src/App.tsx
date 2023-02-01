import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";
import todoImg from "./todo.png";

//NOTES - add another option to strikethrough; press enter to add//"motivating to-do list" every time something is check off, a motivating banner pops up

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  //store what user writes; monitors values in input fields and store them
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
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
