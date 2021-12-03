import React from 'react'
import { useParams } from 'react-router'

const AppointmentReceipt = ({user}) => {

    const params = useParams()

    const appointmentArray = user.result.appointments

    const appointment = appointmentArray.find(({_id}) => _id === params.id)

    return (
        <div>
            <p style={{textAlign: 'center'}}>
                <h4>Cip de Vries, RMT</h4>
                268 Shuter Street, Toronto ON, M5A 1W3
            <br />
                416-258-1230
            </p>
            <p style={{textAlign: 'center'}}>
                Registration Number: U035
            <br />
                HST number: 845 918 200 RT0001
            </p>
            <h5 style={{textAlign: 'center'}}>Official Receipt</h5>
            <div style={{display: 'flex',  justifyContent:'center', textAlign: 'left'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Date of treatment:</th>
                            <td>{appointment.date}</td>
                        </tr>
                        <tr>
                            <th>Time of treatment:</th>
                            <td>{appointment.time}</td>
                        </tr>
                        <tr>
                            <th>Duration:</th>
                            <td>{appointment.duration} minutes</td>
                        </tr>
                        <tr>
                            <th>Payment received:</th>
                            <td>${appointment.price}</td>
                        </tr>
                        <tr>
                            <th>Payment received from:</th>
                            <td>{user.result.firstName} {user.result.lastName}</td>
                        </tr>
                        <tr>
                            <th>Receipt number:</th>
                            <td>{appointment._id}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AppointmentReceipt
