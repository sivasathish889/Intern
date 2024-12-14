import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes >

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App