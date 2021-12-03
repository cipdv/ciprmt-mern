import React, { useEffect } from 'react'
import AppointmentDetails from './AppointmentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointment } from '../../../actions/appointment'
import { useParams  } from 'react-router-dom'

const AppointmentList = ({user}) => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAppointment(params?.id))
    }, [dispatch, params.id])

    const userState = useSelector((state)=>state?.usersReducer?.appointment)
    const appointments = userState?.appointments?.find(({_id})=> _id === params?.id)

    return (
        !appointments ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
                <AppointmentDetails appointments={appointments} userState={userState} user={user}/>
            </div>
        )
    )
}

export default AppointmentList
