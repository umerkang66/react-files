import './Task.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useStore } from '../store';
import trash from '../assets/trash-2.svg';

export function Task({ title }) {
  const task = useStore(state =>
    state.tasks.find(task => task.title === title)
  );
  const deleteTask = useStore(state => state.deleteTask);
  const setDraggedTask = useStore(state => state.setDraggedTask);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(title)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img onClick={() => deleteTask(title)} src={trash} />
        </div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  );
}

Task.propTypes = {
  title: PropTypes.string,
};
