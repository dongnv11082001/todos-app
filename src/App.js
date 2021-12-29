import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Add } from './components/Add';
import { Edit } from './components/Edit';

function App() {
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
    const filterTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filterTodos);
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
