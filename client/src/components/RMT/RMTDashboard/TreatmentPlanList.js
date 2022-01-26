import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams  } from 'react-router-dom'
import { getTreatmentPlanById, getTreatmentById } from '../../../actions/treatmentPlans'
import { getUser } from '../../../actions/healthHistory'
import { Link } from 'react-router-dom'
import styles from './rmtdashboard.module.css'

const TreatmentPlanList = ({setTreatmentId}) => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const selectTreatment = (tid, clientId, tpid) => {
        // history.push(`/rmt/dashboard/patient/${clientId}/treatmentplan/${tpid}/treatment/${tid}`)
        setTreatmentId(tid)     
    }

    return (
        !treatments ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
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
                        <tr onClick={()=>selectTreatment(t?._id, t?.clientId, t?.treatmentPlanId)}>
                            <td>{t?.date}</td>
                            <td>{t?.time}</td>
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
