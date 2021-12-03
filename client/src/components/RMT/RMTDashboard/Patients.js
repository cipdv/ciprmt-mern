import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Patients = () => {

    const patients = useSelector((state)=>state?.usersReducer?.users)
    const history = useHistory()

    const selectPatient = (id) => {
        history.push(`/rmt/dashboard/patientprofile/${id}`)
    }

    return (
        patients?.length !== 0 ? (
            <table className="ui celled selectable compact table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {patients && patients.map((patient)=>(
                        <tr key={patient?._id} onClick={()=>selectPatient(patient?._id)}>
                            <td>{patient?.firstName}</td>
                            <td>{patient?.email}</td>
                            {!patient?.healthHistory[0] ? (
                                <td>No phone number</td>
                            ) : (
                                <td>{patient?.healthHistory[0]?.phoneNumber}</td>
                            )}
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
