import { useRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = ({ onEnterTask, loading }) => {
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
    }

    taskInputRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
