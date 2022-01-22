import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTreatmentById } from '../../../actions/treatmentPlans'

const Treatments = () => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTreatmentById(params?.tid))
    }, [])

    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatment)
    const treatment = treatments?.treatments?.find(({_id})=> _id === params?.tid)

  return (
      <div>
          {treatment ? (
            <div>
                <h4>Date: {treatment?.date}</h4>
                <h4>Time: {treatment?.time}</h4>
                <h4>Duration: {treatment?.duration} minutes</h4>
            </div>
          ) : (
              <div></div>
          )}
          
      </div>
  );
};

export default Treatments;
