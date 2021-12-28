import React from 'react';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const TodoItem = ({
  todo,
  handleComplete,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <List>
      <TextItem className={todo.completed ? 'line-through' : 'not-completed'}>
        {todo.text}
      </TextItem>
      <div>
        <CompleteButton onClick={() => handleComplete(todo)}>
          <CheckOutlined />
        </CompleteButton>
        <EditButton onClick={() => handleEditClick(todo)}>
          <EditOutlined />
        </EditButton>
        <DeleteButton onClick={() => handleDelete(todo.id)}>
          <DeleteOutlined />
        </DeleteButton>
      </div>
    </List>
  );
};

const List = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #444;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #333333;
`;

const TextItem = styled.h1`
  color: #ff9900;
`;

const Button = styled.button`
  background: #f5f6f7;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 1rem;
`;

const CompleteButton = styled(Button)`
  border: 1px solid green;
  & svg {
    color: green;
  }
`;

const EditButton = styled(Button)`
  border: 1px solid blue;
  & svg {
    color: blue;
  }
`;

const DeleteButton = styled(Button)`
  border: 1px solid red;
  & svg {
    color: red;
  }
`;
