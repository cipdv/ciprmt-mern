import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { updateAppointment } from '../../../actions/appointment'
import { addTransaction } from '../../../actions/financials'


const AppointmentDetails = ({appointments, userState, user}) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [findings, setFindings] = useState(appointments?.findings ? (appointments?.findings) : (''))
    const [generalTreatment, setGeneralTreatment] = useState(appointments?.treatment?.generalTreatment ? (appointments?.treatment?.generalTreatment) : (''))
    const [specificTreatment, setSpecificTreatment] = useState(appointments?.treatment?.specificTreatment ? (appointments?.treatment?.specificTreatment) : (''))
    const [subjectiveResults, setSubjectiveResults] = useState(appointments?.results?.subjectiveResults ? (appointments?.results?.subjectiveResults) : (''))
    const [objectiveResults, setObjectiveResults] = useState(appointments?.results?.objectiveResults ? (appointments?.results?.objectiveResults) : (''))
    const [remex, setRemex] = useState(appointments?.remex ? (appointments?.remex) : (''))
    const [treatmentPlan, setTreatmentPlan] = useState(appointments?.treatmentPlan ? (appointments?.treatmentPlan) : (''))
    const [paymentType, setPaymentType] = useState(appointments?.paymentType ? (appointments?.paymentType) : (''))
    const [price, setPrice] = useState(appointments?.price ? (appointments?.price) : (''))
    const [paymentFee, setPaymentFee] = useState(null)
    const [date, setDate] = useState(appointments?.date ? (appointments?.date) : (''))
    const [time, setTime] = useState(appointments?.time ? (appointments?.time) : (''))
    const [duration, setDuration] = useState(appointments?.duration ? (appointments?.duration) : (''))

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
        time
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
                date: appointments?.date,
                receiptNumber: `${appointments._id}`
            }
        ],
        income: [
            {
                category: 'revenue',
                amount: price/1.13,
                date: appointments?.date,
                details: `${userState?.firstName} ${userState?.lastName}`,
                receiptNumber: `${appointments._id}`
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
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (paymentType !== '') {
            dispatch(updateAppointment(userState?._id, appointments?._id, formData))
            dispatch(addTransaction(user.result._id, financialData))
        }
        history.push(`/rmt/dashboard/patientprofile/${userState?._id}`)
        clear()  
    }

    return (
        !appointments ? (
            <div>
                Loading
            </div>
        ) : (
        <div>
            <Link style={{color: 'black'}} to={`/rmt/dashboard/patientprofile/${userState?._id}`} >
                <h3>{userState?.firstName} {userState?.lastName}</h3>
            </Link>
            <table className="ui table">
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
            <table className="ui table">
                <thead>
                    <tr>
                        <th>Reason for massage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{appointments?.reasonForMassage}</td>
                    </tr>
                </tbody>
            </table>
            <table className="ui table">
                <thead>
                    <tr>
                        <th>Consents given</th>
                        <th>Areas to avoid</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {!appointments ? (
                                <div>No consent data</div>
                            ) : (
                                <div className="ui list">
                                    {appointments?.consents?.glutes === true ? <div className="ui item" >Glutes</div> : <div></div>}
                                    {appointments?.consents?.chest === true ? <div className="ui item" >Chest</div> : <div></div>}
                                    {appointments?.consents?.innerThighs === true ? <div className="ui item" >Inner thighs</div> : <div></div>}
                                    {appointments?.consents?.abdomen === true ? <div className="ui item" >Abdomen</div> : <div></div>}
                                </div>
                            )}
                        </td>
                        <td>
                            {!appointments ? (
                                <div>No consent data</div>
                            ) : (
                                <div className="ui list">
                                    {appointments?.consents?.glutes === false ? <div className="ui item" style={{color: 'red'}}>Glutes</div> : <div></div>}
                                    {appointments?.consents?.chest === false ? <div className="ui item" style={{color: 'red'}}>Chest</div> : <div></div>}
                                    {appointments?.consents?.innerThighs === false ? <div className="ui item" style={{color: 'red'}}>Inner thighs</div> : <div></div>}
                                    {appointments?.consents?.abdomen === false ? <div className="ui item" style={{color: 'red'}}>Abdomen</div> : <div></div>}
                                    {appointments?.consents?.areasToAvoid ? <div className="ui item" style={{color: 'red'}}>{appointments?.consents?.areasToAvoid}</div> : <div></div>}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <form className="ui form" onSubmit={handleSubmit}>
                <div>
                    <label>Findings</label>
                    <input type="text" value={findings} onChange={(e)=>setFindings(e.target.value)} />
                </div>
                <div>
                    <label>Specific Treatment</label>
                    <input type="text" value={specificTreatment} onChange={(e)=>setSpecificTreatment(e.target.value)} />
                </div>
                <div>
                    <label>General Treatment</label>
                    <input type="text" value={generalTreatment} onChange={(e)=>setGeneralTreatment(e.target.value)} />
                </div>
                <div>
                    <label>Subjective Results</label>
                    <input type="text" value={subjectiveResults} onChange={(e)=>setSubjectiveResults(e.target.value)} />
                </div>
                <div>
                    <label>Objective Results</label>
                    <input type="text" value={objectiveResults} onChange={(e)=>setObjectiveResults(e.target.value)} />
                </div>
                <div>
                    <label>Remex</label>
                    <input type="text" value={remex} onChange={(e)=>setRemex(e.target.value)} />
                </div>
                <div>
                    <label>Treatment Plan</label>
                    <input type="text" value={treatmentPlan} onChange={(e)=>setTreatmentPlan(e.target.value)} />
                </div>
                <button type="submit" className="ui pink button" style={{marginTop: '10px', marginBottom: '20px'}}>Update</button>
            </form>
        </div>
        )
    )
}

export default AppointmentDetails
