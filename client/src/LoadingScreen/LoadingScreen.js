import React from 'react'
import './loadingScreen.css'
import loadingspinner from '../images/loadingspinner.gif'
import loadingWedges from '../images/Wedges-6.3s-197px.gif' 
import { useSelector } from 'react-redux'

const LoadingScreen = () => {

  const loading = useSelector((state)=>state?.loadingReducer?.loading)

  if (!loading) {
    return null
  }

  return (
    <div class="loader-container">
      <div className="loader">
          <img src={loadingWedges} />
      </div>
  </div>
  )
}

export default LoadingScreen