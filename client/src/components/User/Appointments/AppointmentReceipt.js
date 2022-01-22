import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import styles from './confirmAppointment.module.css'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReceipt } from './PDFReceipt'

const AppointmentReceipt = ({user}) => {

    useEffect(()=>{
        axios.post('http://localhost:5000/electronicauditlog', {
            typeOfInfo: 'appointment details (date, duration, time, price)',
            actionPerformed: 'viewed',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }, [])

    const params = useParams()

    // const user = JSON.parse(localStorage.getItem('profile'))

    const appointmentArray = user?.result?.appointments

    const appointment = appointmentArray.find(({_id}) => _id === params?.id)

    const apptId = appointment?._id
    const receiptNumber = apptId?.toUpperCase()

    const data = {
        date: appointment?.date,
        time: appointment?.time,
        duration: appointment?.duration,
        price: appointment?.price,
        firstName: appointment?.firstName,
        lastName: appointment?.lastName,
        receiptNumber
    }

    // const createPDF = () => {

    //     // fetch('/createpdf', {
    //     //     method: "POST",
    //     //     body: JSON.stringify(data)
    //     // }).then((res)=>{
    //     //     res.arrayBuffer().then((res)=>{
    //     //         var blob = new Blob([res], {type: "application/pdf"})
    //     //         saveAs(blob, 'receipt.pdf')
    //     //     })
    //     // })

    //     axios.post('/createpdf', data)
    //         .then(()=> axios.get('fetchpdf', {responseType: 'blob'}))
    //         .then((res)=>{
    //             const pdfBlob = new Blob([res.data], {type: 'application/pdf' })

    //             saveAs(pdfBlob, 'receipt.pdf')
    //         })
    // }
    
    const addDownloadPDFToEAL = () => {
        axios.post('http://localhost:5000/electronicauditlog', {
            typeOfInfo: 'appointment details (date, duration, time, price)',
            actionPerformed: 'PDF downloaded',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }

    return (
        <div className={styles.box}>
        <div >
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
            <h5 style={{textAlign: 'center'}}>Appointment Details</h5>
            <div style={{display: 'grid',  justifyContent:'center', textAlign: 'left'}}>
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
                            <td>{receiptNumber}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div>
                <PDFDownloadLink document={<PDFReceipt appointment={appointment} user={user} />} fileName={appointment?.date}>
                    {({loading}) => loading ? <div>Loading...</div> : <button onClick={addDownloadPDFToEAL} className={styles.btn}>Download PDF</button>}
                </PDFDownloadLink>
            </div>
        </div>
        </div>
    )
}

export default AppointmentReceipt
