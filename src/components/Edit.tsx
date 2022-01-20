import React from 'react';
import styled from 'styled-components';

type Props = {
  currentTodo: Todo;
  handleCancelEdit: () => void;
  handleEditInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleUpdate: (id: number | string, todo: Todo) => void;
};

export const Edit = ({
  currentTodo,
  handleCancelEdit,
  handleEditInputChange,
  handleUpdate,
}: Props) => {
  return (
    <Form>
      <h1>Edit todo</h1>
      <Input
        placeholder="Your todo here"
        value={currentTodo.text}
        onChange={handleEditInputChange}
      />
      <div>
        <Button onClick={() => handleUpdate(currentTodo.id, currentTodo)}>
          Update
        </Button>
        <Button onClick={handleCancelEdit}>Cancel</Button>
      </div>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #444;
  margin-bottom: 1rem;

  & h1 {
    color: #ff9900;
  }
`;

const Input = styled.input`
  outline: none;
  border-radius: 4px;
  border: 1px solid #ff9900;
  width: 300px;
  padding: 8px;
  margin-right: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 2px solid #ff9900;
  padding: 10px;
  margin: 4px;
  cursor: pointer;
  background-color: transparent;
  color: white;

  &:hover {
    background-color: #ff9900
  }
`;