//dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//components
import LoadingScreen from '../../../LoadingScreen/LoadingScreen';
//styling
import styles from './rmtdashboard.module.css';
//actions
import { addTreatment } from '../../../actions/treatmentPlans';
import { getUser } from '../../../actions/healthHistory';
import { showLoadingScreen } from '../../../actions/loadingScreen';

const TreatmentAddnew = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [time, setTime] = useState(null)
    const [date, setDate] = useState(null)
    const [duration, setDuration] = useState('')

    const [errors, setErrors] = useState({
        date: '',
        time: '',
        duration: '',
        general: ''
    })

    useEffect(()=>{
        dispatch(getUser(params?.clientid))
    }, [])

    const client = useSelector((state)=>state.usersReducer.user.data)

    const form = {
        date,
        time,
        duration,
        treatmentPlanId: params?.tpid,
        clientId: params?.clientid,
        firstName: client?.firstName,
        lastName: client?.lastName,
        email: client?.email
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(showLoadingScreen())
        dispatch(addTreatment(form, setErrors, history))
    }

    return (
        <div>
            <LoadingScreen />
            <div className={styles.box}>
                <form className="ui form" onSubmit={handleSubmit}>
                    <h5>Treatment details</h5>
                    <div className="ui fields">
                        <div className="ui field">
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                            {errors?.date && <p>{errors?.date}</p>}
                        </div>
                        <div className="ui field">
                            <label>Time</label>
                            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
                            {errors?.time && <p>{errors?.time}</p>}
                        </div>
                        <div className="ui field">
                        <label>Duration</label>
                            <select value={duration} onChange={(e)=>setDuration(e.target.value)}>
                                <option value="" disabled="disabled">Select duration</option>
                                <option value="60">60 minutes ($105)</option>
                                <option value="75">75 minutes ($125)</option>
                                <option value="90">90 minutes ($145)</option>
                            </select>
                            {errors?.duration && <p>{errors?.duration}</p>}
                        </div>
                    </div>
                    {errors?.general && <p>{errors?.general}</p>}
                    <button type="submit" className={styles.btn} style={{marginTop: '10px', marginBottom: '20px'}}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TreatmentAddnew;
