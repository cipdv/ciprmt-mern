import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styles from './rmtdashboard.module.css'

const TreatmentPlanDetails = () => {

    const currentTp = useSelector((state)=>state?.treatmentPlanReducer?.currentTreatmentPlan)
    const patient = useSelector((state)=>state.usersReducer.user.data)

    const [clientGoals, setClientGoals] = useState(currentTp?.clientGoals)
    const [objectivesOfTreatmentPlan, setObjectivesofTreatmentPlan] = useState(currentTp?.objectivesOfTreatmentPlan)
    const [conclusionOfTreatmentPlan, setConclusionOfTreatmentPlan] = useState(currentTp?.conclusionOfTreatmentPlan)
    const [startDate, setStartDate] = useState(moment.utc(currentTp?.startDate).format("YYYY-MM-DD"))
    const [endDate, setEndDate] = useState(moment.utc(currentTp?.endDate).format("YYYY-MM-DD"))

    const data = {
        clientGoals,
        objectivesOfTreatmentPlan,
        conclusionOfTreatmentPlan,
        endDate
    }

    const updateTreatmentPlan = (e) => {
        e.preventDefault()
        
        console.log('data', data)
    }

    return (
        <div>
            <h3>{patient?.firstName} {patient?.lastName}</h3>
            <div className={styles.box} style={{justifyContent: 'left', width: '100%'}}>
                <h3>Treatment Plan</h3>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Start Date
                    </div>
                    <div style={{columnSpan: '1'}}>
                        <input className={styles.forminput} type='date' value={startDate} onChange={(e)=>setStartDate(e.target.value)} /> 
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Treatment plan goals
                    </div>
                    <div style={{columnSpan: '1'}}>
                        <input className={styles.forminput} type="text" value={clientGoals} onChange={(e)=>setClientGoals(e.target.value)} />
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Objectives of Treatment Plan
                    </div>
                    <div style={{columnSpan: '1'}}>
                        <input className={styles.forminput} type="text" value={objectivesOfTreatmentPlan} onChange={(e)=>setObjectivesofTreatmentPlan(e.target.value)} />
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Conclusion
                    </div>
                    <div style={{columnSpan: '1'}}>
                        <input className={styles.forminput} type="text" value={conclusionOfTreatmentPlan} onChange={(e)=>setConclusionOfTreatmentPlan(e.target.value)} />
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        End Date
                    </div>
                    <div style={{columnSpan: '1'}}>
                        <input className={styles.forminput} type='date' value={endDate} onChange={(e)=>setEndDate(e.target.value)} /> 
                    </div>
                </div>
                
                    <button className={styles.btn} onClick={updateTreatmentPlan}>Update treatment plan</button>
                    <Link to={`/rmt/dashboard/patient/${patient?._id}/treatmentplan/${currentTp?._id}/addtreatment`}>
                        <button className={styles.btn}>Add treatment</button>
                    </Link>
            </div>
        </div>
    )
}

export default TreatmentPlanDetails;
