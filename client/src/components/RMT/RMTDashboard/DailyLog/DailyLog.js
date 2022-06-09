import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllTreatments } from '../../../../actions/treatmentPlans';

const DailyLog = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getAllTreatments())
    }, [dispatch])

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const selectTreatment = (tpid, clientid) => {
        history.push(`/rmt/dashboard/patient/${clientid}/treatments/${tpid}`)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Client</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments && treatments?.map((t)=>(
                        <tr id={t?._id} onClick={()=>selectTreatment(t?.treatmentPlanId, t?.clientId)} className='form-text-input'>
                            <td>{t?.date}</td>
                            <td>{t?.time}</td>
                            <td>{t?.duration}</td>
                            <td>{t?.firstName} {t?.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DailyLog;
