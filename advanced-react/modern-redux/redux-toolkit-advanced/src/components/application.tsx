import Counter from './counter';
import CreateTask from './create-task';
import TaskList from './task-list';
import UserList from './user-list';

const Application = () => {
  if (window.location.pathname === '/counter') {
    return <Counter />;
  }

  return (
    <main className="application">
      <div className="side-panel">
        <CreateTask />
        <UserList />
      </div>
      <TaskList />
    </main>
  );
};

export default Application;
