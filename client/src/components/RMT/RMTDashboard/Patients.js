import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './rmtdashboard.module.css'

const Patients = () => {

    const patients = useSelector((state)=>state?.usersReducer?.searchResults)
    const history = useHistory()

    const selectPatient = (id) => {
        history.push(`/rmt/dashboard/patientprofile/${id}`)
    }

    return (
        patients && patients?.length !== 0 ? (
            <table>
                <thead>
                    <tr className={styles.row}>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients && patients.map((patient)=>(
                        <tr key={patient?._id} onClick={()=>selectPatient(patient?._id)}>
                            <td className={styles.tablerow}>{patient?.firstName} {patient?.lastName}</td>
                            <td className={styles.tablerow}>{patient?.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div>
                
            </div>
        )
    )
}

export default Patients
