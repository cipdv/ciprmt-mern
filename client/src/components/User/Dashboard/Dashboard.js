import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmAppointment from '../Appointments/ConfirmAppointment'
import HealthHistory from '../HHForm/HealthHistory'
import HHUpdateRequired from '../Appointments/HHUpdateRequired'
import styles from './dashboard.module.css'
import { getUser } from '../../../actions/healthHistory'
import { getTreatmentPlans, getTreatmentsByClientId } from '../../../actions/treatmentPlans'
import { Link } from 'react-router-dom'

const Dashboard = ({user}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(user?.result._id))
        dispatch(getTreatmentsByClientId(user?.result?._id))
    }, [dispatch])

    const currentUser = useSelector((state)=>state?.usersReducer)
    const healthHistory = useSelector((state)=>state?.usersReducer?.user?.data?.healthHistory)
    const currentHH = useSelector((state)=>state?.usersReducer?.user?.data?.healthHistory[0])
    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const today = new Date()
    
    return (
            <div className={styles.container}>
                <h1>Hi {user?.result?.firstName}</h1>
                {(today - new Date(currentHH?.createdAt)) / (1000 * 3600 * 24 * 365) > 1 ? (
                    <HHUpdateRequired />
                ) : (
                    <div>
                    </div>
                )}
                {treatments?.length > 0 ? (
                    <ConfirmAppointment user={user} treatments={treatments} />
                ) : treatments?.length === 0 && healthHistory?.length > 0 ? (
                    <div className={styles.box}>You have no upcoming treatments scheduled yet. <br />Text Cip at 416-258-1230 to schedule a massage.</div>
                ) : treatments?.length === 0 && healthHistory?.length === 0 ? (
                    <div className={styles.box}>
                        <h3>Thanks for registering.</h3>
                        <p>The next step is to complete your health history file:</p>
                        <Link to="/healthhistory">
                            <button style={{marginTop: '0.5rem'}} className={styles.btn}>Click here</button>
                        </Link>
                        <HealthHistory currentUser={currentUser} />
                        <HHUpdateRequired />
                    </div>
                ) : (
                    <div>Loading...you may need to refresh the page.</div>
                )}                               
            </div>
    )
}

export default Dashboard
