import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../User/Appointments/confirmAppointment.module.css'
import SignatureCanvas from 'react-signature-canvas'
import { Link } from 'react-router-dom'

const AppointmentConfirmation = () => {
    
    let gluteSig = useRef({})
    let abdomenSig = useRef({})
    let thighSig = useRef({})
    let chestSig = useRef({})

    const { register, handleSubmit, control, formState: { errors } } = useForm()
    
    const today = new Date()
    
    const [treatmentConsent, setTreatmentConsent] = useState(false)
    const [glutes, setGlutes] = useState('')
    const [chest, setChest] = useState('')
    const [abdomen, setAbdomen] = useState('')
    const [innerThighs, setInnerThighs] = useState('')
    // const [areasToAvoid, setAreasToAvoid] = useState('')
    const [apptDate, setApptDate] = useState('')
    const [apptTime, setApptTime] = useState('')
    const [apptId, setApptId] = useState('')

    const otherData = {
        consents: {
            treatmentConsent,
            glutes,
            chest,
            abdomen,
            innerThighs,
        },
        apptDate,
        apptTime,
        apptId
    }

    const abdomenPng = () => {
        setAbdomen(abdomenSig.current.toDataURL())
    }

    const innerThighsPng = () => {
        setInnerThighs(thighSig.current.toDataURL())
    }

    const glutesPng = () => {
        setGlutes(gluteSig.current.toDataURL())
    }

    const chestPng = () => {
        setChest(chestSig.current.toDataURL())
    }

    const clearGlutes = (e) => {
        e.preventDefault()
        setGlutes(gluteSig.current.clear())
    }

    const clearAbdomen = (e) => {
        e.preventDefault()
        setAbdomen(abdomenSig.current.clear())
    }

    const clearChest = (e) => {
        e.preventDefault()
        setChest(chestSig.current.clear())
    }

    const clearInnerThighs = (e) => {
        e.preventDefault()
        setInnerThighs(thighSig.current.clear())
    }

    const setDateAndTimeAndConsent = (appointmentDate, appointmentTime, appointmentId) => {
        setTreatmentConsent(true)
        setApptDate(appointmentDate)
        setApptTime(appointmentTime)
        setApptId(appointmentId)
    }

    const onSubmit = async (data) => {
    }

        return (
            <div >                 
                <div className={styles.box}>
                    <h2>This is a reference only - this is not a functional form</h2>
                </div>          
                        <div className={styles.box} >
                            <h3>Please confirm your appointment on APPOINTMENT DATE HERE at APPOINTMENT TIME HERE for APPOINTMENT DURATION HERE.</h3>
                            <div>
                            <form onSubmit={handleSubmit(onSubmit)}  >
                                <div>
                                    <div>
                                        <label>Reason for booking massage:</label>
                                        <div>
                                            <p style={{fontSize: '13px'}}>
                                                If you have a specific issue, please include the location and nature of the discomfort.
                                            </p>
                                        </div>
                                        <input className={styles.forminput} type="text" {...register('reasonForMassage', {required: true})} name="reasonForMassage" placeholder='Eg. Relaxation, pain or discomfort relief, general wellbeing' />               
                                    </div>
                                    <div>
                                        <label>Please indicate with your initials which of the following areas you give consent at this time to assess and massage:</label>
                                        <div>
                                            <p style={{fontSize: '13px'}}>*Your comfort and safety during your massage are my top priority. Consenting through this form to assess and massage the following areas during this appointment does not preculde you from revoking your consent before or during the massage. Please feel welcome to express this at any time during the massage. Your comfort is essential to a successful massage therapy session. <Link target="_blank" to="/dashboard/consentinfo">Click here to learn more about these areas, what assessment/treatment entails, and why this information is being asked.</Link></p>
                                        </div>
                                        <div>
                                            <div className={styles.initial}>
                                                <label>Glutes </label>
                                                <SignatureCanvas ref={gluteSig} onEnd={glutesPng} penColor='rgb(255, 253, 245)' backgroundColor='rgb(18, 27, 24)' canvasProps={{width: 125, height: 60, className: 'sigCanvas'}} />
                                                <i class="material-icons-outlined" style={{fontSize: '0.8rem'}} onClick={clearGlutes}>clear</i>                                            </div>
                                            <div className={styles.initial}>
                                                <label>Chest</label>
                                                <SignatureCanvas ref={chestSig} onEnd={chestPng} penColor='rgb(255, 253, 245)' backgroundColor='rgb(18, 27, 24)' canvasProps={{width: 125, height: 60, className: 'sigCanvas'}} />
                                                <i class="material-icons-outlined" style={{fontSize: '0.8rem'}} onClick={clearChest}>clear</i>
                                            </div>
                                            <div className={styles.initial}>
                                                <label>Abdomen</label>
                                                <SignatureCanvas ref={abdomenSig} onEnd={abdomenPng} penColor='rgb(255, 253, 245)' backgroundColor='rgb(18, 27, 24)' canvasProps={{width: 125, height: 60, className: 'sigCanvas'}} />
                                                <i class="material-icons-outlined" style={{fontSize: '0.8rem'}} onClick={clearAbdomen}>clear</i>
                                            </div>
                                            <div className={styles.initial}>
                                                <label>Inner Thighs</label>                                      
                                                <SignatureCanvas ref={thighSig} onEnd={innerThighsPng} penColor='rgb(255, 253, 245)' backgroundColor='rgb(18, 27, 24)' canvasProps={{width: 125, height: 60, className: 'sigCanvas'}} />
                                                <i class="material-icons-outlined" style={{fontSize: '0.8rem'}} onClick={clearInnerThighs}>clear</i>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <label>Are there any other areas you do not want to have massaged during this session?</label>
                                        <input className={styles.forminput} type="text" {...register('consents.areasToAvoid')} name="consents.areasToAvoid" placeholder='eg. face, feet, hands'/>
                                    </div>
                                    <div>
                                        <label>If there's any other information you'd like me to know before the massage, include it here:</label>
                                        <input className={styles.forminput} type="text" {...register('additionalNotes')} name="additionalNotes" placeholder='eg. recent injuries or surgeries' />
                                    </div>
                                </div>
                                <div className={styles.covidsection}>
                                    <h2>Covid-19 Risk Assessment</h2>
                                    <div style={{marginTop: '1rem'}}>
                                        <Link to={'/covidmeasures'}>Click here</Link> to review the current measures Cip de Vries, RMT will be taking to reduce the risk of spreading infectious diseases including Covid-19.
                                    </div>
                                    <div>
                                        <label>Please respond to the following:</label>
                                        <div style={{marginLeft: '2rem'}}>
                                            <label className={styles.container}>I have received my second or third dose of the covid-19 vaccine more than 14 days ago.
                                                <input name="covid.vaccinated" type="checkbox" id="vaccinated" {...register('covid.vaccinated')} />
                                                <span className={styles.checkmark}></span>
                                            </label>
                                            <label className={styles.container}>I do not have any of the following symptoms: fever, new onset of cough, worsening chronic cough, shortness of breath, decrease or loss of sense of taste or smell, chills, headaches, unexplained fatigue, malaise, or muscle aches.
                                                <input name="covid.noSymptoms" type="checkbox" id="noSymptoms" {...register('covid.noSymptoms')} />
                                                <span className={styles.checkmark}></span>
                                            </label>
                                            <label className={styles.container}>I have not tested positive for covid-19 in the past 10 days, and have not been in close contact with anyone who has tested positive for covid-19 in the past 10 days, and have not been told that I should be self-isolating.
                                                <input name="covid.notIsolating" type="checkbox" id="notIsolating" {...register('covid.notIsolating')} />
                                                <span className={styles.checkmark}></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className={styles.btn} style={{marginTop: '20px'}} type="submit" >Confirm Appointment</button>
                                </div>
                            </form>
                            </div>                                
                        </div>
                        
                               
            </div>
        )
}

export default AppointmentConfirmation
