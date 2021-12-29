import React, {useState} from 'react';
import { TodoItem } from './TodoItem';
import { Tabs } from './Tabs';

export const TodoList = ({
  todos,
  handleDelete,
  handleComplete,
  handleEditClick,
}) => {
  const [type, setType] = useState('All');

  const filters = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  };
  
  return (
    <>
      <Tabs type={type} setType={setType} />
      {todos.filter(filters[type]).map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            handleEditClick={handleEditClick}
          />
        );
      })}
    </>
  );
};
