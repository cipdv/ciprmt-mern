import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './rmtdashboard.module.css'

const TreatmentPlanDetails = () => {

    const currentTp = useSelector((state)=>state?.treatmentPlanReducer?.currentTreatmentPlan)
    const patient = useSelector((state)=>state.usersReducer.user.data)

    return (
        <div>
            <h3>{patient?.firstName} {patient?.lastName}</h3>
            <div className={styles.box} style={{justifyContent: 'left', width: '100%'}}>
                <h3>Treatment Plan</h3>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Treatment Plan
                    </div>
                    <div style={{columnSpan: '1'}}>
                        {currentTp?.startDate} - {currentTp?.endDate ? (`${currentTp?.endDate}`) : ('ongoing')}
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Treatment plan goals
                    </div>
                    <div style={{columnSpan: '1'}}>
                        {currentTp?.clientGoals}
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Objectives of Treatment Plan
                    </div>
                    <div style={{columnSpan: '1'}}>
                        {currentTp?.objectivesOfTreatmentPlan}
                    </div>
                </div>
                <div style={{columns: '2'}}>
                    <div style={{columnSpan: '1'}}>
                        Conclusion
                    </div>
                    <div style={{columnSpan: '1'}}>
                        {currentTp?.conclusionOfTreatmentPlan}
                        {/* <input className={styles.forminput} type="text" placeholder='explain the conclusion of this treatment plan' /> */}
                    </div>
                </div>
                    <Link to={`/rmt/dashboard/patient/${patient?._id}/treatmentplan/${currentTp?._id}/addtreatment`}>
                        <button className={styles.btn}>Add treatment</button>
                    </Link>
            </div>
        </div>
    )
}

export default TreatmentPlanDetails;
