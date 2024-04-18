import React, { useState } from 'react'
import './CategoriesBar.css'
import {useDispatch} from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../actions/videos.action'

const keywords=["ALL","React","Football","Cinema","Cricket","IPL","KL Rahul","Kohli","Art","India","Politics","Elections","Fun","Videos","Entertainment","Talent","Series","Songs","Dance"]
const CategoriesBar = () => {
  const[activeElement,setActiveElement]=useState("")
  const dispatch =useDispatch();
  const handleClick=(value)=>{
    setActiveElement(value)
    if(value==="ALL")
    {
      dispatch(getPopularVideos())
    }
    else{

      dispatch(getVideosByCategory(value))
    }
  }
  return (
    <div className='Cat-Container d-flex overflow-x-scroll ' >
      {
        keywords.map((value,index)=>(
          <span onClick={()=>handleClick(value)}
          className={`${activeElement===value?"active":""}  Cat-span`}
          key={index}>{value}</span>
        ))
      }
    </div>
  )
}

export default CategoriesBar