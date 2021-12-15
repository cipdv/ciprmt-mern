import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addAppointment } from '../../../actions/appointment'

const AddAppointment = ({user}) => {

    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    
    const formData = {
        date,
        time,
        duration,

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addAppointment(params.id, formData))
        history.push(`/rmt/dashboard/patientprofile/${params.id}`)
        clear()
    }

    const clear = () => {
        setDate('')
        setTime('')
        setDuration('')
    }

    return (
        <div>
            <form className="ui form" onSubmit={handleSubmit}>
                <h5 className="ui dividing header">Appointment details</h5>
                <div className="ui fields">
                    <div className="ui field">
                        <label>Date</label>
                        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>
                    <div className="ui field">
                        <label>Time</label>
                        <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
                    </div>
                    <div className="ui field">
                    <label>Duration</label>
                        <select value={duration} onChange={(e)=>setDuration(e.target.value)}>
                            <option value="" disabled="disabled">Select duration</option>
                            <option value="60">60 minutes ($100)</option>
                            <option value="75">75 minutes ($120)</option>
                            <option value="90">90 minutes ($140)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="ui pink button" style={{marginTop: '10px', marginBottom: '20px'}}>Submit</button>
            </form>
        </div>
    )
}

export default AddAppointment
