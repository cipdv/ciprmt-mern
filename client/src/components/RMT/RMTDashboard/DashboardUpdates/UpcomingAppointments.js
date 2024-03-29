import React from 'react';
import { useHistory } from 'react-router-dom';

const UpcomingAppointments = ({treatments, users}) => {

    const today = new Date()

    const history = useHistory()

    // const fullName = (t) => {
    //     const userList = users?.find(
    //         u => u?._id === t?.clientId
    //     );
    //     return `${userList?.firstName} ${userList?.lastName}`;
    // }

    const goToAppointment = (clientId, tpId) => {
        history.push(`/rmt/dashboard/patient/${clientId}/treatments/${tpId}`)
    }

    return (
        <div>
            <h4>Upcoming appointments</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Client</th>
                        <th>Reason for Massage</th>
                        <th>Confirmed</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments?.map((t)=>(
                        new Date(t?.date) >= today ? (                  
                            <tr key={t?._id} onClick={()=>goToAppointment(t?.clientId, t?.treatmentPlanId)}>
                                <td>{t?.date}</td>
                                <td>{t?.time}</td>
                                <td>{t?.firstName} {t?.lastName}</td>
                                <td>{t?.reasonForMassage}</td>
                                <td>{t?.consents?.treatmentConsent ? ('yes') : ('no')}</td>
                            </tr>
                    ) : (
                        <tr></tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UpcomingAppointments;
