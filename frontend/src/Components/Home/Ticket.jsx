import React, { useState } from 'react'
import { baseURL, HomeURLS } from '../../URLS'
import axios from 'axios'
import { toast } from "react-toastify"
import penImg from "../../assets/pen.png"


const Ticket = (props) => {
  const {setCount, count, userName, devName ,setButtonSubmit, buttonSubmit} = props
  const [IssueName, setIssueName] = useState('')
  const [getIssueName, setGetIssueName] = useState(false)

  const increament =()=>{
    setCount((preCount)=>preCount + 1)
  }
  let sendForm = (e)=>{
    e.preventDefault()
    let dev_value = e.target[2].value
    let dev_id = dev_value.split(" ")[1]
    let payload = {
      "ticket_name" : e.target[0].value,
      "iris_id" : count,
      "jira_id" : count,
      "developer" : Number(dev_id),
      "description" : e.target[3].value,
      "date" : `${year}-${month}-${day}`,
      
    }
    axios.post(`${baseURL}${HomeURLS.suburl}`,payload, {withCredentials : true} )
    .then((data)=>{
      toast.success(data.data.message)
      setButtonSubmit(!buttonSubmit)
    })
    .catch((err)=>{
      toast.error(err.message)
    })
    .finally(()=>increament())
  }

  const date = new Date()
  const day = date.getDay()
  const month = date.getMonth() +1
  const year = date.getFullYear()


  return (
    <div>
      <form method='POST' onSubmit={(e) => sendForm(e)} className='d-flex justify-content-center align-items-center ps-4' style={{ height: "90vh" }}>
        <div className="home_main bg-light p-4 shadow rounded-start mt-5 " >

          <div >
            <h5 className='text-danger'>Hi {userName.toUpperCase()}, Welcome Back !</h5>
          </div>

          <div>
            <h6 className='opacity-75'>IRIS Ticket Id - JNJ {count}</h6>
            <p className='opacity-75'>Created Date - {day}/{month}/{year}</p>
          </div>

          <div className="home_form p-3 mx-5" >
            <div className="home_form_head px-5 mx-5 ms-4 d-flex flex-column">
              <label htmlFor="ticket_name">Ticket Issue :</label>
              <div>
              {IssueName?
                <input type='text' className='me-2' required></input> 
                :
                <input type="text" placeholder={"Enter Issue"} name='ticket_name'onChange={()=>setGetIssueName(e.target.value)} required  className='ticket_name d-inline-block mt-2 h6'/> 
              }
                <img src={penImg} alt="pen image" height={'14em'} onClick={()=>setIssueName((pre)=>!pre)} className='me-2' />
              </div>
            </div>

            <div className="home_input_field d-flex flex-column p-3">

              <div className="top_input_field d-flex">

                <div className="home_inp1 d-flex flex-column px-5 mx-3">
                  <label htmlFor="jira_id" className='mb-2 opacity-50'>JIRA Ticket id</label>
                  <input type="text" value={`JIR ${count}`} disabled className='ps-4' name='jira_id' />
                </div>

                <div className="home_inp2 d-flex flex-column px-5 mx-3">
                  <label htmlFor="developers" className='mb-2 opacity-50'>Assign</label>
                  <select id="developers" className=''>
                    {devName.map((val, index) => (
                      <option defaultValue={val} key={index}>{val.name.toUpperCase()} {val.id} </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="botton_input_field d-flex flex-column mt-4 px-5 mx-3">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows={4} required placeholder=''></textarea>
              </div>
            </div>

            <div className="home_btn d-flex justify-content-end me-5 pe-5 mt-4">
              <button type="submit" className='bg-danger text-light btn px-5'>Assign</button>
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}

export default Ticket