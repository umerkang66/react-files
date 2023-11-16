import './App.css';
import { Column } from './components/Column';
import { TASK_STATE } from './utils/taskState';

function App() {
  return (
    <div className="App">
      <Column state={TASK_STATE.PENDING} />
      <Column state={TASK_STATE.ONGOING} />
      <Column state={TASK_STATE.DONE} />
    </div>
  );
}

export { App };
