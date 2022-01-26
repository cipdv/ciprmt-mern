import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TreatmentPlanDetails from './TreatmentPlanDetails';
import TreatmentPlanList from './TreatmentPlanList';
import Treatment from './Treatment';
import { getTreatmentPlanById, getTreatmentsByClientId, getTreatmentsByTreatmentPlanId } from '../../../actions/treatmentPlans';
import { getUser } from '../../../actions/healthHistory';

const TreatmentPlans = ({user}) => {

    const dispatch = useDispatch()
    const params = useParams()

    const [treatmentId, setTreatmentId] = useState('')

    useEffect(()=>{
        dispatch(getTreatmentPlanById(params?.tpid))
        dispatch(getTreatmentsByTreatmentPlanId(params?.tpid))
        dispatch(getUser(params?.clientid))
    }, [])

    return (
        <div>
            <TreatmentPlanDetails />
            <TreatmentPlanList setTreatmentId={setTreatmentId} />
            <Treatment treatmentId={treatmentId} user={user}/>
        </div>
    )
};

export default TreatmentPlans;
