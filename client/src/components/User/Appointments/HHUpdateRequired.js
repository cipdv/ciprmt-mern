import React from 'react'
import styles from './confirmAppointment.module.css'
import { Link } from 'react-router-dom'

const HHUpdateRequired = () => {
    return (
        <div className={styles.box2}>
            <h3>
                It's time to update your health history. 
            </h3>
            <div>
                It's important to keep your health history up-to-date and accurate so that your massage therapy treatment is safe and effective for your needs. <a href='https://www.cmto.com/rmts/standards-and-rules/' target="_blank">The CMTO</a> requires your health history to be updated at least once per year.
            </div>
            <Link to={'/healthhistory/update'}>
                <button style={{marginTop: '1rem'}} className={styles.btn}>Update Health History</button>
            </Link>
        </div>
    )
}

export default HHUpdateRequired
