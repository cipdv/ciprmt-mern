import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../../../actions/healthHistory'
import { getTreatmentPlans } from '../../../actions/treatmentPlans'
import moment from 'moment'
import styles from './rmtdashboard.module.css'
import axios from 'axios'
import { FiDivideSquare } from 'react-icons/fi'

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
        dispatch(getTreatmentPlans(params.id))
        //add to electronic audit log
        axios.post('http://localhost:5000/electronicauditlog', eal)

    }, [dispatch, params.id])

    const patient = useSelector((state)=>state.usersReducer.user.data)
    const HHCreatedOn = useSelector((state)=>state.usersReducer.user.data?.healthHistory[0]?.createdAt)
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
                        <h5>Last updated: {patient?.healthHistory[0]?.createdAt}</h5>
                    </div>
                ) : (
                    <div>
                        <h5>Last updated: {patient?.healthHistory[0]?.createdAt}</h5>
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
                            {!patient?.healthHistory[0]?.pronouns ? (
                                <td style={{color: 'red'}}>No pronoun indicated</td>
                            ) : (
                                <td>{patient?.healthHistory[0]?.pronouns}</td>
                            )}
                            {!patient?.healthHistory[0]?.dateOfBirth ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{moment.utc(patient.healthHistory[0].dateOfBirth).format("YYYY-MM-DD")}</td>
                            )}
                            {!patient?.healthHistory[0]?.occupation ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{patient.healthHistory[0].occupation}</td>
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
                            {!patient?.healthHistory[0]?.phoneNumber ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{patient.healthHistory[0].phoneNumber}</td>
                            )}
                            {!patient.healthHistory[0] ? (
                                <td style={{color: 'red'}}>No info</td>
                            ) : (
                                <td>{patient.healthHistory[0].address.streetNumber} {patient.healthHistory[0].address.streetName} {patient.healthHistory[0].address.city} {patient.healthHistory[0].address.province}</td>
                            )}                          
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h4>Treatment Plans</h4>
                    <Link to={`/rmt/dashboard/patient/${patient?._id}/addtreatmentplan`}>
                        <button className={styles.btn}>New Treatment Plan</button>
                    </Link>
                    <div className={styles.box}>
                        <ul>
                            {treatmentPlans?.map((tp)=>(
                                <li className={styles.tpli} onClick={()=>selectTreatmentPlan(tp._id)}>{tp.startDate} - {!tp.endDate ? ('current') : (`${tp.endDate}`)}</li>
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
                            {!patient.healthHistory[0] ? (
                                <td style={{color: 'red'}}>No doctor information</td>
                            ) : (
                                <td>{patient.healthHistory[0].doctor.doctorName}</td>
                            )}
                            {!patient.healthHistory[0] ? (
                                <td style={{color: 'red'}}>No doctor information</td>
                            ) : (
                                <td>{patient.healthHistory[0].doctor.doctorAddress.doctorStreetNumber} {patient.healthHistory[0].doctor.doctorAddress.doctorStreetName} {patient.healthHistory[0].doctor.doctorAddress.doctorCity} {patient.healthHistory[0].doctor.doctorAddress.doctorProvince}</td>
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
                            {!patient?.healthHistory[0]?.generalHealth ?  (
                                <td style={{color: 'red'}}>No general health info</td>
                            ) : (
                                <td>{patient.healthHistory[0].generalHealth}</td>
                            )}  
                            {!patient?.healthHistory[0]?.historyOfMassage ?  (
                                <td style={{color: 'red'}}>No history with massage info</td>
                            ) : (
                                <td>{patient.healthHistory[0].historyOfMassage}</td>
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
                            {!patient?.healthHistory[0]?.otherHCP ? (
                                <td style={{color: 'red'}}>No other treatment from a HCP listed</td>
                            ) : (
                                <td>{patient.healthHistory[0].otherHCP}</td>
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
                                    {!patient?.healthHistory[0] ? (
                                        <div style={{color: 'red'}}>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {patient?.healthHistory[0]?.highBloodPressure === true ? <div className="ui item">High blood pressure</div> : <div></div>}
                                            {patient?.healthHistory[0]?.lowBloodPressure === true ? <div className="ui item">Low blood pressure</div> : <div></div>}
                                            {patient?.healthHistory[0]?.heartAttack === true ? <div className="ui item">History of heart attacks</div> : <div></div>}
                                            {patient?.healthHistory[0]?.vericoseVeins === true ? <div className="ui item">Vericose Veins</div> : <div></div>}
                                            {patient?.healthHistory[0]?.stroke === true ? <div className="ui item">Stroke</div> : <div></div>}
                                            {patient?.healthHistory[0]?.pacemaker === true ? <div className="ui item" style={{color: 'red'}}>Pacemaker</div> : <div></div>}
                                            {patient?.healthHistory[0]?.heartDisease === true ? <div className="ui item">Heart disease</div> : <div></div>}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {!patient?.healthHistory[0] ? (
                                        <div style={{color: 'red'}}>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {patient?.healthHistory[0]?.chronicCough === true ? <div className="ui item">Chronic cough</div> : <div></div>}
                                            {patient?.healthHistory[0]?.bronchitis === true ? <div className="ui item">Bronchitis</div> : <div></div>}
                                            {patient?.healthHistory[0]?.asthma === true ? <div className="ui item">Asthma</div> : <div></div>}
                                            {patient?.healthHistory[0]?.emphysema === true ? <div className="ui item">Emphysema</div> : <div></div>}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {!patient?.healthHistory[0] ? (
                                        <div>
                                            No health history data
                                        </div>
                                    ) : (
                                        <div className="ui list">
                                            {patient?.healthHistory[0]?.otherMedicalConditions ? <div className="ui item" style={{color: 'green'}}>{patient?.healthHistory[0]?.otherMedicalConditions}</div> : <div></div>}
                                            {patient?.healthHistory[0]?.epilepsy === true ? <div className="ui item">Epilepsy</div> : <div></div>}
                                            {patient?.healthHistory[0]?.diabetes === true ? <div className="ui item">Diabetes</div> : <div></div>}
                                            {patient?.healthHistory[0]?.cancer === true ? <div className="ui item" style={{color: 'red'}}>Cancer</div> : <div></div>}
                                            {patient?.healthHistory[0]?.arthritis === true ? <div className="ui item">Arthritis</div> : <div></div>}
                                            {patient?.healthHistory[0]?.arthritisFamilyHistory === true ? <div className="ui item">Family history of arthritis</div> : <div></div>}
                                            {patient?.healthHistory[0]?.chronicHeadaches === true ? <div className="ui item">Chronic Headaches</div> : <div></div>}
                                            {patient?.healthHistory[0]?.migraineHeadaches === true ? <div className="ui item">Migraine Headaches</div> : <div></div>}
                                            {patient?.healthHistory[0]?.visionLoss === true ? <div className="ui item" style={{color: 'orange'}}>Vision Loss</div> : <div></div>}
                                            {patient?.healthHistory[0]?.hearingLoss === true ? <div className="ui item" style={{color: 'orange'}}>Hearing Loss</div> : <div></div>}
                                            {patient?.healthHistory[0]?.osteoporosis === true ? <div className="ui item" style={{color: 'orange'}}>Osteoporosis</div> : <div></div>}
                                            {patient?.healthHistory[0]?.haemophilia === true ? <div className="ui item">Haemophilia</div> : <div></div>}                      
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {patient?.healthHistory[0]?.injuries ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Injuries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{patient?.healthHistory[0]?.injuries}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.surgeries ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Recent Surgeries</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{patient?.healthHistory[0]?.surgeries}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.lossOfFeeling ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Loss of feeling</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{patient?.healthHistory[0]?.lossOfFeeling}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.allergies ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Allergies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{patient?.healthHistory[0]?.allergies}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.medications ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Medications</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{patient?.healthHistory[0]?.medications}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}{patient?.healthHistory[0]?.skinConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Skin Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{patient?.healthHistory[0]?.skinConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.infectiousConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Infectious Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{patient?.healthHistory[0]?.infectiousConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.otherMedicalConditions ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Other Medical Conditions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{patient?.healthHistory[0]?.otherMedicalConditions}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                    {patient?.healthHistory[0]?.pregnant === 'Yes' ? (
                        <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Pregnant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{color: 'red'}}>{patient?.healthHistory[0]?.pregnant}</td>
                            </tr>
                        </tbody>
                        </table>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        )       
    )
}

export default PatientProfile
