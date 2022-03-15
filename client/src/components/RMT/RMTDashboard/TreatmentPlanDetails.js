import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styles from './rmtdashboard.module.css'
import { updateTreatmentPlan } from '../../../actions/treatmentPlans'

const TreatmentPlanDetails = () => {

    const dispatch = useDispatch()

    const currentTp = useSelector((state)=>state?.treatmentPlanReducer?.currentTreatmentPlan)
    const patient = useSelector((state)=>state.usersReducer.user.data)

    const tpid = currentTp?._id

    const [clientGoals, setClientGoals] = useState(currentTp?.clientGoals)
    const [typeAndFocusOfTreatments, setTypeAndFocusOfTreatments] = useState(currentTp?.typeAndFocusOfTreatments)
    const [areasToBeTreated, setAreasToBeTreated] = useState(currentTp?.areasToBeTreated)
    const [durationAndFrequency, setDurationAndFrequency] = useState(currentTp?.durationAndFrequency)
    const [scheduleForReassessment, setScheduleForReassessment] = useState(currentTp?.scheduleForReassessment)
    const [anticipatedClientResponse, setAnticipatedClientResponse] = useState(currentTp?.anticipatedClientResponse)
    const [recommendedSelfCare, SetRecommendedSelfCare] = useState(currentTp?.recommendedSelfCare)
    const [conclusionOfTreatmentPlan, setConclusionOfTreatmentPlan] = useState(currentTp?.conclusionOfTreatmentPlan)
    const [startDate, setStartDate] = useState(moment.utc(currentTp?.startDate).format("YYYY-MM-DD"))
    const [endDate, setEndDate] = useState(moment.utc(currentTp?.endDate).format("YYYY-MM-DD"))

    const data = {
        clientGoals,
        typeAndFocusOfTreatments,
        areasToBeTreated,
        durationAndFrequency,
        scheduleForReassessment,
        anticipatedClientResponse,
        recommendedSelfCare,
        conclusionOfTreatmentPlan,
    }

    const submitTreatmentPlan = (e) => {
        e.preventDefault()
        dispatch(updateTreatmentPlan(tpid, data))
    }

    return (
        <div>
            <h3>{patient?.firstName} {patient?.lastName}</h3>
            <div className={styles.box} style={{justifyContent: 'left', width: '100%'}}>
                <h3>Treatment Plan</h3>
                <form onSubmit={submitTreatmentPlan}>
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
                            Type and focus of treatments
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={typeAndFocusOfTreatments} onChange={(e)=>setTypeAndFocusOfTreatments(e.target.value)} />
                        </div>
                    </div>
                    <div style={{columns: '2'}}>
                        <div style={{columnSpan: '1'}}>
                            Areas to be treated
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={areasToBeTreated} onChange={(e)=>setAreasToBeTreated(e.target.value)} />
                        </div>
                    </div>
                    <div style={{columns: '2'}}>
                        <div style={{columnSpan: '1'}}>
                            Duration and Frequency of Treatments
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={durationAndFrequency} onChange={(e)=>setDurationAndFrequency(e.target.value)} />
                        </div>
                    </div>
                    <div style={{columns: '2'}}>
                        <div style={{columnSpan: '1'}}>
                            Recommended Self Care
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={recommendedSelfCare} onChange={(e)=>SetRecommendedSelfCare(e.target.value)} />
                        </div>
                    </div>
                    <div style={{columns: '2'}}>
                        <div style={{columnSpan: '1'}}>
                            Schedule for Reassessment
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={scheduleForReassessment} onChange={(e)=>setScheduleForReassessment(e.target.value)} />
                        </div>
                    </div>
                    <div style={{columns: '2'}}>
                        <div style={{columnSpan: '1'}}>
                            Anticipated Client Response
                        </div>
                        <div style={{columnSpan: '1'}}>
                            <input className={styles.forminput} type="text" value={anticipatedClientResponse} onChange={(e)=>setAnticipatedClientResponse(e.target.value)} />
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
                        <button className={styles.btn}>Update treatment plan</button>
                        <Link to={`/rmt/dashboard/patient/${patient?._id}/treatmentplan/${currentTp?._id}/addtreatment`}>
                            <button className={styles.btn}>Add treatment</button>
                        </Link>
                    </form>
                </div>
        </div>
    )
}

export default TreatmentPlanDetails;
