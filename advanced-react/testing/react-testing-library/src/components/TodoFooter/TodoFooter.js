import React from 'react';
import './TodoFooter.css';
import { Link } from 'react-router-dom';

export default function TodoFooter({ numberOfIncompleteTasks }) {
  return (
    <div className="todo-footer">
      <p>
        {numberOfIncompleteTasks}{' '}
        {numberOfIncompleteTasks === 1 ? 'task' : 'tasks'} left
      </p>
      <Link to="/followers">Followers</Link>
    </div>
  );
}
