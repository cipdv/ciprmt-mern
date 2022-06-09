//dependencies
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//components
import Patients from './Patients'
import SearchProfiles from './SearchProfiles'
import UnfinishedTreatmentNotes from './DashboardUpdates/UnfinishedTreatmentNotes'
import UpcomingAppointments from './DashboardUpdates/UpcomingAppointments'
//styling
import styles from './rmtdashboard.module.css'
//actions
import { getAllTreatments } from '../../../actions/treatmentPlans'
import { getAllUsers } from '../../../actions/healthHistory'
 
const RMTDashboard = () => {   

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllTreatments())
        dispatch(getAllUsers())
    }, [dispatch])

    const treatments = useSelector((state)=> state?.treatmentPlanReducer?.treatments)
    const users = useSelector((state)=>state?.usersReducer?.users)

    return (
        <div>
            <div className={styles.box}>
                <SearchProfiles />
                <Patients />
            </div>
            <div className={styles.box}>    
                <UnfinishedTreatmentNotes treatments={treatments} users={users} />
            </div>
            <div className={styles.box}>
                <UpcomingAppointments treatments={treatments} users={users} />
            </div>
        </div>
    )
}

export default RMTDashboard
