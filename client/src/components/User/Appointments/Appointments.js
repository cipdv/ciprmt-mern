import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './confirmAppointment.module.css'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReceipt } from './PDFReceipt'
import cssstyle from './appointments.module.css'
import { getUser } from '../../../actions/healthHistory'
import { useSelector, useDispatch } from 'react-redux'
import { getTreatmentsByClientId } from '../../../actions/treatmentPlans'

const Appointments = ({user}) => {

    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(user?.result._id)) 
        dispatch(getTreatmentsByClientId(user?.result?._id))
    }, [dispatch])

    const appointments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const selectAppointment = (id) => {
        history.push(`/dashboard/appointment/${id}`)
    }

    return (
        appointments?.length !== 0 ? (
            <div className={cssstyle.container}>
                <table className={cssstyle.table} style={{maxWidth: '80rem'}}>
                    <thead>
                        <div>
                        <tr>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Price</th>
                            {/* <th>Download</th> */}
                        </tr>
                        </div>
                    </thead>                      
                    <tbody>
                        {appointments && appointments?.map((appointment) => (
                            appointment?.paymentType !== undefined ? (
                            // <tr key={appointment?._id} onClick={()=>selectAppointment(appointment?._id)}>
                            <div className={cssstyle.tr}>
                            <tr  key={appointment?._id} onClick={()=>selectAppointment(appointment?._id)}>
                                <td>{appointment?.date}</td>
                                <td>{appointment?.duration} minutes</td>
                                <td>${appointment?.price}</td>
                                <td>
                                    <PDFDownloadLink document={<PDFReceipt appointment={appointment} user={user} />} fileName={appointment?.date}>
                                        {({loading}) => (loading ? 
                                        (<div className={cssstyle.loading}>

                                        </div>) : 
                                        (<div>

                                        </div>))}
                                    </PDFDownloadLink>
                                </td>
                            </tr>
                            </div>
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
