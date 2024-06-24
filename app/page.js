"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faAlignLeft, faExclamationCircle, faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import './globals.css'; // Import custom CSS

const Page = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [error, setError] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setMainTask(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Input validation
    if (!title.trim()) {
      setError("Title cannot be blank");
      return;
    }

    if (!desc.trim()) {
      setError("Description cannot be blank");
      return;
    }

    if (!priority.trim()) {
      setError("Priority cannot be blank");
      return;
    }

    if (!dueDate.trim()) {
      setError("Due Date cannot be blank");
      return;
    }

    if (!category.trim()) {
      setError("Category cannot be blank");
      return;
    }

    // Update existing task or add a new task
    if (isEditing) {
      const updatedTasks = mainTask.map((task, index) =>
        index === currentTaskIndex
          ? { title, desc, priority, dueDate, category, completed: task.completed }
          : task
      );
      setMainTask(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc, priority, dueDate, category, completed: false }]);
    }

    // Reset form fields
    setTitle("");
    setDesc("");
    setPriority("Low");
    setDueDate("");
    setCategory("");
    setError("");
  };

  // Handle task deletion
  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  // Handle task editing
  const editHandler = (i) => {
    const task = mainTask[i];
    setTitle(task.title);
    setDesc(task.desc);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setCategory(task.category);
    setIsEditing(true);
    setCurrentTaskIndex(i);
  };

  // Toggle task completion status
  const toggleCompletion = (i) => {
    const updatedTasks = mainTask.map((task, index) =>
      index === i ? { ...task, completed: !task.completed } : task
    );
    setMainTask(updatedTasks);
  };

  // Render tasks
  let renderTask = <h2 className="text-center">No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = (
      <>
        <li className="flex flex-col sm:flex-row items-center justify-between mb-5 font-bold">
          <div className="flex justify-between w-full sm:w-2/3 text-violet-700">
            <h3 className="font-semibold text-lg sm:text-3xl ml-2 sm:ml-6 text-violet-700">Title</h3>
            <h4 className="font-semibold text-md sm:text-3xl text-violet-700">Description</h4>
            <h4 className="font-semibold text-md sm:text-3xl text-violet-700">Priority</h4>
            <h4 className="font-semibold text-md sm:text-3xl text-violet-700">Due Date</h4>
            <h4 className="font-semibold text-md sm:text-3xl text-violet-700">Category</h4>
          </div>
        </li>
        {mainTask.map((t, i) => (
          <li key={i} className="flex flex-col sm:flex-row items-center justify-between mb-5">
            <div className="flex flex-col sm:flex-row justify-between w-full sm:w-2/3">
              <h3
                className={`font-semibold text-lg sm:text-2xl ml-2 sm:ml-8 ${
                  t.completed ? "text-red-600 line-through" : ""
                }`}
              >
                {t.title}
              </h3>
              <h4
                className={`font-semibold text-md sm:text-2xl mr-2 sm:mr-9 ${
                  t.completed ? "text-red-500 line-through" : ""
                }`}
              >
                {t.desc}
              </h4>
              <p className={`font-semibold text-lg sm:text-2xl ml-2 sm:ml-8 ${t.completed ? "text-red-500 line-through" : ""}`}>
                {t.priority}
              </p>
              <p className={`font-semibold text-lg sm:text-2xl ml-2 sm:ml-8 ${t.completed ? "text-red-500 line-through" : ""}`}>
                {t.dueDate}
              </p>
              <p className={`font-semibold text-lg sm:text-2xl ml-2 sm:ml-8 ${t.completed ? "text-red-500 line-through" : ""}`}>
                {t.category}
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompletion(i)}
                className="mr-1 sm:mr-3 w-6 h-6 sm:w-10 sm:h-10"
                aria-label={`Mark task "${t.title}" as completed`}
              />
              <button
                className=" text-white shadow-lg hover:scale-110 rounded-xl transition-all duration-500 bg-gradient-to-t to-amber-300 via-black from-red-600 bg-size-200 hover:bg-left-bottom cursor-pointer sm:m-2 m-1 p-3 "
                onClick={() => editHandler(i)}
                aria-label={`Edit task "${t.title}"`}
              >
                Edit
              </button>
              <button
                className="text-white shadow-lg hover:scale-110 rounded-xl transition-all duration-500 bg-gradient-to-t to-lime-400 via-black from-red-500 bg-size-200 hover:bg-right-bottom cursor-pointer sm:m-2 m-1 p-3"
                onClick={() => deleteHandler(i)}
                aria-label={`Delete task "${t.title}"`}
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
      {/* <h1 className="p-3 bg-black text-white text-center font-bold text-2xl sm:text-3xl">
        My Todo List
      </h1> */}

      
<h1 className=" items-center text-center text-4xl sm:text-4xl font-extrabold dark:text-white bg-black p-4">My<span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">Todo</span><span >List</span></h1>


      <form className="glass-form text-center" onSubmit={submitHandler}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter the Title Here"
            className="glass-input pr-10"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            aria-label="Title"
          />
          <FontAwesomeIcon icon={faHeading} className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter the Description Here"
            className="glass-input pr-10"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            aria-label="Description"
          />
          <FontAwesomeIcon icon={faAlignLeft} className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            className="glass-input pr-10"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Priority"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          git 
        </div>

        <div className="relative">
          <input
            type="date"
            className="glass-input pr-10"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due Date"
          />
        
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter the Category Here"
            className="glass-input pr-10"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
          />
          <FontAwesomeIcon icon={faTags} className="absolute right-3 top-3 text-gray-400" />
        </div>

        <button className="m-2 p-4 shadow-lg hover:scale-110 text-white rounded-xl transition-all duration-500 bg-gradient-to-br to-white via-black from-red-600 bg-size-200 hover:bg-right-bottom sm:m-4">
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </form>

      <hr />

      <div className="p-4 sm:p-7 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
