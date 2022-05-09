import React from 'react'
import {  useSelector } from 'react-redux'
import styles from './rmtdashboard.module.css'

const TreatmentPlanList = ({setTreatmentId}) => {

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const selectTreatment = (tid) => {
        setTreatmentId(tid)     
    }

    return (
        !treatments ? (
            <div>
                Loading...
            </div>
        ) : (
            <div className={styles.box}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                    {treatments?.map((t)=>(
                        <tr onClick={()=>selectTreatment(t?._id)}>
                            <td>{new Date(t?.dateAndTime).toLocaleDateString()}</td>
                            <td>{new Date(t?.dateAndTime).toLocaleTimeString()}</td>
                            <td>{t?.duration} minutes</td>
                        </tr>
                    )) 
                    }
                    </tbody>
                </table>
            </div>
        )
    )
}

export default TreatmentPlanList
