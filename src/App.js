import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Add } from './components/Add';
import { Edit } from './components/Edit';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        'https://61cc6e98198df60017aec083.mockapi.io/todos'
      );
      const todos = await response.json();
      setTodos(todos);
    };
    fetchApi();
  }, []);

  const handleSubmit = async () => {
    const response = await fetch(
      'https://61cc6e98198df60017aec083.mockapi.io/todos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: todo }),
      }
    );
    const todos = await response.json();
    setTodos((prev) => [...prev, todos]);
    setTodo('');
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleDelete = (id) => {
    fetch(`https://61cc6e98198df60017aec083.mockapi.io/todos/${id}`, {
      method: 'DELETE',
    });

    const filterTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filterTodos);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleUpdate = (id, updatedTodo) => {
    fetch(`https://61cc6e98198df60017aec083.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    const updateItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updateItem);
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        return todo.id === item.id
          ? { ...item, complete: !item.complete }
          : item;
      })
    );

    fetch(`https://61cc6e98198df60017aec083.mockapi.io/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, complete: true }),
    });
  };

  const value = {
    handleComplete,
    handleEditClick,
    handleDelete,
  };

  return (
    <div>
      <Header />
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
          <Add
            todo={todo}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
          <CRUDContext.Provider value={value}>
            <TodoList todos={todos} />
          </CRUDContext.Provider>
        </Container>
      )}
    </div>
  );
}
export const CRUDContext = createContext();

export default App;

const Container = styled.div`
  max-width: 728px;
  margin: 2rem auto;
  color: white;
`;
