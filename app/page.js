"use client"
import React, { useState } from 'react'

const page = () => {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e)=>{
    e.preventDefault();

    setTitle("");
    setDesc("");
    setMainTask([...mainTask,{title,desc}]);

  };

const deleteHandler = (i) =>{
  let copytask = [...mainTask];
copytask.splice(i,1);
  setMainTask(copytask);
}

  let renderTask = <h2>No Task Available</h2>;

  if(mainTask.length > 0) {
    renderTask = mainTask.map((t,i)=>{
      return    <li key={i} className='flex items-center justify-between '>
        <div className='flex justify-between mb-5 w-2/3'>
        <h3 className='font-semibold  text-2xl'>{t.title}</h3>
        <h4 className='font-semibold  text-lg'>{t.desc}</h4>
      </div>
      <button className='bg-black text-white font-bold text-center p-2 rounded m-3' 
      onClick={()=>{
        deleteHandler(i);
      }} >Delete</button>
      </li>
    });

  }

  return (
    <>
    <h1 className='p-3 bg-black text-white text-center font-bold text-3xl'>My Todo List</h1>

    <form className='text-center' onSubmit={submitHandler}>
      <input type="text" placeholder='Enter the Title Here' className='rounded border-black border-4 m-10 text-xl text-center border-solid '
      value={title}
      onChange={(e)=>{
        setTitle(e.target.value);

      }}
      />


      <input type="text" placeholder='Enter the Description Here' className='rounded border-black border-4 m-10 text-xl text-center border-solid '
      value={desc}
      onChange={(e)=>{
        setDesc(e.target.value);

      }}
      />


   <button className='text-white bg-black rounded border-4 m-9 font-bold text-center border-solid p-2'>Add Task</button>


    </form>

<hr/>

      <div className='p-7  bg-slate-300'>
      <ul>{renderTask}</ul>
      </div>
    
    </>
  )
}

export default page;