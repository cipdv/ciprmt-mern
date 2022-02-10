import React from 'react'
import './loadingspinner.css'
import loadingspinner from '../../../../images/greenloader.gif'
import { useSelector } from 'react-redux'

const LoadingSpinner = () => {

  const loading = useSelector((state)=>state?.authReducer?.loading)

  if(!loading) {
    return null
  }

  return (
    <div class="loader-container">
      <div className="loader">
          <img src={loadingspinner} />
      </div>
  </div>
  )
}

export default LoadingSpinner