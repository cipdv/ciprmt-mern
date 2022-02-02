import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmAppointment from '../Appointments/ConfirmAppointment'
import HealthHistory from '../HHForm/HealthHistory'
import HHUpdateRequired from '../Appointments/HHUpdateRequired'
import styles from './dashboard.module.css'
import { getClientHealthHistory, getUser } from '../../../actions/healthHistory'
import { getTreatmentPlans, getTreatmentsByClientId } from '../../../actions/treatmentPlans'
import { Link } from 'react-router-dom'

const Dashboard = ({user}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(user?.result._id))
        dispatch(getTreatmentsByClientId(user?.result?._id))
        dispatch(getClientHealthHistory(user?.result?._id))
    }, [dispatch])

    const currentUser = useSelector((state)=>state?.usersReducer)
    // const healthHistory = useSelector((state)=>state?.usersReducer?.user?.data?.healthHistory)
    // const currentHH = useSelector((state)=>state?.usersReducer?.user?.data?.healthHistory[0])
    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)
    const clientsHealthHistoryData = useSelector((state)=>state?.healthHistoryReducer?.healthHistoryData)

    const mostRecentHealthHistory = clientsHealthHistoryData?.at(-1)

    const today = new Date()
    
    return (
        <div className={styles.container}>
            <h1>Hi {user?.result?.firstName}</h1>
            {(today - new Date(mostRecentHealthHistory?.createdAt)) / (1000 * 3600 * 24 * 365) > 1 ? (
            // {(today - new Date(currentHH?.createdAt)) / (1000 * 3600 * 24 * 365) > 1 ? (
                <HHUpdateRequired />
            ) : (
                <div>
                </div>
            )}
            {treatments?.length > 0 ? (
                <ConfirmAppointment user={user} />
            ) : treatments?.length === 0 && clientsHealthHistoryData?.length > 0 ? (
                <div className={styles.box}>You have no upcoming treatments scheduled yet. <br />Text Cip at 416-258-1230 to schedule a massage.</div>
            ) : treatments?.length === 0 && clientsHealthHistoryData?.length === 0 ? (                 
                    <HHUpdateRequired />
            ) : (
                <div>Loading...you may need to refresh the page.</div>
            )}                               
        </div>
    )
}

export default Dashboard
