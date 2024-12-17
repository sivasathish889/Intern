import React, { useEffect } from 'react'
import './login.css'
import {Link, useNavigate} from  'react-router-dom'
import axios from "axios"
import {baseURL, loginURLS} from "../../URLS"
import { toast } from 'react-toastify'
import {startAuthentication } from "@simplewebauthn/browser"

const Login = () => {
    const SERVER_URL = "http://localhost:8000"

  let navigate = useNavigate()
  let LoginJson;
  
  let sendForm =async (e) =>{
    e.preventDefault()
    let payLoad = {
      "username" : e.target[0].value,
      "password" : e.target[1].value
    }
    try {
              
    const initResponse = await fetch(`${SERVER_URL}/init-login?username=${payLoad.username}&password=${payLoad.password}`, {
      credentials: "include",
    })
    const options = await initResponse.json()
    if (!initResponse.ok) {
      console.log(options.error)
    }
  
    // 2. Get passkey
    const authJSON = await startAuthentication({
       optionsJSON : options
    })

    await axios.post(`${SERVER_URL}/verify-login`,authJSON,{withCredentials : true, headers : { "Content-Type": "application/json"}})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

      }
    catch(err){
      console.log(err)
    }

  }

  return (
      <div className='login_body d-flex justify-content-end align-items-center'>
      <div className="form bg-light p-5 d-inline-block me-5 rounded-3 shadow-lg">
        <form action="" method="POST" onSubmit={(e)=>sendForm(e)}>
            <div className="login_head d-flex justify-content-center">
                <h1 className='text-danger'>J  &  J</h1>
            </div>
            <div >
              <span className='border border-danger d-flex'></span>
              <div className="login_sec_head text-danger bg-light px-1 d-inline-block fw-medium ">Smart App</div>
            </div>
            <div className="login_username d-flex flex-column">
              <label htmlFor="username" className='fw-normal opacity-50 '>Username</label>
              <input type="text" name="username" className='rounded-3 mt-1' required/>
            </div>
            <div className="login_password d-flex flex-column mt-3">
              <label htmlFor="password" className='fw-normal opacity-50'>Password</label>
              <input type="password" name="password" className='rounded-3 mt-1' required/>
            </div>

            <p className='mt-2 ms-2' style={{fontSize:"14px"}}>If you dont have registered. Please <Link to={'/register'} className='text-danger'>Register</Link> </p>

            <div className="login_btn d-flex justify-content-center mt-3">
              <button type="submit" className='btn btn-danger text-light px-5'>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login