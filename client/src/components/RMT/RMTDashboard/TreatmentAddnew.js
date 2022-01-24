import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addTreatmentToTP, addTreatment } from '../../../actions/treatmentPlans'
import styles from './rmtdashboard.module.css'

const TreatmentAddnew = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')

    const form = {
        date,
        time,
        duration,
        treatmentPlanId: params?.tpid,
        clientId: params?.clientid
    }

    const handleSubmit = () => {
        dispatch(addTreatment(form))
        history.push(`/rmt/dashboard/patient/${params?.clientid}/treatments/${params?.tpid}`)
        axios.post(`http://localhost:5000/treatmentplan/sendconfirmemail/${params?.clientid}`, form)
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
                                <option value="60">60 minutes ($100)</option>
                                <option value="75">75 minutes ($120)</option>
                                <option value="90">90 minutes ($140)</option>
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