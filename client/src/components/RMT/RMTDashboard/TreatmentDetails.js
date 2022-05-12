import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import styles from './rmtdashboard.module.css'
import { addTreatmentToTP, getTreatmentById } from '../../../actions/treatmentPlans'
import { addTransaction } from '../../../actions/financials'
import { updateTreatment } from '../../../actions/treatmentPlans';
import { addToEAL } from '../../../api/index'

const Treatment = ({user, patient}) => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    useEffect(()=>{
        //electronic audit log
        addToEAL({
            typeOfInfo: `appointment details`,
            actionPerformed: 'viewed',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${params?.clientid}`
        })
    }, [])

    const treatment = useSelector((state)=>state?.treatmentPlanReducer?.treatment)

    const [findings, setFindings] = useState(treatment?.findings)
    const [generalTreatment, setGeneralTreatment] = useState(treatment?.treatment?.generalTreatment)
    const [specificTreatment, setSpecificTreatment] = useState(treatment?.treatment?.specificTreatment)
    const [subjectiveResults, setSubjectiveResults] = useState(treatment?.results?.subjectiveResults)
    const [objectiveResults, setObjectiveResults] = useState(treatment?.results?.objectiveResults)
    const [remex, setRemex] = useState(treatment?.remex)
    const [treatmentPlan, setTreatmentPlan] = useState(treatment?.treatmentPlan)
    const [paymentType, setPaymentType] = useState(treatment?.paymentType)
    const [price, setPrice] = useState(treatment?.price)
    const [paymentFee, setPaymentFee] = useState(null)
    const [date, setDate] = useState(treatment?.date)
    const [time, setTime] = useState(treatment?.time)
    const [duration, setDuration] = useState(treatment?.duration)
    const [referToHCP, setReferToHCP] = useState(treatment?.referToHCP)
    const [notes, setNotes] = useState(treatment?.notes)

    const [reasonForMassage, setReasonForMassage] = useState(treatment?.reasonForMassage)

    const formData = {
        paymentType,
        findings,
        treatment: {
            generalTreatment,
            specificTreatment
        },
        results: {
            subjectiveResults,
            objectiveResults,
        },
        remex,
        treatmentPlan,
        price,
        date,
        duration,
        time,
        referToHCP,
        notes
    }

    const handleChange = (e) => {
        setPaymentType(e.target.value)
        if (e.target.value === 'credit') {
            setPaymentFee(price * 0.0265)
        } else if (e.target.value === 'cash/etransfer') {
            setPaymentFee(0.00)
        } else if (e.target.value === 'debit') {
            setPaymentFee(0.10)
        }
    }

    const financialData = {
        year: 2021,
        expenses: [
            {
                category: 'bank fees',
                //advertising, travel, licenses, insurance, interest paid, repairs and maintenance, supplies, office supplies, bank fees, adminstrative fees
                amount: paymentFee,
                details: 'payment processing fee',
                date: treatment?.date,
                receiptNumber: `${treatment?._id}`
            }
        ],
        income: [
            {
                category: 'revenue',
                amount: price/1.13,
                date: treatment?.date,
                details: `${patient?.firstName} ${patient?.lastName}`,
                receiptNumber: `${treatment?._id}`
            }  
        ]
    }

    const clear = () => {
        setPaymentType('')
        setFindings('')
        setSpecificTreatment('')
        setGeneralTreatment('')
        setSubjectiveResults('')
        setObjectiveResults('')
        setRemex('')
        setTreatmentPlan('')
        setPrice('')
        setReferToHCP('')
        setNotes('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (paymentType !== '') {
            dispatch(updateTreatment(treatment?._id, formData))
            dispatch(addTransaction(user?.result?._id, financialData))
        }
        // //electronic audit log
        addToEAL({
            typeOfInfo: `appointment details`,
            actionPerformed: 'appointment details modified and income transaction added to financial statement',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${params?.clientid}`
        })
        history.push(`/rmt/dashboard/patientprofile/${params?.clientid}`)
        clear()  
    }

  return (
    !treatment ? (
            <div></div>
        ) : (
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Payment type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="ui input">
                                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div className="ui input">
                                    <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <select className="ui fluid dropdown" value={duration} onChange={(e)=>setDuration(e.target.value)}>
                                    <option value='' disabled='disabled'>Select duration</option>
                                    <option value="60">60 minutes ($100)</option>
                                    <option value="75">75 minutes ($120)</option>
                                    <option value="90">90 minutes ($140)</option>
                                </select>
                            </td>
                            <td>
                            <div className="ui input">
                                    <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <select className="ui fluid dropdown" value={paymentType} onChange={handleChange}>
                                    <option value='' disabled='disabled'>Select payment type</option>
                                    <option value='unpaid'>Unpaid</option>
                                    <option value='credit'>Credit card</option>
                                    <option value='debit'>Debit</option>
                                    <option value='cash/etransfer'>Cash/e-transfer</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Reason for massage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{reasonForMassage}</td>
                        </tr>
                    </tbody>
                </table>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Consents given</th>
                            <th>Areas to avoid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {!treatment ? (
                                    <div>No consent data</div>
                                ) : (
                                    <div className="ui list">
                                        {treatment?.consents?.treatmentConsent === true ? <div className="ui item" >Treatment consent given</div> : <div></div>}
                                        {treatment?.consents?.glutes === true || treatment?.consents?.glutesConsent === true ? <div className="ui item" >Glutes</div> : <div></div>}
                                        {treatment?.consents?.glutes === true ? <div className="ui item" >Glutes</div> : <div></div>}
                                        {treatment?.consents?.chest === true ? <div className="ui item" >Chest</div> : <div></div>}
                                        {treatment?.consents?.innerThighs === true ? <div className="ui item" >Inner thighs</div> : <div></div>}
                                        {treatment?.consents?.abdomen === true ? <div className="ui item" >Abdomen</div> : <div></div>}
                                    </div>
                                )}
                            </td>
                            <td>
                                {!treatment ? (
                                    <div>No consent data</div>
                                ) : (
                                    <div className="ui list">
                                        {treatment?.consents?.glutes === false ? <div className="ui item" style={{color: 'red'}}>Glutes</div> : <div></div>}
                                        {treatment?.consents?.chest === false ? <div className="ui item" style={{color: 'red'}}>Chest</div> : <div></div>}
                                        {treatment?.consents?.innerThighs === false ? <div className="ui item" style={{color: 'red'}}>Inner thighs</div> : <div></div>}
                                        {treatment?.consents?.abdomen === false ? <div className="ui item" style={{color: 'red'}}>Abdomen</div> : <div></div>}
                                        {treatment?.consents?.areasToAvoid ? <div className="ui item" style={{color: 'red'}}>{treatment?.consents?.areasToAvoid}</div> : <div></div>}
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Findings</label>
                        <input className={styles.forminput} type="text" value={findings} onChange={(e)=>setFindings(e.target.value)} />
                    </div>
                    <div>
                        <label>Specific Treatment</label>
                        <input className={styles.forminput} type="text" value={specificTreatment} onChange={(e)=>setSpecificTreatment(e.target.value)} />
                    </div>
                    <div>
                        <label>General Treatment</label>
                        <input className={styles.forminput} type="text" value={generalTreatment} onChange={(e)=>setGeneralTreatment(e.target.value)} />
                    </div>
                    <div>
                        <label>Subjective Results</label>
                        <input className={styles.forminput} type="text" value={subjectiveResults} onChange={(e)=>setSubjectiveResults(e.target.value)} />
                    </div>
                    <div>
                        <label>Objective Results</label>
                        <input className={styles.forminput} type="text" value={objectiveResults} onChange={(e)=>setObjectiveResults(e.target.value)} />
                    </div>
                    <div>
                        <label>Remex</label>
                        <input className={styles.forminput} type="text" value={remex} onChange={(e)=>setRemex(e.target.value)} />
                    </div>
                    <div>
                        <label>Treatment Plan</label>
                        <input className={styles.forminput} type="text" value={treatmentPlan} onChange={(e)=>setTreatmentPlan(e.target.value)} />
                    </div>
                    <div>
                        <label>Referral to other Health Care Practitioner</label>
                        <input className={styles.forminput} type="text" value={referToHCP} onChange={(e)=>setReferToHCP(e.target.value)} />
                    </div>
                    <div>
                        <label>Notes</label>
                        <input className={styles.forminput} type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder='Include PPE used, and if consent to any areas was revoked before/during the massage'/>
                    </div>
                    {/* how to upload image file of document  */}
                    {/* <div>
                        <label>Documents</label>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setDocumentationFile1(base64)} />
                        {documentationFile1 ? 
                            <div>
                                <img src={`data:image/jpeg;base64,${documentationFile1}`} />
                            </div>
                            : 
                            <div>
                            </div>
                        }
                    </div> */}
                    <button type="submit" className={styles.btn} style={{marginTop: '10px', marginBottom: '20px'}}>Update</button>
                </form> 
            </div>
        )
    )
};

export default Treatment;

// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useHistory, Link } from 'react-router-dom'
// import { updateAppointment } from '../../../actions/appointment'
// import { addTransaction } from '../../../actions/financials'
// import styles from './rmtdashboard.module.css'
// import axios from 'axios'
// import FileBase from 'react-file-base64';


// const AppointmentDetails = ({appointments, userState, user}) => {

//     const dispatch = useDispatch()
//     const history = useHistory()

//     useEffect(()=>{
//         axios.post('http://localhost:5000/electronicauditlog', {
//             typeOfInfo: `appointment details`,
//             actionPerformed: 'viewed',
//             accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
//             whoseInfo: userState?._id
//         })
//     }, [])

//     const [findings, setFindings] = useState(appointments?.findings)
//     const [generalTreatment, setGeneralTreatment] = useState(appointments?.treatment?.generalTreatment)
//     const [specificTreatment, setSpecificTreatment] = useState(appointments?.treatment?.specificTreatment)
//     const [subjectiveResults, setSubjectiveResults] = useState(appointments?.results?.subjectiveResults)
//     const [objectiveResults, setObjectiveResults] = useState(appointments?.results?.objectiveResults)
//     const [remex, setRemex] = useState(appointments?.remex)
//     const [treatmentPlan, setTreatmentPlan] = useState(appointments?.treatmentPlan)
//     const [paymentType, setPaymentType] = useState(appointments?.paymentType)
//     const [price, setPrice] = useState(appointments?.price)
//     const [paymentFee, setPaymentFee] = useState(null)
//     const [date, setDate] = useState(appointments?.date)
//     const [time, setTime] = useState(appointments?.time)
//     const [duration, setDuration] = useState(appointments?.duration)
//     const [referToHCP, setReferToHCP] = useState(appointments?.referToHCP)
//     const [notes, setNotes] = useState(appointments?.notes)
//     // const [documentationFile1, setDocumentationFile1] = useState(appointments?.documentation?.file1)

//     const formData = {
//         paymentType,
//         findings,
//         treatment: {
//             generalTreatment,
//             specificTreatment
//         },
//         results: {
//             subjectiveResults,
//             objectiveResults,
//         },
//         remex,
//         treatmentPlan,
//         price,
//         date,
//         duration,
//         time,
//         referToHCP,
//         notes
//     }

//     const handleChange = (e) => {
//         setPaymentType(e.target.value)
//         if (e.target.value === 'credit') {
//             setPaymentFee(price * 0.0265)
//         } else if (e.target.value === 'cash/etransfer') {
//             setPaymentFee(0.00)
//         } else if (e.target.value === 'debit') {
//             setPaymentFee(0.10)
//         }
//     }

//     const financialData = {
//         year: 2021,
//         expenses: [
//             {
//                 category: 'bank fees',
//                 //advertising, travel, licenses, insurance, interest paid, repairs and maintenance, supplies, office supplies, bank fees, adminstrative fees
//                 amount: paymentFee,
//                 details: 'payment processing fee',
//                 date: appointments?.date,
//                 receiptNumber: `${appointments._id}`
//             }
//         ],
//         income: [
//             {
//                 category: 'revenue',
//                 amount: price/1.13,
//                 date: appointments?.date,
//                 details: `${userState?.firstName} ${userState?.lastName}`,
//                 receiptNumber: `${appointments._id}`
//             }  
//         ]
//     }

//     const clear = () => {
//         setPaymentType('')
//         setFindings('')
//         setSpecificTreatment('')
//         setGeneralTreatment('')
//         setSubjectiveResults('')
//         setObjectiveResults('')
//         setRemex('')
//         setTreatmentPlan('')
//         setPrice('')
//         setReferToHCP('')
//         setNotes('')
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (paymentType !== '') {
//             dispatch(updateAppointment(userState?._id, appointments?._id, formData))
//             dispatch(addTransaction(user.result._id, financialData))
//         }
//         //electronic audit log
//         axios.post('http://localhost:5000/electronicauditlog', {
//             typeOfInfo: `appointment details`,
//             actionPerformed: 'appointment details modified and income transaction added to financial statement',
//             accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
//             whoseInfo: userState?._id
//         })
//         history.push(`/rmt/dashboard/patientprofile/${userState?._id}`)
//         clear()  
//     }

//     return (
//         !appointments ? (
//             <div>
//                 Loading
//             </div>
//         ) : (
//         <div>
//             <Link to={`/rmt/dashboard/patientprofile/${userState?._id}`} >
//                 <h3>{userState?.firstName} {userState?.lastName}</h3>
//             </Link>
//             <div className={styles.box} style={{justifyContent: 'left', width: '100%'}}>
//                 <h3>Treatment Plan</h3>
//                 <div style={{columns: '2'}}>
//                     <div style={{columnSpan: '1'}}>
//                         Treatment Plan
//                     </div>
//                     <div style={{columnSpan: '1'}}>
//                         Start date - end date
//                     </div>
//                 </div>
//                 <div style={{columns: '2'}}>
//                     <div style={{columnSpan: '1'}}>
//                         Treatment plan goals
//                     </div>
//                     <div style={{columnSpan: '1'}}>
//                         retrieve client's goals here
//                     </div>
//                 </div>
//                 <div style={{columns: '2'}}>
//                     <div style={{columnSpan: '1'}}>
//                         Objectives of Treatment Plan
//                     </div>
//                     <div style={{columnSpan: '1'}}>
//                         retrieve objectives
//                     </div>
//                 </div>
//                 <div style={{columns: '2'}}>
//                     <div style={{columnSpan: '1'}}>
//                         Conclusion
//                     </div>
//                     <div style={{columnSpan: '1'}}>
//                         <input className={styles.forminput} type="text" placeholder='explain the conclusion of this treatment plan' />
//                     </div>
//                 </div>
//             </div>
            
//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Duration</th>
//                         <th>Price</th>
//                         <th>Payment type</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>
//                             <div className="ui input">
//                                 <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
//                             </div>
//                         </td>
//                         <td>
//                             <div className="ui input">
//                                 <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
//                             </div>
//                         </td>
//                         <td>
//                             <select className="ui fluid dropdown" value={duration} onChange={(e)=>setDuration(e.target.value)}>
//                                 <option value='' disabled='disabled'>Select duration</option>
//                                 <option value="60">60 minutes ($100)</option>
//                                 <option value="75">75 minutes ($120)</option>
//                                 <option value="90">90 minutes ($140)</option>
//                             </select>
//                         </td>
//                         <td>
//                         <div className="ui input">
//                                 <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
//                             </div>
//                         </td>
//                         <td>
//                             <select className="ui fluid dropdown" value={paymentType} onChange={handleChange}>
//                                 <option value='' disabled='disabled'>Select payment type</option>
//                                 <option value='unpaid'>Unpaid</option>
//                                 <option value='credit'>Credit card</option>
//                                 <option value='debit'>Debit</option>
//                                 <option value='cash/etransfer'>Cash/e-transfer</option>
//                             </select>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>Reason for massage</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{appointments?.reasonForMassage}</td>
//                     </tr>
//                 </tbody>
//             </table>
//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>Consents given</th>
//                         <th>Areas to avoid</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>
//                             {!appointments ? (
//                                 <div>No consent data</div>
//                             ) : (
//                                 <div className="ui list">
//                                     {appointments?.consents?.treatmentConsent === true ? <div className="ui item" >Treatment consent given</div> : <div></div>}
//                                     {appointments?.consents?.glutes === true ? <div className="ui item" >Glutes</div> : <div></div>}
//                                     {appointments?.consents?.glutes === true ? <div className="ui item" >Glutes</div> : <div></div>}
//                                     {appointments?.consents?.chest === true ? <div className="ui item" >Chest</div> : <div></div>}
//                                     {appointments?.consents?.innerThighs === true ? <div className="ui item" >Inner thighs</div> : <div></div>}
//                                     {appointments?.consents?.abdomen === true ? <div className="ui item" >Abdomen</div> : <div></div>}
//                                 </div>
//                             )}
//                         </td>
//                         <td>
//                             {!appointments ? (
//                                 <div>No consent data</div>
//                             ) : (
//                                 <div className="ui list">
//                                     {appointments?.consents?.glutes === false ? <div className="ui item" style={{color: 'red'}}>Glutes</div> : <div></div>}
//                                     {appointments?.consents?.chest === false ? <div className="ui item" style={{color: 'red'}}>Chest</div> : <div></div>}
//                                     {appointments?.consents?.innerThighs === false ? <div className="ui item" style={{color: 'red'}}>Inner thighs</div> : <div></div>}
//                                     {appointments?.consents?.abdomen === false ? <div className="ui item" style={{color: 'red'}}>Abdomen</div> : <div></div>}
//                                     {appointments?.consents?.areasToAvoid ? <div className="ui item" style={{color: 'red'}}>{appointments?.consents?.areasToAvoid}</div> : <div></div>}
//                                 </div>
//                             )}
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Findings</label>
//                     <input className={styles.forminput} type="text" value={findings} onChange={(e)=>setFindings(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Specific Treatment</label>
//                     <input className={styles.forminput} type="text" value={specificTreatment} onChange={(e)=>setSpecificTreatment(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>General Treatment</label>
//                     <input className={styles.forminput} type="text" value={generalTreatment} onChange={(e)=>setGeneralTreatment(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Subjective Results</label>
//                     <input className={styles.forminput} type="text" value={subjectiveResults} onChange={(e)=>setSubjectiveResults(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Objective Results</label>
//                     <input className={styles.forminput} type="text" value={objectiveResults} onChange={(e)=>setObjectiveResults(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Remex</label>
//                     <input className={styles.forminput} type="text" value={remex} onChange={(e)=>setRemex(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Treatment Plan</label>
//                     <input className={styles.forminput} type="text" value={treatmentPlan} onChange={(e)=>setTreatmentPlan(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Referral to other Health Care Practitioner</label>
//                     <input className={styles.forminput} type="text" value={referToHCP} onChange={(e)=>setReferToHCP(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Notes</label>
//                     <input className={styles.forminput} type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder='Include PPE used, and if consent to any areas was revoked before/during the massage'/>
//                 </div>
//                 {/* how to upload image file of document  */}
//                 {/* <div>
//                     <label>Documents</label>
//                     <FileBase type="file" multiple={false} onDone={({ base64 }) => setDocumentationFile1(base64)} />
//                     {documentationFile1 ? 
//                         <div>
//                             <img src={`data:image/jpeg;base64,${documentationFile1}`} />
//                         </div>
//                         : 
//                         <div>
//                         </div>
//                     }
//                 </div> */}
//                 <button type="submit" className={styles.btn} style={{marginTop: '10px', marginBottom: '20px'}}>Update</button>
//             </form>
//         </div>
//         )
//     )
// }

// export default AppointmentDetails */}
