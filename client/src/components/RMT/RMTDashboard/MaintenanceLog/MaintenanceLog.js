import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMaintenanceLogs } from '../../../../actions/maintenanceLog'
import MaintenanceLogs from './MaintenanceLogs'
import MaintenanceEntry from './MaintenanceEntry'

function MaintenanceLog() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMaintenanceLogs())
    }, [])

    const logs = useSelector((state)=>state?.maintenanceLogReducer?.maintenanceLogs)

    return (
        <>
            <MaintenanceEntry />
            {logs?.length !== 0 ? (
                <MaintenanceLogs logs={logs} />
            ) : (
                <div>Loading . . . </div>
            )
            }
        </>
    )
}

export default MaintenanceLog