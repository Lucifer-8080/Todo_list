"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() && !desc.trim()) {
      setError('Title and Description cannot be blank');
      return;
    }
    if (!title.trim()) {
      setError('Title cannot be blank');
      return;
    }

    if(!desc.trim()){
      setError('Description cannot be blank');
      return;
    }

    if (isEditing) {
      const updatedTasks = mainTask.map((task, index) => 
        index === currentTaskIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }

    setTitle('');
    setDesc('');
    setError('');
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setIsEditing(true);
    setCurrentTaskIndex(i);
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = (
      <>
        <li className="flex items-center justify-between mb-5 font-bold">
          <div className="flex justify-between w-2/3">
            <h3 className="font-semibold text-2xl ml-6">Title</h3>
            <h4 className="font-semibold text-xl text-neutral-900 ">Description</h4>
          </div>
          <div>
            <span className="text-2xl"></span>
          </div>
        </li>
        {mainTask.map((t, i) => (
          <li key={i} className="flex items-center justify-between mb-5">
            <div className="flex justify-between w-2/3">
              <h3 className="font-semibold text-2xl ml-8">{t.title}</h3>
              <h4 className="font-semibold text-lg mr-9">{t.desc}</h4>
            </div>
            <div>
              <button
                className="bg-black text-white font-bold text-center p-2 rounded m-3"
                onClick={() => editHandler(i)}
              >
                Edit
              </button>
              <button
                className="bg-black text-white font-bold text-center p-2 rounded m-3"
                onClick={() => deleteHandler(i)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      <h1 className="p-3 bg-black text-white text-center font-bold text-3xl">My Todo List</h1>

      <form className="text-center" onSubmit={submitHandler}>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Enter the Title Here"
          className="rounded border-black border-4 m-10 text-xl text-center border-solid"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter the Description Here"
          className="rounded border-black border-4 m-10 text-xl text-center border-solid"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <button className="text-white bg-black rounded border-4 m-9 font-bold text-center border-solid p-2">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <hr />

      <div className="p-7 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
