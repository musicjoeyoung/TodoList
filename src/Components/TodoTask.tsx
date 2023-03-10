import { ITask } from "../Interfaces";
import { useState } from "react";

// Props interface defines the shape of the data that is passed as props to the TodoTask component
interface Props {
  // task is of type ITask from "../Interfaces"
  task: ITask;

  // takes a string parameter taskNameToDelete and returns nothing so type is void
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  //const [checkCount, setCheckCount] = useState<number>(0);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    //setCheckCount(checkCount + 1);
  };
  //console.log("checkCount", checkCount);

  return (
    <div className="task">
      <div className="inputContainer">
        <input
          type="checkbox"
          onChange={handleCheckboxClick}
          checked={isChecked}
        />
        <div className="content">
          <span style={{ backgroundColor: isChecked ? "#00800080" : "" }}>
            {task.taskName}
          </span>
        </div>
      </div>
      <div className="buttonContainer">
        <button
          onClick={() => {
            completeTask(task.taskName);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};
export default TodoTask;
