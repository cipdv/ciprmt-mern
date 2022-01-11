import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmAppointment from '../Appointments/ConfirmAppointment'
import HealthHistory from '../HHForm/HealthHistory'
import styles from './dashboard.module.css'
import { getUser } from '../../../actions/healthHistory'

const Dashboard = ({user}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(user?.result._id)) 
    }, [dispatch])

    const currentUser = useSelector((state)=>state?.usersReducer)
    const appointments = useSelector((state)=>state?.usersReducer?.user?.data?.appointments)
    const healthHistory = useSelector((state)=>state?.usersReducer?.user?.data?.healthHistory)

    return (
            <div className={styles.container}>
                <h1>Hi {user?.result?.firstName}</h1>
                {appointments?.length > 0 ? (
                    <ConfirmAppointment user={user} appointments={appointments} />
                ) : appointments?.length === 0 && healthHistory?.length > 0 ? (
                    <div className={styles.box}>You have no upcoming appointments scheduled yet. <br />Text Cip at 416-258-1230 to schedule a massage.</div>
                ) : appointments?.length === 0 && healthHistory?.length === 0 ? (
                    <div className={styles.box}>
                        <h3>Thanks for registering.</h3>
                        <p>The next step is to complete your health history file:</p>
                        {/* <Link to="/healthhistory">
                            <button style={{marginTop: '0.5rem'}} className={styles.btn}>Click here</button>
                        </Link> */}
                        <HealthHistory currentUser={currentUser} />
                    </div>
                ) : (
                    <div>Loading...you may need to refresh the page.</div>
                )}                               
            </div>
    )
}

export default Dashboard
