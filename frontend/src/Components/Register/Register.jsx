import React, { useEffect } from 'react'
import './register.css'
import {Link,useNavigate} from  'react-router-dom'
import axios from 'axios'
import { baseURL, registerURLS } from '../../URLS'
import {toast} from "react-toastify"
import { startRegistration } from "@simplewebauthn/browser"


const Register = () => {
  const navigate = useNavigate()
  const sendFrom = async(e)=>{
    e.preventDefault()
    const payload = {
      "username" : e.target[0].value,
      "email" : e.target[1].value,
      "password" : e.target[2].value,
      "c_password" : e.target[3].value
    }
    try {
      await axios.post(`${baseURL}/init-register`, payload, { withCredentials: true })
        .then(async (data) => {
          let registerJson = await startRegistration({
            optionsJSON: data.data
          })
          await axios.post(`${baseURL}/verify-register`, { "registerJson": registerJson }, { withCredentials: true, headers: { "Content-Type": "application/json" } })
            .then((data) =>{ 
              
              toast.success(data?.data?.message) 
            })
            .catch((err) => { 
              toast.error(err?.response?.data?.message) 
            })
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
  
        })

        axios.post(`${baseURL}${registerURLS.suburl}`, payload, { withCredentials: true })
        .then((data) => {
          if(data?.data?.success){
            navigate('/login')
            toast.success(data?.data?.message)
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        })

    }  catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='register_body d-flex justify-content-end align-items-center'>
      <div className="form bg-light p-5 d-inline-block me-5 rounded-3 shadow-lg">
        <form action="" method="POST" onSubmit={(e)=>sendFrom(e)}>
            <div className="register_head d-flex justify-content-center">
                <h1 className='text-danger'>J  &  J</h1>
            </div>
            <div >
              <span className='border border-danger d-flex'></span>
              <div className="register_sec_head text-danger bg-light px-1 d-inline-block fw-medium ">Smart App</div>
            </div>

            <div className="register_username d-flex flex-column">
              <label htmlFor="username" className='fw-normal opacity-50 '>Username</label>
              <input type="text" name="username" className='rounded-3 mt-1' required/>
            </div>

            <div className="register_email d-flex flex-column mt-2">
              <label htmlFor="email" className='fw-normal opacity-50 '>Email</label>
              <input type="text" name="email" className='rounded-3 mt-1' required/>
            </div>

            <div className="register_password d-flex flex-column mt-2">
              <label htmlFor="password" className='fw-normal opacity-50'>Password</label>
              <input type="password" name="password" className='rounded-3 mt-1' required/>
            </div>

            <div className="register_c_password d-flex flex-column mt-2">
              <label htmlFor="c_password" className='fw-normal opacity-50'>Confrim password</label>
              <input type="password" name="c_password" className='rounded-3 mt-1' required/>
            </div>
            <p className='mt-3 ms-2' style={{fontSize:"14px"}}>If you already registered. <Link to={'/login'} className='text-danger'>Login</Link> </p>
            <div className="register_btn d-flex justify-content-center mt-4">
              <button type="submit" className='btn btn-danger text-light px-5'>Register</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register