//dependencies
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'
import { useHistory, Link } from 'react-router-dom'
import Modal from 'react-modal'
//styling
import styles from './confirmAppointment.module.css'
//api calls
import { confirmTreatment } from '../../../actions/treatmentPlans'
import { addToEAL, emailApptConfirmed } from '../../../api/index'

const ConfirmAppointment = ({user, treatments}) => {

    Modal.setAppElement('#root')

    useEffect(()=>{
        addToEAL({
            typeOfInfo: 'appointment details (date, duration, time, price)',
            actionPerformed: `viewed`,
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }, [])

    const { firstName, lastName } = user?.result

    const dispatch = useDispatch()
    const history = useHistory()
    
    let sensitiveConsentSig = useRef({})

    const { register, handleSubmit, control, formState: { errors } } = useForm()
    
    const today = new Date().toISOString()
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() -1)
    yesterday.toISOString()
    
    const [treatmentConsent, setTreatmentConsent] = useState(false)
    const [glutesConsent, setGlutes] = useState(false)
    const [chestConsent, setChest] = useState(false)
    const [abdomenConsent, setAbdomen] = useState(false)
    const [innerThighsConsent, setInnerThighs] = useState(false)
    const [sensitiveConsentSignature, setSensitiveConsentSignature] = useState('')
    const [areasToAvoid, setAreasToAvoid] = useState('')
    const [apptDate, setApptDate] = useState('')
    const [apptTime, setApptTime] = useState('')
    const [apptId, setApptId] = useState('')
    //modal state
    const [modalIsOpen, setModalisOpen] = useState(false)
    
    const openModal = () => {
        setModalisOpen(true)
    }

    const closeModal = () => {
        setModalisOpen(false)
        history.push('/')
        window.location.reload(false)
    }

    const otherData = {
        consents: {
            treatmentConsent,
            glutesConsent,
            chestConsent,
            abdomenConsent,
            innerThighsConsent,
            areasToAvoid,
            sensitiveConsentSignature
        },
        name: `${firstName} ${lastName}`,
        apptDate,
        apptTime,
        apptId,
    }

    const sensitiveConsentPng = () => {
        setSensitiveConsentSignature(sensitiveConsentSig.current.toDataURL())
    }

    const clearSensitiveConsentSig = (e) => {
        e.preventDefault()
        setSensitiveConsentSignature(sensitiveConsentSig.current.clear())
    }

    const setDateAndTimeAndConsent = (appointmentDate, appointmentTime, appointmentId) => {
        setTreatmentConsent(true)
        setApptDate(appointmentDate)
        setApptTime(appointmentTime)
        setApptId(appointmentId)
    }

    const onSubmit = (data) => {

        const reqBody = {
            data,
            otherData
        }

        dispatch(confirmTreatment(apptId, reqBody))

        //eal non-redux call
        addToEAL({
            typeOfInfo: 'appointment details (consents, covid screening, reason for massage, notes)',
            actionPerformed: `modified`,
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })

        //send email to RMT that client confirmed appt
        emailApptConfirmed({
            treatmentConsent,
            glutesConsent,
            chestConsent,
            abdomenConsent,
            innerThighsConsent,
            areasToAvoid,
            name: `${firstName} ${lastName}`,
            apptDate,
            apptTime,
            reasonForMassage: data.reasonForMassage,
            notes: data.notesFromClient
        })

        openModal()
    }

    if (treatments?.length > 0) {
        return (
            <div className={styles.box} >           
                {treatments && treatments?.map((appointment) => (
                    appointment?.consents?.treatmentConsent !== true ? (                  
                        <div className={styles.box} key={appointment._id} >
                            <h3>Please confirm your appointment on {appointment?.date} at {appointment?.time} for {appointment?.duration} minutes.</h3>
                            <div style={{marginTop: '1rem'}}>
                            <form onSubmit={handleSubmit(onSubmit)}  >
                                <div>
                                    <div>
                                        <label>Reason for booking massage:</label>                                      
                                            <p>
                                                If you have a specific issue, please include the location and nature of the discomfort.
                                          </p>                                     
                                        <input className={styles.forminput} type="text" {...register('reasonForMassage', {required: true})} name="reasonForMassage" placeholder='Eg. Relaxation, pain or discomfort relief, general wellbeing' />               
                                        {errors?.reasonForMassage && <p className={styles.error}>Please indicate why you'd like to book a massage</p>}
                                    </div>
                                    <div style={{marginTop: '2rem'}}>
                                        <p>If there's any other information you'd like me to know before the massage, include it here:</p>
                                        <input className={styles.forminput} type="text" {...register('notesFromClient')} name="notesFromClient" placeholder='eg. recent injuries or surgeries' />
                                    </div>
                                    <div>
                                        <label>Consent</label>
                                        <p style={{fontSize: '13px'}}>Your comfort and safety during your massage are my top priority. There are areas in the body that most people would consider to be sensitive, and RMTs are required to get written consent to assess and treat these areas before every treatment. Consenting through this form to assess and massage the following areas during this appointment does not preclude you from revoking your consent before or during the massage. Please feel welcome to express this at any time during the massage. Your comfort is essential to a successful massage therapy session. </p>
                                        <p><Link target="_blank" to="/dashboard/consentinfo">Click here</Link> to learn more about these areas, what assessment/treatment entails, and why this information is being asked.</p>
                                        <p>Please indicate which of the following areas you give consent at this time to assess and massage:</p>
                                        <div style={{marginLeft: '2rem'}}>
                                            <div>
                                                <label className={styles.container}>Chest wall muscles
                                                    <input type="checkbox" checked={chestConsent} onChange={e=>setChest(e.target.checked)}/>
                                                    <span className={styles.checkmark}></span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className={styles.container}>Abdominal muscles
                                                    <input type="checkbox" checked={abdomenConsent} onChange={e=>setAbdomen(e.target.checked)}/>
                                                    <span className={styles.checkmark}></span>
                                                </label>
                                            </div>
                                            <div>
                                                
                                                <label className={styles.container}>Gluteal muscles (buttocks)
                                                    <input type="checkbox" checked={glutesConsent} onChange={e=>setGlutes(e.target.checked)}/>
                                                    <span className={styles.checkmark}></span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className={styles.container}>Upper inner thigh muscles
                                                    <input type="checkbox" checked={innerThighsConsent} onChange={e=>setInnerThighs(e.target.checked)}/>
                                                    <span className={styles.checkmark}></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop: '2rem'}}>
                                        <p>Are there any other areas you do not want to have massaged during this session?</p>
                                        <input className={styles.forminput} type="text" value={areasToAvoid} onChange={(e)=>setAreasToAvoid(e.target.value)} name="consents.areasToAvoid" placeholder='eg. face, feet, hands'/>
                                    </div>
                                    <div>
                                        <label>Signature</label>
                                        <p>
                                            By signing here, you acknowledge that you have read and understand the information regarding consent and give your informed consent at this time for the assessment and/or treatment of the areas selected above. 
                                        </p>
                                        <SignatureCanvas ref={sensitiveConsentSig} onEnd={sensitiveConsentPng} penColor='black' backgroundColor='white' canvasProps={{width: 300, height: 60, className: 'sigCanvas'}} />
                                        <i class="material-icons-outlined" style={{fontSize: '1rem'}} onClick={clearSensitiveConsentSig}>clear</i>
                                    </div> 
                                </div>
                                <div className={styles.covidsection}>
                                    {/* <h3>Covid-19 Risk Assessment</h3>
                                    <div style={{marginTop: '1rem'}}>
                                        <Link target="_blank" to={'/covidmeasures'}>Click here</Link> to review the current measures Cip de Vries, RMT will be taking to reduce the risk of spreading infectious diseases including Covid-19.
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
                                    </div> */}
                                    <h3>Covid-19 Risk Management</h3>
                                    <p>
                                        Masks are no longer required to be worn by either the RMT or patient during the treatment session. However, if you would like to request that Cip de Vries, RMT wears a mask during the treatment, please notify him before the treatment.
                                    </p>
                                    <p>
                                        If you are exhbiting any symptoms of Covid-19 such as fever, new onset of cough, worsening chronic cough, shortness of breath, decrease or loss of sense of taste or smell, chills, headaches, unexplained fatigue, malaise, or muscle aches, please do not come to your appointment and text Cip de Vries at 416-258-1230 to reschedule your appointment.
                                    </p>
                                </div>
                                <div>
                                    <button className={styles.btn} style={{marginTop: '20px'}} type="submit" onClick={()=>setDateAndTimeAndConsent(appointment?.date, appointment?.time, appointment?._id)}>Confirm Appointment</button>
                                </div>
                            </form>
                            </div>                                
                        </div>
                        ) :
                        (                              
                            <div>
                            </div>
                        ) 
                    ))}       
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={styles.modal}
                >
                    <div>
                        <h3>Thanks for confirming your appointment</h3>
                        <button className={styles.btn} onClick={closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>
                <label>Thanks for registering with Cip de Vries, RMT.</label>
                <p>To set up an appointment, please text Cip de Vries at 416-258-1230.</p>.
            </div>
        )
    }
}

export default ConfirmAppointment
