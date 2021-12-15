import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAppointments } from '../../../actions/appointment'
import ConfirmAppointment from '../Appointments/ConfirmAppointment'

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
            <div>
                <h3>Welcome {user?.result?.firstName}! :D</h3>
                     
                {/* <Link to='/bookappointment'>
                    <button className="ui button" style={{backgroundColor: '#adad85'}}>Book an appointment</button>
                </Link>                   */}
                <Link to="/healthhistory/update" >
                    <button className="ui button" style={{backgroundColor: '#adad85'}}>Update Health History</button>
                </Link>
                <Link to="/dashboard/receipts">
                    <button className="ui button" style={{backgroundColor: '#adad85'}}>View Appointment Receipts</button>
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
