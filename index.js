import React from 'react';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './style.css';

const tasks = [{ title: 'test title', description: 'test desc', done: false }];

function AddTask(props) {
  const [task, setTask] = useState({ title: '', description: '', done: false });

  function handleChange(e) {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    if (task.title !== '') {
      props.handleSubmit(task);

      setTask({ title: '', description: '', done: false });
    }
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*
      <div className="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Add a new task..."
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={handleChange}
          value={task.title}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          Add!
        </button>
      </div>
      */}

      <div className="mb-3 d-flex align-items-center ">
        <div className=" p-2">
          <label htmlFor="inputTitle" className="form-label">
            Task title*
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="inputTitle"
            aria-describedby="taskTitleInput"
            required
            onChange={handleChange}
            value={task.title}
            name="title"
          />
        </div>
        <div className="p-2 flex-grow-1">
          <label htmlFor="inputDescription" className="form-label">
            Task description (optional)
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="inputDescription"
            onChange={handleChange}
            value={task.description}
            name="description"
          />
        </div>
        <div className=" ms-auto p-2 align-self-end">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            style={{ height: '50px' }}
          >
            Add!
          </button>
        </div>
      </div>
    </form>
  );
}

function TodoList(props) {
  const [tasks, setTask] = useState(props.data);

  function addTask(task) {
    setTask([...tasks, task]);
  }

  return (
    <div className="common-750">
      <AddTask handleSubmit={addTask} />
      <TaskList data={tasks} />
    </div>
  );
}

function Todo(props) {
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center "
      key={props.key}
    >
      <input
        className="form-check-input task-checkbox"
        type="checkbox"
        value=""
        checked={props.done}
      />
      <div className="ms-2 me-auto ">
        <div className="fw-bold ">{props.title}</div>
        {props.description}
      </div>
      <a href="">
        <i className="fa-solid fa-xmark"></i>
      </a>
    </li>
  );
}

function TaskList(props) {
  const arr = props.data;

  const listItems = arr.map(({ title, description, done }, index) => (
    <Todo title={title} description={description} done={done} key={index} />
  ));
  return <ul className="list-group">{listItems}</ul>;
}

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <TodoList data={tasks} />
    </>
  );
}

const el = <App />;

ReactDOM.render(el, document.getElementById('root'));
