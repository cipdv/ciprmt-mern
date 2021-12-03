import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { submitAppointmentForm } from '../../../actions/appointment'

const AppointmentForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [reasonForMassage, setReasonForMassage] = useState('')
    const [glutes, setGlutes] = useState(false)
    const [chest, setChest] = useState(false)
    const [abdomen, setAbdomen] = useState(false)
    const [innerThighs, setInnerThighs] = useState(false)
    const [areasToAvoid, setAreasToAvoid] = useState('')

    const formData = {
        date,
        time,
        duration,
        reasonForMassage,
        consents: {
            glutes,
            chest,
            abdomen,
            innerThighs,
            areasToAvoid
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(submitAppointmentForm(formData, history))
        clear()
    }

    const clear = () => {
        setDate('')
        setTime('')
        setDuration('')
        setReasonForMassage('')
        setGlutes(false)
        setChest(false)
        setAbdomen(false)
        setInnerThighs(false)
        setAreasToAvoid('')
    }

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div>
                <h3>Book an appointment</h3>
            </div>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div>
                <label>Time</label>
                <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
            </div>
            <div>
                <label>Select appointment type:</label>
                <select value={duration} onChange={(e)=>setDuration(e.target.value)}>
                    <option value="" disabled="disabled">Select duration</option>
                    <option value="60">60 minutes ($100)</option>
                    <option value="75">75 minutes ($120)</option>
                    <option value="90">90 minutes ($140)</option>
                </select>
            </div>
            <div>
                <label>What is your reason for booking a massage?</label>
                <input type="text" value={reasonForMassage} onChange={(e)=>setReasonForMassage(e.target.value)} />
            </div>
            <div>
                <h4>Consents</h4>
                <h5>Please select the following areas that you are comfortable having massaged:</h5>
                <input type="checkbox" value={glutes} onChange={(e)=>setGlutes(e.target.checked)} />
                <label>Glutes/buttocks</label>
                <input type="checkbox" value={innerThighs} onChange={(e)=>setInnerThighs(e.target.checked)} />
                <label>Inner thighs</label>
                <input type="checkbox" value={abdomen} onChange={(e)=>setAbdomen(e.target.checked)} />
                <label>Abdomen</label>
                <input type="checkbox" value={chest} onChange={(e)=>setChest(e.target.checked)} />
                <label>Chest</label>
                <h5>Are there any areas that you'd like me to avoid massaging during this appointment?</h5>
                <input type="text" value={areasToAvoid} onChange={(e)=>setAreasToAvoid(e.target.value)} />
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
    )
}

export default AppointmentForm
