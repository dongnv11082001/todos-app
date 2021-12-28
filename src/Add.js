import React, { useEffect, useState } from 'react';
import { Edit } from './Edit';

export const Add = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      return JSON.parse(savedJobs);
    } else {
      return [];
    }
  });

  const [job, setJob] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState({});

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = () => {
    setJobs([
      ...jobs,  
      {
        id: jobs.length + 1,
        text: job.trim(),
        completed: false
      },
    ]);

    setJob('');
  };

  const handleEditInputChange = (e) => {
    setCurrentJob({ ...currentJob, text: e.target.value });
  };

  const handleDelete = (id) => {
    const filterJobs = jobs.filter((job) => {
      return job.id !== id;
    });
    setJobs(filterJobs);
  };

  const handleEditClick = (job) => {
    setIsEditing(true);
    setCurrentJob({ ...job });
  };

  const handleUpdate = (id, updatedJob) => {
    const updateItem = jobs.map((job) => {
      return job.id === id ? updatedJob : job;
    });

    setIsEditing(false);
    setJobs(updateItem);
  };

  const handleCompleteJob = (updatedJob) => {
    const updateItem = jobs.map(job => {
      return job.completed ? updatedJob : job
    })
    setJobs(updateItem)
  };

  return (
    <>
      {isEditing ? (
        <Edit
          currentJob={currentJob}
          setIsEditing={setIsEditing}
          handleEditInputChange={handleEditInputChange}
          handleUpdate={handleUpdate}
        />
      ) : (
        <div>
          <input value={job} onChange={(e) => setJob(e.target.value)} />
          <button onClick={handleSubmit}>Add</button>
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                {job.text}
                <button onClick={() => handleCompleteJob(job)}>Complete</button>
                <button onClick={() => handleEditClick(job)}>Edit</button>
                <button onClick={() => handleDelete(job.id)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
