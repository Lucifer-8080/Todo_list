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

  // Render tasks in tabular format
  let renderTask = (
    <tr>
      <td colSpan="6" className="text-center">No tasks available</td>
    </tr>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <tr key={i} className="border-b border-gray-200">
        <td className="p-3">
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => toggleCompletion(i)}
            className="h-6 w-6"
            aria-label={`Mark task "${t.title}" as completed`}
          />
        </td>
        <td className="p-3">{t.title}</td>
        <td className="p-3">{t.desc}</td>
        <td className="p-3">{t.priority}</td>
        <td className="p-3">{t.dueDate}</td>
        <td className="p-3">{t.category}</td>
        <td className="p-3">
          <span className={`font-semibold ${t.completed ? "text-green-500" : "text-red-500"}`}>
            {t.completed ? "Completed" : "Pending"}
          </span>
        </td>
        <td className="flex p-3">
          <button
            className="font-bold text-white shadow-lg hover:scale-110 rounded-xl transition-all duration-500 bg-gradient-to-t to-amber-300 via-black from-red-600 bg-size-200 hover:bg-left-bottom cursor-pointer sm:m-2 m-1 p-3"
            onClick={() => editHandler(i)}
            aria-label={`Edit task "${t.title}"`}
          >
            Edit
          </button>
          <button
            className=" font-bold text-white shadow-lg hover:scale-110 rounded-xl transition-all duration-500 bg-gradient-to-t to-lime-400 via-black from-red-500 bg-size-200 hover:bg-right-bottom cursor-pointer sm:m-2 m-1 p-3"
            onClick={() => deleteHandler(i)}
            aria-label={`Delete task "${t.title}"`}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <>
  <h1 className=" items-center text-center text-4xl sm:text-4xl font-extrabold dark:text-white bg-black p-4">My<span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">Todo</span><span >List</span></h1>

      <form className="max-w-7.5xl mx-auto border rounded-lg p-4 mb-8 shadow-sm">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Title"
              className="glass-input pr-10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Title"
            />
            <FontAwesomeIcon icon={faHeading} className="absolute right-3 top-5 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Description"
              className="glass-input pr-10"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
              placeholder="Category"
              className="glass-input pr-10"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
            />
            <FontAwesomeIcon icon={faTags} className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className=" mx-25">
             <button
          type="submit"
          className="sm:ml-25 sm:m-2 p-4 shadow-lg hover:scale-110 text-white rounded-xl transition-all duration-500 bg-gradient-to-br to-white via-black from-red-600 bg-size-200 hover:bg-right-bottom  font-bold"
          onClick={submitHandler}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
        </div>
      </form>

      <div className="max-w mx-2 ">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="py-3 px-4">Completed</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {renderTask}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
