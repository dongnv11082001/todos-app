import React from 'react';
import styled from 'styled-components';

export const Tabs = ({type, setType}) => {
  const tabs = ['All', 'Active', 'Completed'];
  return (
    <Tab>
      {tabs.map((tab) => (
        <span
          className={type === tab ? 'active' : ''}
          key={tab}
          onClick={() => setType(tab)}
        >
          {tab}
        </span>
      ))}
    </Tab>
  );
};

const Tab = styled.div`
  margin-bottom: 8px;

  & span {
    margin-right: 0.5rem;
    border-radius: 20px;
    border: 2px solid #ff9900;
    padding: 0 10px;
    cursor: pointer;
  }
`;
