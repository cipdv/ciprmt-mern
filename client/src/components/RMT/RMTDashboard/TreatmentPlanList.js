import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams  } from 'react-router-dom'
import { getTreatmentPlanById } from '../../../actions/treatmentPlans'

const TreatmentPlanList = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getTreatmentPlanById(params?.id))
    }, [params])

    const currentTp = useSelector((state)=>state?.treatmentPlanReducer?.currentTreatmentPlan)

    const selectTreatment = (tid) => {
        history.push(`/rmt/dashboard/treatmentplan/${params.id}/treatment/${tid}`)
    }

    return (
        !currentTp ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentTp?.treatments?.map((t)=>(
                        <tr onClick={()=>selectTreatment(t?._id)}>
                            <td>{t?.date}</td>
                            <td>{t?.time}</td>
                            <td>{t?.duration} minutes</td>
                        </tr>
                    )) 
                    }
                    </tbody>
                </table>
            </div>
        )
    )
}

export default TreatmentPlanList
