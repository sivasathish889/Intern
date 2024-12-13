import React, { useState } from 'react'
import greenDot from "../../assets/processing images/green.png"
import grayDot from "../../assets/processing images/gray.png"
import orangeDot from "../../assets/processing images/orange.png"

const NaveBar = (props) => {
    const {ticketData} = props
    const [onClicked, setOnClicked] = useState(1)
  return (
    <div>
      <div className="home_navbar d-inline-block mt-5">

        <div className="home_head bg-light shadow-lg rounded-end d-flex flex-column align-items-center justify-content-between">

          <div className="home_top">
            <h1 className='text-danger d-flex justify-content-center'>J & J</h1>
            <div >
              <span className='border border-danger d-flex w-50' style={{position:"relative", left:"3.8em"}}></span>
              <div className="home_sec_head text-danger bg-light px-1 d-inline-block fw-medium ">Smart App</div>
            </div>

            <ul className='fw-normal opacity-75 ' style={{ fontSize: '.8em' }}>
              {ticketData.map((val, index) => (
                <li key={index} className={onClicked==val.id ?"nav_li_active":""} id='nav_listItem' onClick={()=>(setOnClicked(val.id))} >
                  {val.status == 0 ?
                  <img src={grayDot} alt="gray dot"  height={'7em'} className={onClicked==val.id ? "dot_active" :"me-1" }/> :
                  val.status == 1 ?
                  <img src={orangeDot} alt="orange dot"  height={'7em'} className={onClicked==val.id ? "dot_active" :"me-1" }/> :

                  <img src={greenDot} alt="green dot"  height={'7em'} className={onClicked==val.id ? "dot_active" :"me-1" }/> 
                  
                  }
                  JIRA Ticket #{val.id}</li>
              ))}
            </ul>

          </div>

          <div className="home_bottom d-flex flex-column p-1">

            <div className="home_processing">
              <ul className='d-flex'>
                <li className=''>    
                    <img src={grayDot} alt="gray Dot" srcSet="" height={'7em'} className='me-1' />
                    Not Started
                </li>
                <li className=''>
                <img src={orangeDot} alt="green Dot" srcSet="" height={'7em'} className='me-1' />
                  Processing
                </li>
                <li>
                <img src={greenDot} alt="green Dot" srcSet="" height={'7em'} className='me-1' />
                  Completed
                </li>
              </ul>
            </div>

            <div className="home_profile d-flex">
              <img src="" alt="" srcSet="" />

              <div className="home_profile_content ms-3" style={{ fontSize: ".6em" }}>
                <h6> Siva Sathish</h6>
                <p className='opacity-50'>Settings </p>
              </div>
            </div>

          </div>

        </div>


      </div>
    </div>
  )
}

export default NaveBar