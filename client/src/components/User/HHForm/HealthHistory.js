import React, { useEffect } from 'react'
import HHForm from './HHForm'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../actions/healthHistory'
import RFHHHForm from './RFHHHForm'
import styles from './hhform.module.css'

const HealthHistory = ({user}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        if(user) {
            const userId = user.result._id
            dispatch(getUser(userId))
        }
    }, [dispatch, user])

    // const userState = useSelector((state)=>state?.usersReducer?.user?.data)

    return (
            // !userState ? (
            //     <div>
            //         Loading...
            //     </div>
            // ) : (
            <div>
                {/* <HHForm user={user} userState={userState}/> */}
                <RFHHHForm />   
            </div>
            )       
        
}

export default HealthHistory
