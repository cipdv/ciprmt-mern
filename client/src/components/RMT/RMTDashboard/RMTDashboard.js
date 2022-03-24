import React from 'react'
import DashboardUpdates from './DashboardUpdates/DashboardUpdates'
import Patients from './Patients'
import styles from './rmtdashboard.module.css'
import SearchProfiles from './SearchProfiles'
 
const RMTDashboard = () => {   

    //when dashboard loads, go through google auth flow to get accesstoken to be able to update calendar

    return (
        <div>
            <div className={styles.box}>
                <SearchProfiles />
                <Patients />
            </div>
            <div className={styles.box}>    
                <DashboardUpdates />     
            </div>
            
        </div>
    )
}

export default RMTDashboard
