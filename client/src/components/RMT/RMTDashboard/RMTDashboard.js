import React from 'react'
import Patients from './Patients'
import styles from './rmtdashboard.module.css'
import SearchProfiles from './SearchProfiles'
 
const RMTDashboard = () => {   

    return (
        <div>
            <div className={styles.box}>
                <SearchProfiles />
                <Patients />
            </div>
            <div className={styles.box}>
                <h3 >Welcome :D</h3>
                <h5>Upcoming appointments</h5>
                <h5>Unfinished appointment notes</h5>
            </div>
            
        </div>
    )
}

export default RMTDashboard
