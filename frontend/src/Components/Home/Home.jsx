import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL, HomeURLS } from '../../URLS'
import './home.css'
import NaveBar from './NaveBar'
import Ticket from './Ticket'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  const [userName, setUserName] = useState("")
  const [devName, setDevName] = useState([])
  const [ticketData, setTicketData] = useState([])
  const [count, setCount] = useState(0)
  const [buttonSubmit, setButtonSubmit] = useState(false)
  
  const navigate = useNavigate()
 
  async function fetchData() {
    await axios.get(`${baseURL}${HomeURLS.suburl}`, { withCredentials: true, })
    .then((data) => {
      setDevName(data.data.dev_data)
      setTicketData(data.data.ticket_data)
      setUserName(data.data.user.name)
      setCount(data.data.ticket_data.length + 1)
    })
    .catch((err) => {
      if (!err.response.data.success) {
        navigate("/login")
      }
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    fetchData()
  },[buttonSubmit])
  
  return (
    <>
      <div className="home_body d-flex justify-content-between">

        <NaveBar ticketData = {ticketData} />
        <Ticket setCount = {setCount}
                count = {count}
                userName = {userName}
                devName = {devName}
                setButtonSubmit = {setButtonSubmit}
                buttonSubmit = {buttonSubmit}
        />

      </div>

    </>
  )
}

export default Home