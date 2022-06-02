import React, { useState } from 'react'
import {addToCalendar} from '../../api/index'

const PracticeGoogleCalendar = () => {

    const [dateTime, setDateTime] = useState('')
    const [duration, setDuration] = useState('')

    const data = {
        dateTime: new Date(dateTime).toISOString(),
        duration
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addToCalendar(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Appointment Time</label>
                <input type='datetime-local' value={dateTime} onChange={e=>setDateTime(e.target.value)}/>
                <label>Duration</label>
                <select value={duration} onChange={(e)=>setDuration(e.target.value)}>
                    <option value="" disabled="disabled">Select duration</option>
                    <option value="60">60 minutes ($100)</option>
                    <option value="75">75 minutes ($120)</option>
                    <option value="90">90 minutes ($140)</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
  )
}

export default PracticeGoogleCalendar