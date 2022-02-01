import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import styles from './confirmAppointment.module.css'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReceipt } from './PDFReceipt'
import { useSelector } from 'react-redux'
import whitesignature from '../Appointments/rmtsignature/signature (3).png'
import { addToEAL } from '../../../api/index'

const AppointmentReceipt = ({user}) => {

    useEffect(()=>{
        addToEAL({
            typeOfInfo: 'appointment details (date, duration, time, price)',
            actionPerformed: 'viewed',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }, [])

    const params = useParams()

    // const user = JSON.parse(localStorage.getItem('profile'))

    const appointmentArray = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const appointment = appointmentArray?.find(({_id}) => _id === params?.id)

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
        addToEAL({
            typeOfInfo: 'appointment details (date, duration, time, price)',
            actionPerformed: 'PDF downloaded',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }

    return (
        <div className={styles.box}>
            <div style={{textAlign: 'center'}}>
                <h4>Download an official receipt in PDF format: </h4>
                <PDFDownloadLink document={<PDFReceipt appointment={appointment} user={user} />} fileName={appointment?.date}>
                    {({loading}) => loading ? <div>Loading...</div> : <button onClick={addDownloadPDFToEAL} className={styles.btn}>Download PDF</button>}
                </PDFDownloadLink>
            </div>
        <div className={styles.box}>
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
                <div style={{textAlign: 'center'}}>
                    Payment of ${appointment?.price} received for Massage Therapy Treatment for {user?.result?.firstName} {user?.result?.lastName}
                </div>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    Date of Treatment: {appointment?.date}
                </div>
                <div style={{textAlign: 'center'}}>
                    Time of Treatment: {appointment?.time}
                </div>
                <div style={{textAlign: 'center'}}>
                    Duration: {appointment?.duration} minutes
                </div>
                
                <div style={{textAlign: 'center'}}>
                    Payment received from: {user?.result?.firstName} {user?.result?.lastName}
                </div>
                <div style={{textAlign: 'center'}}>
                    Receipt Number: {receiptNumber}
                </div>
            </div>  
            <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <div> 
                    RMT Signature:
                </div>
                <img src={whitesignature} style={{width: '14rem', height: '7rem'}} />
            </div>
        </div>
        </div>
    )
}

export default AppointmentReceipt
