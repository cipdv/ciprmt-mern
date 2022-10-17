import React from 'react'
import './loadingspinner.css'
import loadingspinner from '../../../../images/greenloader.gif'
import loadingBars from '../../../../images/Pulse-1.4s-200px.gif'
import { useSelector } from 'react-redux'

const LoadingSpinner = () => {

  const loading = useSelector((state)=>state?.authReducer?.loading)

  if(!loading) {
    return null
  }

  return (
    <div class="loader-container">
      <div className="loader">
          <img src={loadingBars} />
      </div>
  </div>
  )
}

export default LoadingSpinner