import React from 'react';
import styled from 'styled-components';

export const Tabs = ({
  currentTab,
  changeTab,
}: {
  currentTab: string;
  changeTab: (newTab: string) => void;
}) => {
  const tabs = ['All', 'Active', 'Complete'];
  return (
    <Tab>
      {tabs.map((tab) => (
        <span
          className={currentTab === tab ? 'active' : ''}
          key={tab}
          onClick={() => changeTab(tab)}
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
