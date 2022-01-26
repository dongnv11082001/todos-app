import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Add } from './components/Add';
import { Edit } from './components/Edit';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: '',
    text: '',
    complete: false,
  });
  const refInput = useRef<HTMLInputElement>(null);

  const url: string = 'https://61cc6e98198df60017aec083.mockapi.io/todos'

  useEffect(() => {
    axios
      .get(url)
      .then((todos) => setTodos(todos.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent, todo: string) => {
    e.preventDefault()
    if (!todo) {
      alert('Empty todo');
      return;
    }
    await axios
      .post(url, {
        text: todo,
      })
      .then((res) => setTodos([...todos, res.data]));

    setTodo('');
    refInput.current?.focus();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  const handleEditInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, text: e.currentTarget.value });
  };

  const handleDelete = (id: number | string) => {
    axios.delete(`${url}/${id}`);

    const filterTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filterTodos);
  };

  const handleEditClick = (todo: Todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleUpdate = (id: number | string, currentTodo: Todo) => {
    axios.put(`${url}/${id}`, {
      ...currentTodo,
    });

    const updateTodos = todos.map((todo) => {
      return todo.id === id ? currentTodo : todo;
    });

    setIsEditing(false);
    setTodos(updateTodos);
  };

  const handleComplete = (todo: Todo) => {
    setTodos(
      todos.map((item) => {
        return todo.id === item.id
          ? { ...item, complete: !item.complete }
          : item;
      })
    );

    axios.put(`${url}/${todo.id}`, {
      ...todo,
      complete: true,
    });
  };

  return (
    <div>
      <Header />
      {isEditing ? (
        <Container>
          <Edit
            currentTodo={currentTodo}
            handleCancelEdit={handleCancelEdit}
            handleUpdate={handleUpdate}
            handleEditInputChange={handleEditInputChange}
          />
        </Container>
      ) : (
        <Container>
          <Add
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            todo={todo}
          />
          <TodoList
            todos={todos}
            handleComplete={handleComplete}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        </Container>
      )}
    </div>
  );
}

export default App;

const Container = styled.div`
  max-width: 728px;
  margin: 2rem auto;
  color: white;
`;
