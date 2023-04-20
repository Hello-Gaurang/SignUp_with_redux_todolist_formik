import React, { useState, useEffect } from 'react'
import { DsaStyle } from './style'
import { useDispatch } from 'react-redux'
import {
  addTask,
  deleTask,
  editTask,
  colorChange,
} from '../../redux/TodoList/action'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TodoList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((data) => data.SignUpReducer)
  const todoAppList = useSelector((data) => data.todoReducer)
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditIndex] = useState(undefined)
  const complited = todoAppList
    .filter((item) => item.color === '#005500')
    .map((item) => item.color)
  const InComplete = todoAppList
    .filter((item) => item.color === '#0000FF')
    .map((item) => item.color)
  console.log(complited)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) return setInputValue('')
    if (!inputValue) return
    if (editIndex === undefined) {
      const newtodos = [
        ...todos,
        { text: inputValue, color: '#0000FF', i: editIndex },
      ]
      setTodos(newtodos)
      dispatch(addTask(newtodos))
    } else {
      const newtodos = [...todos]
      newtodos[editIndex].text = inputValue
      setTodos(newtodos)
      dispatch(editTask(newtodos))
      setEditIndex(undefined)
    }
    setInputValue('')  
  }

  const handleDelete = (index) => {
    const newtodos = [...todos]
    newtodos.splice(index, 1)
    setTodos(newtodos)
    dispatch(deleTask(newtodos))
    if (editIndex === index) {
      setEditIndex(undefined)
      setInputValue('')
    } else if (editIndex > index) {
      setEditIndex(editIndex - 1)
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setInputValue(todos[index].text)
    dispatch(editTask(todos))
  }

  const handleColorChange = (index, color) => {
    const newtodos = [...todos]
    newtodos[index].color = color
    setTodos(newtodos)
    dispatch(colorChange(newtodos))
  }
  const login = data?.findIndex((x) => x.email && x.password) > -1
  useEffect(() => {
    if (login) {
      navigate('/signin')
    } else {
      navigate('/')
    }
  }, [])

  return (
    <DsaStyle>
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="minpt"
            type="text"
            placeholder="Add a new todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br />
          <button className="ibtn" type="submit">
            Add Task
          </button>
        </form>
        <div className="task-bar">
          <span>Total Task : {todos?.length}</span>
          <span>Complited Task : {complited.length}</span>
          <span>In-Complete Task : {InComplete.length}</span>
        </div>
        <hr />
      </div>
      <ul>
        {todoAppList?.map((todo, index) => (
          <li key={index}>
            <div
              className="map-container"
              style={{ backgroundColor: todo.color }}
            >
              <p>{todo.text}</p>
              <div className="allbtn">
                <button
                  className="btn"
                  style={{ backgroundColor: todo.color }}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: todo.color }}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <select
                  className="selector"
                  value={todo.color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                >
                  <option value="#005500">Completed</option>
                  <option value="#0000FF">InComplete</option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DsaStyle>
  )
}
export default TodoList
