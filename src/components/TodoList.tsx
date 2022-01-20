import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { Tabs } from './Tabs';

type Props = {
  todos: Todo[];
  handleComplete: (todo: Todo) => void;
  handleEditClick: (todo: Todo) => void;
  handleDelete: (id: number | string) => void;
};

export const TodoList = ({
  todos,
  handleComplete,
  handleEditClick,
  handleDelete,
}: Props) => {
  const [tab, setTab] = useState('All');

  const changeTab = (newTab: string) => {
    setTab(newTab);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (tab) {
      case 'All':
        return true;
      case 'Active':
        return todo.complete === false;
      case 'Complete':
        return todo.complete === true;
      default:
        return true;
    }
  });

  return (
    <>
      <Tabs currentTab={tab} changeTab={changeTab} />
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleComplete={handleComplete}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        );
      })}
    </>
  );
};
