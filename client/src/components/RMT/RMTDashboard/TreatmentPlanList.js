import React from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { deleteTreatment } from '../../../actions/treatmentPlans'
import styles from './rmtdashboard.module.css'

const TreatmentPlanList = ({setTreatmentId}) => {

    const dispatch = useDispatch()
    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const selectTreatment = (tid) => {
        setTreatmentId(tid)     
    }

    const handleDelete = (tid) => {
        dispatch(deleteTreatment(tid))
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {treatments?.map((t)=>(
                        <tr onClick={()=>selectTreatment(t?._id)}>
                            <td>{t?.date}</td>
                            <td>{t?.time}</td>
                            <td>{t?.duration} minutes</td>
                            <td onClick={()=>handleDelete(t?._id)}><button>Delete</button></td>
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
