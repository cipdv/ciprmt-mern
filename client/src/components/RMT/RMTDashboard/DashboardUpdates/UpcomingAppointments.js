import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const UpcomingAppointments = ({treatments, users}) => {

    const today = new Date()

    const fullName = (t) => {
        const userList = users?.find(
            u => u?._id === t?.clientId
        );
        return `${userList?.firstName} ${userList?.lastName}`;
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
                    </tr>
                </thead>
                <tbody>
                    {treatments?.map((t)=>(
                        new Date(t?.date) >= today ? (                  
                            <tr>
                                <td>{t?.date}</td>
                                <td>{t?.time}</td>
                                <td>{fullName(t)}</td>
                            </tr>
                    ) : (
                        <div></div>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UpcomingAppointments;
