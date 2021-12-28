import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Add } from './Add';
import { Edit } from './Edit';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = () => {
    setTodos((prev) => [
      ...prev,
      {
        completed: false,
        text: todo.trim(),
        id: todos.length + 1,
      },
    ]);

    setTodo('');
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleDelete = (id) => {
    const filtertodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filtertodos);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleUpdate = (id, updatedtodo) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updatedtodo : todo;
    });

    setIsEditing(false);
    setTodos(updateItem);
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        return todo.id === item.id
          ? { ...item, completed: !item.completed }
          : item;
      })
    );
  };

  return (
    <>
      {isEditing ? (
        <Container>
          <Edit
            currentTodo={currentTodo}
            setIsEditing={setIsEditing}
            handleUpdate={handleUpdate}
            handleEditInputChange={handleEditInputChange}
          />
        </Container>
      ) : (
        <Container>
          <h1>TODOS</h1>
          <Add
            todo={todo}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
          {todos.map((todo) => {
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
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  max-width: 728px;
  margin: 4rem auto;
  color: white;

  & h1 {
    text-align: center;
    margin: 1rem 0;
  }
`;
