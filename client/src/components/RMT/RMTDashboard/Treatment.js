import React, { useEffect, useState } from 'react';
import TreatmentDetails from './TreatmentDetails'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getTreatmentById, updateTreatment } from '../../../actions/treatmentPlans';
import { addTransaction } from '../../../actions/financials';
import styles from './rmtdashboard.module.css'
import axios from 'axios'

const Treatment = ({treatmentId, user}) => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)
    const patient = useSelector((state)=>state.usersReducer.user.data)

    const [findings, setFindings] = useState('')
    const [generalTreatment, setGeneralTreatment] = useState('')
    const [specificTreatment, setSpecificTreatment] = useState('')
    const [subjectiveResults, setSubjectiveResults] = useState('')
    const [objectiveResults, setObjectiveResults] = useState('')
    const [remex, setRemex] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [price, setPrice] = useState('')
    const [paymentFee, setPaymentFee] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [referToHCP, setReferToHCP] = useState('')
    const [notes, setNotes] = useState('')
    const [reasonForMassage, setReasonForMassage] = useState('')
    const [treatmentConsent, setTreatmentConsent] = useState(false)
    const [glutes, setGlutes] = useState(false)
    const [chest, setChest] = useState(false)
    const [abdomen, setAbdomen] = useState(false)
    const [innerThighs, setInnerThighs] = useState(false)
    const [areasToAvoid, setAreasToAvoid] = useState('')
    const [receiptNumber, setReceiptNumber] = useState('')

    useEffect(()=>{
        if (treatments?.length > 0) {
            const treatment = treatments.find(({_id})=>_id === treatmentId)
            setDate(treatment?.date !== undefined ? (treatment?.date) : (""))
            setTime(treatment?.time !== undefined ? (treatment?.time) : (""))
            setDuration(treatment?.duration !== undefined ? (treatment?.duration) : (""))
            setFindings(treatment?.findings !== undefined ? (treatment?.findings) : (""))
            setGeneralTreatment(treatment?.treatment?.generalTreatment !== undefined ? (treatment?.treatment?.generalTreatment) : (''))
            setSpecificTreatment(treatment?.treatment?.specificTreatment !== undefined ? (treatment?.treatment?.specificTreatment) : (""))
            setSubjectiveResults(treatment?.results?.subjectiveResults !== undefined ? (treatment?.results?.subjectiveResults) : (""))
            setObjectiveResults(treatment?.results?.objectiveResults !== undefined ? (treatment?.results?.objectiveResults) : (""))
            setRemex(treatment?.remex !== undefined ? (treatment?.remex) : (""))
            setPaymentType(treatment?.paymentType !== undefined ? (treatment?.paymentType) : (""))
            setPrice(treatment?.price !== undefined ? (treatment?.price) : (""))
            setPaymentFee(treatment?.paymentFee !== undefined ? (treatment?.paymentFee) : (""))
            setReferToHCP(treatment?.referToHCP !== undefined ? (treatment?.referToHCP) : (""))
            setNotes(treatment?.notes !== undefined ? (treatment?.notes) : (""))
            setReasonForMassage(treatment?.reasonForMassage !== undefined ? (treatment?.reasonForMassage) : (""))
            setTreatmentConsent(treatment?.consents?.treatmentConsent !== undefined ? (treatment?.consents?.treatmentConsent) : (""))
            setGlutes(treatment?.consents?.glutes !== undefined ? (treatment?.consents?.glutes) : (""))
            setChest(treatment?.consents?.chest !== undefined ? (treatment?.consents?.chest) : (""))
            setAbdomen(treatment?.consents?.abdomen !== undefined ? (treatment?.consents?.abdomen) : (""))
            setInnerThighs(treatment?.consents?.innerThighs !== undefined ? (treatment?.consents?.innerThighs) : (""))
            setAreasToAvoid(treatment?.consents?.areasToAvoid !== undefined ? (treatment?.consents?.areasToAvoid) : (""))
            setReceiptNumber(treatment?._id !== undefined ? (treatment?._id) : (''))
        }
    }, [treatmentId])

    const financialData = {
        year: 2022,
        expenses: [
            {
                category: 'bank fees',
                //advertising, travel, licenses, insurance, interest paid, repairs and maintenance, supplies, office supplies, bank fees, adminstrative fees
                amount: paymentFee,
                details: 'payment processing fee',
                date: date,
                receiptNumber: receiptNumber
            }
        ],
        income: [
            {
                category: 'revenue',
                amount: price/1.13,
                date: date,
                details: `${patient?.firstName} ${patient?.lastName}`,
                receiptNumber: receiptNumber
            }  
        ]
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

    const form = {
        treatmentConsent,
        findings,
        treatment: {
            generalTreatment, 
            specificTreatment
        },
        results: {
            subjectiveResults, 
            objectiveResults
        }, 
        remex, 
        paymentType, 
        price,
        paymentFee, 
        date, 
        time, 
        duration, 
        referToHCP, 
        notes
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTreatment(treatmentId, form))

        //add transaction to financials
        dispatch(addTransaction(user?.result?._id, financialData))

        //email receipt to client
        
        //electronic audit log
        axios.post('http://localhost:5000/electronicauditlog', {
            typeOfInfo: `appointment details`,
            actionPerformed: 'appointment details modified and income transaction added to financial statement',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${patient?.firstName} ${patient?.lastName}`
        })

        history.push(`/rmt/dashboard/patientprofile/${patient?._id}`)
    }

    return (
        !treatments ? (
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
                                <div>
                                    <input className={styles.forminput} type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input className={styles.forminput} type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <select className={styles.forminput} value={duration} onChange={(e)=>setDuration(e.target.value)}>
                                    <option value='' disabled='disabled'>Select duration</option>
                                    <option value="60">60 minutes ($100)</option>
                                    <option value="75">75 minutes ($120)</option>
                                    <option value="90">90 minutes ($140)</option>
                                </select>
                            </td>
                            <td>
                            <div>
                                    <input className={styles.forminput} type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <select className={styles.forminput} value={paymentType} onChange={handleChange}>
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
                <div className={styles.box} style={{justifyContent: 'left'}}>
                    <label>Reason for massage:</label>
                    {reasonForMassage}
                </div>
                <div>
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
                                    <div className="ui list">
                                        {glutes !== "" ? <div className="ui item" >Glutes</div> : <div></div>}
                                        {chest !== "" ? <div className="ui item" >Chest</div> : <div></div>}
                                        {innerThighs !== "" ? <div className="ui item" >Inner thighs</div> : <div></div>}
                                        {abdomen !== "" ? <div className="ui item" >Abdomen</div> : <div></div>}
                                    </div>
                                </td>
                                <td>
                                    <div className="ui list">
                                        {glutes === "" ? <div className="ui item" style={{color: 'red'}}>Glutes</div> : <div></div>}
                                        {chest === "" ? <div className="ui item" style={{color: 'red'}}>Chest</div> : <div></div>}
                                        {innerThighs === "" ? <div className="ui item" style={{color: 'red'}}>Inner thighs</div> : <div></div>}
                                        {abdomen === "" ? <div className="ui item" style={{color: 'red'}}>Abdomen</div> : <div></div>}
                                        {areasToAvoid ? <div className="ui item" style={{color: 'red'}}>{areasToAvoid}</div> : <div></div>}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.box}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Consent for treatment given
                                <input type="checkbox" />
                            </label>
                        </div>
                        
                            <label>Findings</label>
                            <input className={styles.forminput} type="text" value={findings} onChange={(e)=>setFindings(e.target.value)} />
                        
                        
                            <label>Specific Treatment</label>
                            <input className={styles.forminput} type="text" value={specificTreatment} onChange={(e)=>setSpecificTreatment(e.target.value)} />
                        
                        
                            <label>General Treatment</label>
                            <input className={styles.forminput} type="text" value={generalTreatment} onChange={(e)=>setGeneralTreatment(e.target.value)} />
                        
                        
                            <label>Subjective Results</label>
                            <input className={styles.forminput} type="text" value={subjectiveResults} onChange={(e)=>setSubjectiveResults(e.target.value)} />
                        
                        
                            <label>Objective Results</label>
                            <input className={styles.forminput} type="text" value={objectiveResults} onChange={(e)=>setObjectiveResults(e.target.value)} />
                        
                        
                            <label>Remex</label>
                            <input className={styles.forminput} type="text" value={remex} onChange={(e)=>setRemex(e.target.value)} />
                        
                        
                            <label>Referral to other Health Care Practitioner</label>
                            <input className={styles.forminput} type="text" value={referToHCP} onChange={(e)=>setReferToHCP(e.target.value)} />
                        
                        
                            <label>Notes</label>
                            <input className={styles.forminput} type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder='Include PPE used, and if consent to any areas was revoked before/during the massage'/>
                        
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
            </div>
        )
    )
};

export default Treatment;
