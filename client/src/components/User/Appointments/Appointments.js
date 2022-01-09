import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './confirmAppointment.module.css'
import { PDFDownloadLink } from '@react-pdf/renderer'
import AppointmentReceipt from './AppointmentReceipt'
import { PDFReceipt } from './PDFReceipt'
import cssstyle from './appointments.module.css'

const Appointments = ({user}) => {

    const history = useHistory()

    const { appointments } = user?.result

    const selectAppointment = (id) => {
        history.push(`/dashboard/appointment/${id}`)
    }

    const downloadPDF = () => {

    }

    return (
        appointments?.length !== 0 ? (
            <div className={styles.container}>
                <table className={cssstyle.table} style={{width: '50rem'}}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Download</th>
                        </tr>
                    </thead>                      
                    <tbody>
                        {appointments && appointments?.map((appointment) => (
                            appointment?.paymentType !== undefined ? (
                            <tr key={appointment?._id} onClick={()=>selectAppointment(appointment?._id)}>
                                <td>{appointment?.date}</td>
                                <td>{appointment?.duration} minutes</td>
                                <td>${appointment?.price}</td>
                                <td>
                                    <PDFDownloadLink document={<PDFReceipt appointment={appointment} user={user} />} fileName={appointment?.date}>
                                        {({loading}) => (loading ? <div className={cssstyle.loading}>Loading</div> : <button className={cssstyle.btn}>Download PDF</button>)}
                                    </PDFDownloadLink>
                                    
                                </td>
                            </tr>
                            ) : (
                            <div></div>
                            )
                        ))}
                    </tbody>
                </table>
            </div>  
        ) : (
            <div className={styles.container}>
                No appointments
            </div>
        )
    )
}             

export default Appointments
