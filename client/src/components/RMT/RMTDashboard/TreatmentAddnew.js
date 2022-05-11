import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addTreatmentToTP, addTreatment } from '../../../actions/treatmentPlans'
import styles from './rmtdashboard.module.css'
import { sendConfirmEmail, addToCalendar } from '../../../api/index'
import { getUser } from '../../../actions/healthHistory';

const TreatmentAddnew = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    // const [dateAndTime, setDateAndTime] = useState(null)
    const [time, setTime] = useState(null)
    const [date, setDate] = useState(null)
    const [duration, setDuration] = useState('')

    useEffect(()=>{
        dispatch(getUser(params?.clientid))
    }, [])

    const client = useSelector((state)=>state.usersReducer.user.data)



    const form = {
        dateAndTime: `${date}T${time}:00.000Z`,
        date,
        time,
        duration,
        treatmentPlanId: params?.tpid,
        clientId: params?.clientid,
        firstName: client?.firstName,
        lastName: client?.lastName
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const apptdate = new Date(date)
        const timeSplit = time.split(':')
        apptdate.setUTCHours(timeSplit[0])
        apptdate.setUTCMinutes(timeSplit[1])
        
        console.log('apptdate', apptdate.toISOString())
        console.log('form', form)

        dispatch(addTreatment(form))
        history.push(`/rmt/dashboard/patient/${params?.clientid}/treatments/${params?.tpid}`)
        addToCalendar(form)
        sendConfirmEmail(params?.clientid, form)
    }

    return (
        <div>
            <div className={styles.box}>
                <form className="ui form" onSubmit={handleSubmit}>
                    <h5>Treatment details</h5>
                    <div className="ui fields">
                        <div className="ui field">
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                        </div>
                        <div className="ui field">
                            <label>Time</label>
                            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
                        </div>
                        <div className="ui field">
                        <label>Duration</label>
                            <select value={duration} onChange={(e)=>setDuration(e.target.value)}>
                                <option value="" disabled="disabled">Select duration</option>
                                <option value="60">60 minutes ($105)</option>
                                <option value="75">75 minutes ($125)</option>
                                <option value="90">90 minutes ($145)</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className={styles.btn} style={{marginTop: '10px', marginBottom: '20px'}}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TreatmentAddnew;
