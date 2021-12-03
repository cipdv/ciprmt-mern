import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { confirmAppointment } from '../../../actions/appointment'

const ConfirmAppointment = ({user, appointments, setUpdateState}) => {

    const dispatch = useDispatch()

    const { _id } = user?.result

    const today = new Date()
    
    const [reasonForMassage, setReasonForMassage] = useState('')
    const [treatmentConsent, setTreatmentConsent] = useState(false)
    const [glutes, setGlutes] = useState(false)
    const [chest, setChest] = useState(false)
    const [abdomen, setAbdomen] = useState(false)
    const [innerThighs, setInnerThighs] = useState(false)
    const [areasToAvoid, setAreasToAvoid] = useState('')

    const formData = {
        reasonForMassage,
        consents: {
            treatmentConsent,
            glutes,
            chest,
            abdomen,
            innerThighs,
            areasToAvoid
        }
    }

    const handleSubmit = (e, appointmentId) => {
        e.preventDefault()
        //update appointment with the appointment id
        dispatch(confirmAppointment(_id, appointmentId, formData))
        setUpdateState('something')
        clear()
    }

    const clear = () => {
        setReasonForMassage('')
        setGlutes(false)
        setChest(false)
        setAbdomen(false)
        setInnerThighs(false)
        setAreasToAvoid(false)
    }

    return (
        appointments?.length > 0 ? (
            <div style={{marginTop: '3em'}}>
                <h4>Upcoming Appointments</h4>
                    {appointments && appointments?.map((appointment) => (
                        new Date(appointment?.date) >= today && appointment?.consents?.treatmentConsent !== true ? (                  
                            <div style={{marginBottom: '3em'}} key={appointment._id} >
                                <table className="ui table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{appointment?.date}</td>
                                            <td>{appointment?.time}</td>
                                            <td>{appointment?.duration}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form className="ui form" onSubmit={(e)=>handleSubmit(e, appointment?._id)} >
                                    <div className="ui fields">
                                        <div className="ui field">
                                            <label>Reason for booking massage:</label>
                                            <input type="text" value={reasonForMassage} onChange={(e)=>setReasonForMassage(e.target.value)}/>
                                        </div>
                                        <div className="ui field">
                                            <h5>I give consent to massage the following areas:</h5>
                                            <div>
                                                <input type="checkbox" value={glutes} onChange={(e)=>setGlutes(e.target.checked)} />
                                                <label>Glutes</label>
                                                <input type="checkbox" value={abdomen} onChange={(e)=>setAbdomen(e.target.checked)} />
                                                <label>Abdomen</label>
                                                <input type="checkbox" value={chest} onChange={(e)=>setChest(e.target.checked)} />
                                                <label>Chest</label>
                                                <input type="checkbox" value={innerThighs} onChange={(e)=>setInnerThighs(e.target.checked)} />
                                                <label>Inner thighs</label>
                                            </div>
                                        </div>
                                        <div className="ui field">
                                            <label>Are there any other areas you would not like to be massaged?</label>
                                            <input type="text" value={areasToAvoid} onChange={(e)=>setAreasToAvoid(e.target.value)} />
                                        </div>
                                    </div>
                                    <button type="submit" onClick={()=>setTreatmentConsent(true)} className="ui button">Confirm Appointment</button>
                                </form>                                
                            </div>
                            ) : (                              
                                <div></div>
                            )
                        ))}                 
            </div>
        ) : (
            <div style={{marginTop: '3em'}}>
                <h5>No upcoming appointments</h5>
            </div>
        )
        
    )
}


export default ConfirmAppointment


//Not sure if this is being used for anything....but let's find out...

// import React from 'react'
// import { useHistory } from 'react-router-dom'

// const AppointmentTable = ({appointment}) => {

//     const history = useHistory()

//     const selectAppointment = (id) => {
//         history.push(`/dashboard/appointment/${id}`)
//     }

//     return (
//         <div>
//             <table className="ui selectable celled table">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Duration</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr key={appointment?._id} onClick={()=>selectAppointment(appointment?._id)}>
//                         <td>{appointment?.date}</td>
//                         <td>{appointment?.duration}</td>
//                         <td>{appointment?.duration === 60 ? ('$90') : ('unpaid')}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default AppointmentTable
