import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../actions/healthHistory';
import { getAllTreatments } from '../../../../actions/treatmentPlans';
import UnfinishedTreatmentNotes from './UnfinishedTreatmentNotes';
import UpcomingAppointments from './UpcomingAppointments';
import styles from '../rmtdashboard.module.css'

const DashboardUpdates = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllTreatments())
        dispatch(getAllUsers())
    }, [dispatch])

    const treatments = useSelector((state)=> state?.treatmentPlanReducer?.treatments)
    const users = useSelector((state)=>state?.usersReducer?.users)

    return (
        <>
            <div className={styles.box}>
                <UpcomingAppointments treatments={treatments} users={users}/>
            </div>
            <div className={styles.box}>
                <UnfinishedTreatmentNotes treatments={treatments} users={users} />
            </div>
        </>
    )
}

export default DashboardUpdates;
