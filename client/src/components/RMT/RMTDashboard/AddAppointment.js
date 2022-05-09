import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addAppointment } from '../../../actions/appointment'
import { createNewTreatmentPlan, getTreatmentPlans, addTreatmentToTP } from '../../../actions/treatmentPlans'
import styles from './rmtdashboard.module.css'
import { addToCalendar } from '../../../api'

const AddAppointment = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getTreatmentPlans(params.id))
    }, [params])

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [startDate, setStartDate] = useState('')
    const [clientGoals, setClientGoals] = useState('')
    const [objectivesOfTreatmentPlan, setobjectivesOfTreatmentPlan] = useState('')
    const [conclusionOfTreatmentPlan, setconclusionOfTreatmentPlan] = useState('')
    const [endDate, setendDate] = useState('')
    const [tpId, setTpId] = useState('')

    const usersTreatmentPlans = useSelector((state)=>state?.treatmentPlanReducer?.treatmentPlanData)

    const formData = {
        date,
        time,
        duration,
        tpId
    }

    const tpForm = {
        startDate,
        clientGoals,
        objectivesOfTreatmentPlan,
        conclusionOfTreatmentPlan,
        endDate
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addAppointment(params.id, formData))
        dispatch(addTreatmentToTP(formData))
        history.push(`/rmt/dashboard/patientprofile/${params.id}`)
        clear()
    }

    const submitNewTreatmentPlan = (e) => {
        e.preventDefault()
        dispatch(createNewTreatmentPlan(tpForm, params.id))
    }

    const setTreatmentPlan = (id) => {
        const currentTP = usersTreatmentPlans.find(({_id})=> _id === id)
        setStartDate(currentTP?.startDate)
        setClientGoals(currentTP?.clientGoals)
        setobjectivesOfTreatmentPlan(currentTP?.objectivesOfTreatmentPlan)
        setconclusionOfTreatmentPlan(currentTP?.conclusionOfTreatmentPlan)
        setendDate(currentTP?.endDate)
        setTpId(currentTP?._id)
    }

    const clear = () => {
        setDate('')
        setTime('')
        setDuration('')
    }

    // id: String,
    // clientId: String,
    // startDate: Date,
    // clientGoals: String,
    // objectivesOfTreatmentPlan: String,
    // conclusionOfTreatmentPlan: String,
    // endDate: Date,
    // treatments: [treatmentSchema]

    return (
        <div>
            <div className={styles.box}>
                <h3>Treatment Plan</h3>
                {!usersTreatmentPlans ? (
                    <div>
                    </div>
                ) : (
                    <div>
                        <select onChange={(e)=>setTreatmentPlan(e.target.value)}>
                            <option value="">Select TP</option>
                            {usersTreatmentPlans?.map((tp)=>(
                                <option value={tp?._id}>{tp?.startDate}</option>
                            ))}
                        </select>
                    </div>
                )}
                <form onSubmit={submitNewTreatmentPlan}>
                    <div className='ui fields'>
                        <div className='ui field'>
                            <label>Start date</label>
                            <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                        </div>
                        <div className='ui field'>
                            <label>Client's goals</label>
                            <input type="text" value={clientGoals} onChange={(e)=>setClientGoals(e.target.value)} />
                        </div>
                        <div className='ui field'>
                            <label>Objectives of Treatment Plan</label>
                            <input type="text" value={objectivesOfTreatmentPlan} onChange={(e)=>setobjectivesOfTreatmentPlan(e.target.value)} />
                        </div>
                        <div className='ui field'>
                            <label>Conclusion of Treatment Plan</label>
                            <input type="text" value={conclusionOfTreatmentPlan} onChange={(e)=>setconclusionOfTreatmentPlan(e.target.value)} />
                        </div>
                        <div className='ui field'>
                            <label>End date</label>
                            <input type="date" value={endDate} onChange={(e)=>setendDate(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Create new treatment plan</button>
                </form>
            </div>
            <div className={styles.box}>
                <form className="ui form" onSubmit={handleSubmit}>
                    <h5>Appointment details</h5>
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
                    <button type="submit" className="ui pink button" style={{marginTop: '10px', marginBottom: '20px'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddAppointment
