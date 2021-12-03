import React from 'react'
import { useHistory } from 'react-router-dom'

const Appointments = ({user}) => {

    const history = useHistory()

    const { appointments } = user?.result

    const selectAppointment = (id) => {
        history.push(`/dashboard/appointment/${id}`)
    }

    return (
        appointments?.length !== 0 ? (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Price</th>
                    </tr>
                </thead>                      
                <tbody>
                    {appointments && appointments?.map((appointment) => (
                        appointment?.paymentType !== undefined ? (
                        <tr key={appointment?._id} onClick={()=>selectAppointment(appointment?._id)}>
                            <td>{appointment?.date}</td>
                            <td>{appointment?.duration}</td>
                            <td>{appointment?.price}</td>
                        </tr>
                        ) : (
                        <div></div>
                        )
                    ))}
                </tbody>
            </table>  
        ) : (
            <div>
                No appointments
            </div>
        )
    )
}             

export default Appointments
