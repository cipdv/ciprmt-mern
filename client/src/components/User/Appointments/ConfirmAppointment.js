import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { confirmAppointment } from '../../../actions/appointment'
import { useForm } from 'react-hook-form'
import styles from './confirmAppointment.module.css'


const ConfirmAppointment = ({user, appointments, setUpdateState}) => {

    const dispatch = useDispatch()

    const { _id, firstName, lastName } = user?.result
    const { register, handleSubmit, control, formState: { errors } } = useForm()


    const today = new Date()
    
    // const [reasonForMassage, setReasonForMassage] = useState('')
    const [treatmentConsent, setTreatmentConsent] = useState(false)
    // const [glutes, setGlutes] = useState(false)
    // const [chest, setChest] = useState(false)
    // const [abdomen, setAbdomen] = useState(false)
    // const [innerThighs, setInnerThighs] = useState(false)
    // const [areasToAvoid, setAreasToAvoid] = useState('')
    const [apptDate, setApptDate] = useState('')
    const [apptTime, setApptTime] = useState('')

    // const [reasonForMassageError, setReasonForMassageError] = useState('')


    const formData = {
        // reasonForMassage,
        consents: {
            treatmentConsent

        },
        //     glutes,
        //     chest,
        //     abdomen,
        //     innerThighs,
        //     areasToAvoid
        // },
        name: `${firstName} ${lastName}`,
        apptDate,
        apptTime
    }

    const setDateAndTimeAndConsent = (appointmentDate, appointmentTime) => {
        setTreatmentConsent(true)
        setApptDate(appointmentDate)
        setApptTime(appointmentTime)
    }

    const onSubmit = (data, appointmentId) => {
        console.log(data)
        dispatch(confirmAppointment(_id, appointmentId, formData))
        //update appointment with the appointment id
        clear()
    }

    const clear = () => {
        // setReasonForMassage('')
        // setGlutes(false)
        // setChest(false)
        // setAbdomen(false)
        // setInnerThighs(false)
        // setAreasToAvoid(false)
        // setApptDate('')
    }

    return (
        appointments?.length > 0 ? (
            <div className={styles.container}>
                <h4>You have an upcoming appointment</h4>
                    {appointments && appointments?.map((appointment) => (
                        new Date(appointment?.date) >= today && appointment?.consents?.treatmentConsent !== true ? (                  
                            <div style={{marginBottom: '3em'}} key={appointment._id} >
                                <p>
                                    Please confirm your appointment on {appointment?.date} at {appointment?.time} for {appointment?.duration} minutes.
                                </p>
                                {/* <table className="ui table">
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
                                </table> */}
                                <form className="ui form" onSubmit={()=>handleSubmit(appointment?._id)} >
                                    <div className="ui fields">
                                        <div className="ui field">
                                            <label>Reason for booking massage:</label>
                                            <input type="text" {...register('reasonForMassage', {required: true})} name="reasonForMassage" />
                                            {errors?.reasonForMassage && <p style={{color: 'red'}}>Please indicate why you'd like to book a massage</p>}
                                        </div>
                                        <div className="ui field">
                                            <h5>I give consent to massage the following areas:</h5>
                                            <div>
                                                <input type="checkbox" {...register('consents.glutes')} name="glutes" />
                                                <label>Glutes</label>
                                                <input type="checkbox" {...register('consents.abdomen')} name="abdomen" />
                                                <label>Abdomen</label>
                                                <input type="checkbox" {...register('consents.chest')} name="chest" />
                                                <label>Chest</label>
                                                <input type="checkbox" {...register('consents.innerThighs')} name="innerThighs" />
                                                <label>Inner thighs</label>
                                            </div>
                                        </div>
                                        <div className="ui field">
                                            <label>Are there any other areas you would not like to be massaged?</label>
                                            <input type="text" {...register('consents.areasToAvoid')} name="areasToAvoid" />
                                        </div>
                                    </div>
                                    <button type="submit" onClick={()=>setDateAndTimeAndConsent(appointment?.date, appointment?.time)} className="ui button">Confirm Appointment</button>
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
