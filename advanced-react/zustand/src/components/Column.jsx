import './Column.css';
import PropTypes from 'prop-types';
import { Task } from './Task';
import { useStore } from '../store';
import { useState } from 'react';
import classNames from 'classnames';

export function Column({ state }) {
  const [title, setTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(store =>
    store.tasks.filter(task => task.state === state)
  );

  const addTask = useStore(store => store.addTask);
  const draggedTask = useStore(store => store.draggedTask);
  const setDraggedTask = useStore(store => store.setDraggedTask);
  const movieTask = useStore(store => store.moveTask);

  const submitHandler = () => {
    addTask(title, state);
    setOpenModal(false);
    setTitle('');
  };

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={e => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        if (draggedTask) movieTask(draggedTask, state);
        setDrop(false);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpenModal(true)}>Add</button>
      </div>
      {tasks.map(({ title }, i) => (
        <Task key={i} title={title} />
      ))}
      {openModal && (
        <div className="Modal">
          <form className="modalContent">
            <input
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <button type="submit" onClick={submitHandler}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

Column.propTypes = {
  state: PropTypes.string,
};
