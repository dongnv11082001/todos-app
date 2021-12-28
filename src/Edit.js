import React from 'react';

export const Edit = ({
  currentJob,
  setIsEditing,
  handleEditInputChange,
  handleUpdate,
}) => {
  return (
    <div>
      <h1>Edit todo</h1>
      <label>Edit todo: </label>
      <input
        placeholder="Edit job"
        value={currentJob.text}
        onChange={handleEditInputChange}
      />
      <button onClick={() => handleUpdate(currentJob.id, currentJob)}>
        Update
      </button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  );
};
