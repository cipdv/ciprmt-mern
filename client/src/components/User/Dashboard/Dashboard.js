import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAppointments } from '../../../actions/appointment'
import ConfirmAppointment from '../Appointments/ConfirmAppointment'
import styles from './dashboard.module.css'

const Dashboard = ({user, setUser}) => {

    const dispatch = useDispatch()

    const [updateState, setUpdateState] = useState(null)

    const appointments = useSelector((state)=>state?.usersReducer?.appointment)

    useEffect(() => {
        //get appointment data
        dispatch(getAppointments(user?.result._id))
        // setUser()
    }, [dispatch, updateState])

    return (
        <>
            <div className={styles.container}>
                <h1>Hi {user?.result?.firstName}</h1>
                     
                {/* <Link to='/bookappointment'>
                    <button className="ui button" style={{backgroundColor: '#adad85'}}>Book an appointment</button>
                </Link>                   */}
                <Link to="/healthhistory/update" >
                    <button className={styles.btn} >Update Health History</button>
                </Link>
                <Link to="/dashboard/receipts">
                    <button className={styles.btn} >View Appointment Receipts</button>
                </Link>
                {appointments?.length > 0 ? (
                    <ConfirmAppointment user={user} appointments={appointments} setUpdateState={setUpdateState} />                  
                ) : (
                    <div></div>
                )
                }
            </div>                      
        </>
    )
}

export default Dashboard
