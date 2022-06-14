import React from 'react';
import { useHistory } from 'react-router-dom';

const UnfinishedTreatmentNotes = ({treatments, users}) => {

    const history = useHistory()
    const today = new Date().toISOString()

    // const fullName = (t) => {
    //     const userList = users?.find(
    //         u => u?._id === t?.clientId
    //     );
    //     return `${userList?.firstName} ${userList?.lastName}`;
    // }

    const goToTreatmentNotes = (clientId, treatmentPlanId) => {
        history.push(`/rmt/dashboard/patient/${clientId}/treatments/${treatmentPlanId}`)
    }

    return (
        <div>
            <h4>Unfinished Treatment Notes</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Client</th>
                        </tr>
                </thead>
                <tbody>
                    {treatments?.map((t)=>(
                        t?.date <= today && !t?.findings ? (                  
                            <tr id={t?._id} onClick={()=>goToTreatmentNotes(t?.clientId, t?.treatmentPlanId)}>
                                <td>{t?.date}</td>
                                {/* <td>{fullName(t)}</td> */}
                                <td>{t?.firstName} {t?.lastName}</td>
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

export default UnfinishedTreatmentNotes;
