import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addAppointment } from '../../../actions/appointment'
import { createNewTreatmentPlan, getTreatmentPlans, addTreatmentToTP } from '../../../actions/treatmentPlans'
import styles from './rmtdashboard.module.css'

const AddNewTreatmentPlan = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [clientGoals, setClientGoals] = useState('')
    const [objectivesOfTreatmentPlan, setobjectivesOfTreatmentPlan] = useState('')
    const [conclusionOfTreatmentPlan, setconclusionOfTreatmentPlan] = useState('')

    const tpForm = {
        startDate,
        clientGoals,
        objectivesOfTreatmentPlan,
        conclusionOfTreatmentPlan,
        endDate
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createNewTreatmentPlan(tpForm, params?.clientid))
        history.push(`/rmt/dashboard/patientprofile/${params.clientid}`)
        clear()
    }

    const clear = () => {
        setstartDate('')
        setendDate('')
        setconclusionOfTreatmentPlan('')
        setClientGoals('')
        setobjectivesOfTreatmentPlan('')
    }

    return (
        <div className={styles.box}>
            <h3>Treatment Plan</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='ui fields'>
                        <div className='ui field'>
                            <label>Start date</label>
                            <input type="date" value={startDate} onChange={(e)=>setstartDate(e.target.value)} />
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
        </div>
    )
}

export default AddNewTreatmentPlan
