//dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//components
import ConfirmAppointment from '../Appointments/ConfirmAppointment'
import HHUpdateRequired from '../Appointments/HHUpdateRequired'
import AppointmentInformation from './AppointmentInformation.js/AppointmentInformation'
//styling
import styles from './dashboard.module.css'
//api calls
import { getClientHealthHistory, getUser } from '../../../actions/healthHistory'
import { getTreatmentsByClientId } from '../../../actions/treatmentPlans'

const Dashboard = ({user}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(user?.result._id))
        dispatch(getTreatmentsByClientId(user?.result?._id))
        dispatch(getClientHealthHistory(user?.result?._id))
    }, [dispatch])

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)
    const clientsHealthHistoryData = useSelector((state)=>state?.healthHistoryReducer?.healthHistoryData)
    const mostRecentHealthHistory = clientsHealthHistoryData[clientsHealthHistoryData?.length -1]

    const today = new Date()
    
    return (
        <div className={styles.container}>
            <h1>Hi {user?.result?.firstName}</h1>
            {(today - new Date(mostRecentHealthHistory?.createdAt)) / (1000 * 3600 * 24 * 365) > 1 ? (
                <HHUpdateRequired />
            ) : (
                <div>
                </div>
            )}
            {treatments?.length > 0 ? (
                <ConfirmAppointment user={user} treatments={treatments} />
            ) : treatments?.length === 0 && clientsHealthHistoryData?.length > 0 ? (
                <div className={styles.box}>
                    <p>You have no upcoming treatments scheduled yet.</p>
                    <p>Text Cip at 416-258-1230 to schedule a massage.</p>
                </div>
            ) : clientsHealthHistoryData?.length === 0 ? (                 
                    <HHUpdateRequired />
            ) : (
                <div>Loading...you may need to refresh the page.</div>
            )} 
            <AppointmentInformation />
        </div>
    )
}

export default Dashboard
