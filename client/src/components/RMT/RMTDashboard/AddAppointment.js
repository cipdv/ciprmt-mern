import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addAppointment } from '../../../actions/appointment'
// import { addTransaction } from '../../../actions/financials'

const AddAppointment = ({user}) => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    // const [price, setPrice] = useState('')
    // const [paymentType, setPaymentType] = useState('')
    // const [reasonForMassage, setReasonForMassage] = useState('')
    // const [treatmentConsent, setTreatmentConsent] = useState(false)
    // const [glutes, setGlutes] = useState(false)
    // const [chest, setChest] = useState(false)
    // const [abdomen, setAbdomen] = useState(false)
    // const [innerThighs, setInnerThighs] = useState(false)
    // const [areasToAvoid, setAreasToAvoid] = useState('')
    // const [findings, setFindings] = useState('')
    // const [generalTreatment, setGeneralTreatment] = useState('')
    // const [specificTreatment, setSpecificTreatment] = useState('')
    // const [subjectiveResults, setSubjectiveResults] = useState('')
    // const [objectiveResults, setObjectiveResults] = useState('')
    // const [remex, setRemex] = useState('')
    // const [treatmentPlan, setTreatmentPlan] = useState('')

    // const [paymentFee, setPaymentFee] = useState(null)

    // const handleChange = (e) => {
    //     setPaymentType(e.target.value)
    //     if (e.target.value === 'credit') {
    //         setPaymentFee(price * 0.0265)
    //     } else if (e.target.value === 'cash/etransfer') {
    //         setPaymentFee(0.00)
    //     } else if (e.target.value === 'debit') {
    //         setPaymentFee(0.10)
    //     }
    // }

    // const financialData = {
    //     year: 2021,
    //     expenses: [
    //         {
    //             category: 'bank fees',
    //             //advertising, travel, licenses, insurance, interest paid, repairs and maintenance, supplies, office supplies, bank fees, adminstrative fees
    //             amount: paymentFee,
    //             details: 'payment processing fee',
    //             date
    //         }
    //     ],
    //     income: [
    //         {
    //             category: 'revenue',
    //             amount: price/1.13,
    //             date
    //         }  
    //     ]
    // }

    const formData = {
        date,
        time,
        // price,
        duration,
        // paymentType,
        // reasonForMassage,
        // findings,
        // treatment: {
        //     generalTreatment,
        //     specificTreatment
        // },
        // results: {
        //     subjectiveResults,
        //     objectiveResults,
        // },
        // remex,
        // treatmentPlan,
        // consents: {
        //     treatmentConsent,
        //     glutes,
        //     chest,
        //     abdomen,
        //     innerThighs,
        //     areasToAvoid
        // }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addAppointment(params.id, formData))
        history.push(`/rmt/dashboard/patientprofile/${params.id}`)
        clear()
    }

    const clear = () => {
        setDate('')
        setTime('')
        setDuration('')
        // setPrice('')
        // setPaymentType('')
        // setReasonForMassage('')
        // setGlutes(false)
        // setChest(false)
        // setAbdomen(false)
        // setInnerThighs(false)
        // setAreasToAvoid('')    
        // setTreatmentConsent(false)
        // setFindings('')
        // setGeneralTreatment('')
        // setSpecificTreatment('')
        // setSubjectiveResults('')
        // setObjectiveResults('')
        // setRemex('')
        // setTreatmentPlan('')
    }

    return (
        <div>
            <form className="ui form" onSubmit={handleSubmit}>
                <h5 className="ui dividing header">Appointment details</h5>
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
                    {/* <div className="ui field">
                        <label>Price</label>
                        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="ui field">
                        <label>Payment Type</label>
                        <select className="ui fluid dropdown" value={paymentType} onChange={handleChange}>
                            <option value='' disabled='disabled'>Select payment type</option>
                            <option value='unpaid'>Unpaid</option>
                            <option value='credit'>Credit card</option>
                            <option value='debit'>Debit</option>
                            <option value='cash/etransfer'>Cash/e-transfer</option>
                        </select>
                    </div>
                </div>
                <div className="ui field"> 
                    <label>Reason for massage</label>
                    <input type="text" value={reasonForMassage} onChange={(e)=>setReasonForMassage(e.target.value)}/>
                </div>
                <h5 className="ui dividing header">Consents given</h5>
                <div className="ui fields"> 
                    <div style={{marginRight: '10px'}}>                     
                        <input type="checkbox" value={treatmentConsent} onChange={(e)=>setTreatmentConsent(e.target.checked)} />
                        <label>Treatment</label>
                    </div>               
                    <div style={{marginRight: '10px'}}>                     
                        <input type="checkbox" value={glutes} onChange={(e)=>setGlutes(e.target.checked)} />
                        <label>Glutes</label>
                    </div>
                    <div style={{marginRight: '10px'}}>                     
                        <input type="checkbox" value={innerThighs} onChange={(e)=>setInnerThighs(e.target.checked)} />
                        <label>Inner thighs</label>
                    </div>
                    <div style={{marginRight: '10px'}}>                     
                        <input type="checkbox" value={abdomen} onChange={(e)=>setAbdomen(e.target.checked)} />
                        <label>Abdomen</label>
                    </div>
                    <div style={{marginRight: '10px'}}>                     
                        <input type="checkbox" value={chest} onChange={(e)=>setChest(e.target.checked)} />
                        <label>Chest</label>
                    </div>            
                </div>
                <div className="ui field">
                    <label>Areas to avoid</label>
                    <input type="text" value={areasToAvoid} onChange={(e)=>setAreasToAvoid(e.target.value)} />
                </div>
                <h5 className="ui dividing header">Treatment Details</h5>
                <div className="ui field">
                    <label>Findings</label>
                    <input type="text" value={findings} onChange={(e)=>setFindings(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>Specific Treatment</label>
                    <input type="text" value={specificTreatment} onChange={(e)=>setSpecificTreatment(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>General Treatment</label>
                    <input type="text" value={generalTreatment} onChange={(e)=>setGeneralTreatment(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>Subjective Results</label>
                    <input type="text" value={subjectiveResults} onChange={(e)=>setSubjectiveResults(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>Objective Results</label>
                    <input type="text" value={objectiveResults} onChange={(e)=>setObjectiveResults(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>Remex</label>
                    <input type="text" value={remex} onChange={(e)=>setRemex(e.target.value)} />
                </div>
                <div className="ui field">
                    <label>Treatment Plan</label>
                    <input type="text" value={treatmentPlan} onChange={(e)=>setTreatmentPlan(e.target.value)} />
                </div> */}
                <button type="submit" className="ui pink button" style={{marginTop: '10px', marginBottom: '20px'}}>Submit</button>
            </form>
        </div>
    )
}

export default AddAppointment
