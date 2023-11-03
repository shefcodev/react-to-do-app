import React, { useEffect, useState, useCallback, useMemo } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasksRequest } = useHttp();

  useEffect(() => {
    const transformHttpTasksResponse = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasksRequest(
      {
        url: 'https://react-task-app-78bf2-default-rtdb.firebaseio.com/tasks.json',
      },
      transformHttpTasksResponse
    );
  }, [fetchTasksRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasksRequest}
      />
    </React.Fragment>
  );
};

export default App;
