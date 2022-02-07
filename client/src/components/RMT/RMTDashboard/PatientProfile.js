import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getClientHealthHistory, getUser } from '../../../actions/healthHistory'
import { getTreatmentPlans } from '../../../actions/treatmentPlans'
import moment from 'moment'
import styles from './rmtdashboard.module.css'
import axios from 'axios'
import { FiDivideSquare } from 'react-icons/fi'
import { addToEAL } from '../../../api/index'

const PatientProfile = ({user}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    const eal = {
        typeOfInfo: 'health history file',
        actionPerformed: 'viewed',
        accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
        whoseInfo: params.id
    }

    useEffect(()=>{
        dispatch(getUser(params.id))
        dispatch(getTreatmentPlans(params?.id))
        dispatch(getClientHealthHistory(params?.id))
        //add to electronic audit log
        addToEAL(eal)

    }, [dispatch, params.id])

    const patient = useSelector((state)=>state.usersReducer.user.data)
    const clientsHealthHistoryData = useSelector((state)=>state?.healthHistoryReducer?.healthHistoryData)
    const mostRecentHealthHistory = clientsHealthHistoryData?.at(-1)
    const HHCreatedOn = mostRecentHealthHistory?.createdAt
    const treatmentPlans = useSelector((state)=>state.treatmentPlanReducer.treatmentPlans)

    const selectAppoinment = (appointmentId) => {
        history.push(`/rmt/dashboard/appointment/${appointmentId}`)
    }

    const selectTreatmentPlan = (tpid) => {
        history.push(`/rmt/dashboard/patient/${params?.id}/treatments/${tpid}`)
    }

    const today = new Date()

    // if ((today - new Date(HHCreatedOn)) / (1000 * 3600 * 24 * 365) > 1) {
    //     alert(`This patient's health history was created more than one year ago.`)
    // }

    return (
        !patient ? (
            <div>
                No user data.
            </div>
        ) : (
            <div>
                {(today - new Date(HHCreatedOn)) / (1000 * 3600 * 24 * 365) > 1 ? (
                    <div className={styles.box}>
                        <h3>This patient's health history was created more than one year ago.</h3>
                        <h5>Last updated: {mostRecentHealthHistory?.createdAt}</h5>
                    </div>
                ) : (
                    <div>
                        <h5>Health history last updated: {moment.utc(mostRecentHealthHistory?.createdAt).format("YYYY-MM-DD")}</h5>
                    </div>
                )}
                <h4>Personal Info</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Pronouns</th>
                            <th>Date of birth</th>
                            <th>Occupation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{patient?.firstName} {patient?.lastName}</td>
                            {!mostRecentHealthHistory?.pronouns ? (
                                <td style={{color: 'red'}}>No pronoun indicated</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.pronouns}</td>
                            )}
                            {!mostRecentHealthHistory?.dateOfBirth ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{moment.utc(mostRecentHealthHistory?.dateOfBirth).format("YYYY-MM-DD")}</td>
                            )}
                            {!mostRecentHealthHistory?.occupation ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.occupation}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
                <h4>Contact Info</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{patient.email}</td>
                            <td>{mostRecentHealthHistory?.phoneNumber}</td>
                            <td>{mostRecentHealthHistory?.address.streetNumber} {mostRecentHealthHistory?.address.streetName} {mostRecentHealthHistory?.address.city} {mostRecentHealthHistory?.address.province}</td>                         
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h4 style={{marginTop: '2rem', marginBottom: '0'}}>Treatment Plans</h4>
                    <Link to={`/rmt/dashboard/patient/${patient?._id}/addtreatmentplan`}>
                        <button className={styles.btn}>New Treatment Plan</button>
                    </Link>
                    <div className={styles.box} style={{justifyContent: 'left'}}>
                        <ul>
                            {treatmentPlans?.map((tp)=>(
                                <li id={tp._id} className={styles.tpli} onClick={()=>selectTreatmentPlan(tp._id)}>{moment.utc(tp.startDate).format("YYYY-MM-DD")} - {!tp.endDate ? ('current') : (`${moment.utc(tp.endDate).format("YYYY-MM-DD")}`)}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div>
                    <h4>Appointments</h4>
                    <Link to={`/rmt/dashboard/patientprofile/${params.id}/addappointment`}>
                        <button className={styles.btn}>
                            Add appointment
                        </button>
                    </Link>
                
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {!patient.appointments[0] ? ( 
                        <div>
                            No appointments
                        </div>
                     ) : (
                         <tbody>
                             {patient?.appointments.map((appointment)=>(
                            <tr key={appointment._id} onClick={()=>selectAppoinment(appointment._id)}>
                                <td>{appointment.date}</td>
                                <td>{appointment.duration} minutes</td>
                                <td>${appointment.price}</td>
                            </tr>
                        ))}
                        </tbody>  
                     )}
                </table>
                </div> */}
                <h4>Health History</h4>
                <table className={styles.table}>
                <thead>
                        <tr>
                            <th>Doctor's name</th>
                            <th>Doctor's address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {!mostRecentHealthHistory ? (
                                <td style={{color: 'red'}}>No doctor information</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.doctor.doctorName}</td>
                            )}
                            {!mostRecentHealthHistory ? (
                                <td style={{color: 'red'}}>No doctor information</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.doctor.doctorAddress.doctorStreetNumber} {mostRecentHealthHistory?.doctor.doctorAddress.doctorStreetName} {mostRecentHealthHistory?.doctor.doctorAddress.doctorCity} {mostRecentHealthHistory?.doctor.doctorAddress.doctorProvince}</td>
                            )}
                        </tr>
                            
                    </tbody>
                </table>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>General health description</th>
                            <th>History with massage therapy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {!mostRecentHealthHistory?.generalHealth ?  (
                                <td style={{color: 'red'}}>No general health info</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.generalHealth}</td>
                            )}  
                            {!mostRecentHealthHistory?.historyOfMassage ?  (
                                <td>No history with massage info</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.historyOfMassage}</td>
                            )}                            
                        </tr>
                    </tbody>
                    </table>
                    <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Other treatment from Health Care Professional</th>    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {!mostRecentHealthHistory?.otherHCP ? (
                                <td>No other treatment from a HCP listed</td>
                            ) : (
                                <td>{mostRecentHealthHistory?.otherHCP}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Cardiovascular Conditions</th>
                                <th>Respiratory Conditions</th>
                                <th>Medical Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {!mostRecentHealthHistory ? (
                                        <div style={{color: 'red'}}>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {mostRecentHealthHistory?.highBloodPressure === true ? <div className="ui item">High blood pressure</div> : <div></div>}
                                            {mostRecentHealthHistory?.lowBloodPressure === true ? <div className="ui item">Low blood pressure</div> : <div></div>}
                                            {mostRecentHealthHistory?.heartAttack === true ? <div className="ui item">History of heart attacks</div> : <div></div>}
                                            {mostRecentHealthHistory?.vericoseVeins === true ? <div className="ui item">Vericose Veins</div> : <div></div>}
                                            {mostRecentHealthHistory?.stroke === true ? <div className="ui item">Stroke</div> : <div></div>}
                                            {mostRecentHealthHistory?.pacemaker === true ? <div className="ui item" style={{color: 'red'}}>Pacemaker</div> : <div></div>}
                                            {mostRecentHealthHistory?.heartDisease === true ? <div className="ui item">Heart disease</div> : <div></div>}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {!mostRecentHealthHistory ? (
                                        <div style={{color: 'red'}}>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {mostRecentHealthHistory?.chronicCough === true ? <div className="ui item">Chronic cough</div> : <div></div>}
                                            {mostRecentHealthHistory?.bronchitis === true ? <div className="ui item">Bronchitis</div> : <div></div>}
                                            {mostRecentHealthHistory?.asthma === true ? <div className="ui item">Asthma</div> : <div></div>}
                                            {mostRecentHealthHistory?.emphysema === true ? <div className="ui item">Emphysema</div> : <div></div>}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {!mostRecentHealthHistory ? (
                                        <div>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {mostRecentHealthHistory?.otherMedicalConditions ? <div className="ui item" style={{color: 'green'}}>{mostRecentHealthHistory?.otherMedicalConditions}</div> : <div></div>}
                                            {mostRecentHealthHistory?.epilepsy === true ? <div className="ui item">Epilepsy</div> : <div></div>}
                                            {mostRecentHealthHistory?.diabetes === true ? <div className="ui item">Diabetes</div> : <div></div>}
                                            {mostRecentHealthHistory?.cancer === true ? <div className="ui item" style={{color: 'red'}}>Cancer</div> : <div></div>}
                                            {mostRecentHealthHistory?.arthritis === true ? <div className="ui item">Arthritis</div> : <div></div>}
                                            {mostRecentHealthHistory?.arthritisFamilyHistory === true ? <div className="ui item">Family history of arthritis</div> : <div></div>}
                                            {mostRecentHealthHistory?.chronicHeadaches === true ? <div className="ui item">Chronic Headaches</div> : <div></div>}
                                            {mostRecentHealthHistory?.migraineHeadaches === true ? <div className="ui item">Migraine Headaches</div> : <div></div>}
                                            {mostRecentHealthHistory?.visionLoss === true ? <div className="ui item" style={{color: 'orange'}}>Vision Loss</div> : <div></div>}
                                            {mostRecentHealthHistory?.hearingLoss === true ? <div className="ui item" style={{color: 'orange'}}>Hearing Loss</div> : <div></div>}
                                            {mostRecentHealthHistory?.osteoporosis === true ? <div className="ui item" style={{color: 'orange'}}>Osteoporosis</div> : <div></div>}
                                            {mostRecentHealthHistory?.haemophilia === true ? <div className="ui item">Haemophilia</div> : <div></div>}                      
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {mostRecentHealthHistory?.injuries ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Injuries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.injuries}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Injuries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No recent injuries indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.surgeries ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Recent Surgeries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.surgeries}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Recent Surgeries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No recent surgeries indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.lossOfFeeling ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Loss of feeling/sensation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{mostRecentHealthHistory?.lossOfFeeling}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Loss of feeling/sensation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >No loss of feeling or sensation indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.allergies ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Allergies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{mostRecentHealthHistory?.allergies}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Allergies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No allergies indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.medications ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Medications</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.medications}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Medications</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No medications indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}{mostRecentHealthHistory?.skinConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Skin Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.skinConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Skin Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No skin conditions indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.infectiousConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Infectious Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.infectiousConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Infectious Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No infectious conditions indicated</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.otherMedicalConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Other Medical Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{mostRecentHealthHistory?.otherMedicalConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Other Medical Conditions indicated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No other medical conditions</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                    {mostRecentHealthHistory?.pregnant === 'Yes' ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Pregnant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{color: 'red'}}>{mostRecentHealthHistory?.pregnant}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Pregnant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{mostRecentHealthHistory?.pregnant}</td>
                            </tr>
                        </tbody>
                        </table>
                    )}
                </div>
            </div>
        )       
    )
}

export default PatientProfile
