import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './Container/SignIn'
import SignUp from './Container/SignUp'
import TodoList from './Container/TodoList'

function App() {
  return (
    <div>
    <div className='bg-Image'></div>
      <BrowserRouter>
        <Routes>
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="todolist" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
