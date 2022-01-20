import React from 'react';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// import { CRUDContext } from '../App';

type Props = {
  todo: Todo;
  handleComplete: (todo: Todo) => void;
  handleEditClick: (todo: Todo) => void;
  handleDelete: (id: number | string) => void;
};

export const TodoItem = ({
  todo,
  handleComplete,
  handleEditClick,
  handleDelete,
}: Props) => {

  return (
    <List>
      <TextItem className={todo.complete ? 'line-through' : 'not-completed'}>
        {todo.text}
      </TextItem>
      <div>
        <CompleteButton
          onClick={() => handleComplete(todo)}
          className={todo.complete ? 'hide-button' : ''}
        >
          <CheckOutlined />
        </CompleteButton>
        <EditButton
          onClick={() => handleEditClick(todo)}
          className={todo.complete ? 'hide-button' : ''}
        >
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

const TextItem = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: #f5f6f7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 1rem;
`;

const CompleteButton = styled(Button)`
  border: 2px solid green;
  & svg {
    color: green;
  }
`;

const EditButton = styled(Button)`
  border: 2px solid blue;
  & svg {
    color: blue;
  }
`;

const DeleteButton = styled(Button)`
  border: 2px solid red;
  & svg {
    color: red;
  }
`;
