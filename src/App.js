import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Add } from './components/Add';
import { Edit } from './components/Edit';

function App() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    axios
      .get('https://61cc6e98198df60017aec083.mockapi.io/todos')
      .then((todos) => setTodos(todos.data));
  }, []);

  const handleSubmit = async (todo) => {
    await axios
      .post('https://61cc6e98198df60017aec083.mockapi.io/todos', {
        text: todo,
      })
      .then((res) => setTodos([...todos, res.data]));
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleDelete = (id) => {
    axios.delete(`https://61cc6e98198df60017aec083.mockapi.io/todos/${id}`);

    const filterTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filterTodos);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleUpdate = (id, item) => {
    axios.put(`https://61cc6e98198df60017aec083.mockapi.io/todos/${id}`, {
      item,
    });

    const updateTodos = todos.map((todo) => {
      return todo.id === id ? item : todo;
    });

    setIsEditing(false);
    setTodos(updateTodos);
  };

  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        return todo.id === item.id
          ? { ...item, complete: !item.complete }
          : item;
      })
    );

    axios.put(`https://61cc6e98198df60017aec083.mockapi.io/todos/${todo.id}`, {
      ...todo,
      complete: true,
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
          <Add handleSubmit={handleSubmit} />
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
