import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewHealthHistory, getClientHealthHistory } from '../../../actions/healthHistory'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import styles from './hhform.module.css'
import { addToEAL } from '../../../api/index'

const RFHHHForm = ({user}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    
    useEffect(()=>{
        dispatch(getClientHealthHistory(user?.result?._id))
        addToEAL({
            typeOfInfo: `health history record`,
            actionPerformed: 'viewed',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
    }, [dispatch])

    const healthHistoryData = useSelector((state)=>state?.healthHistoryReducer?.healthHistoryData)
    const mostRecentHealthHistory = healthHistoryData[healthHistoryData?.length - 1]

    const onSubmit = (data) => {
        dispatch(addNewHealthHistory(data))
        addToEAL({
            typeOfInfo: `health history record`,
            actionPerformed: 'modified',
            accessedBy: `${user?.result?.firstName} ${user?.result?.lastName}`,
            whoseInfo: `${user?.result?.firstName} ${user?.result?.lastName}`
        })
        history.push('/')
    }

    return (
        <div >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
                <div className={styles.section}>
                    <h2>Personal information:</h2>
                    <div>
                        <label htmlFor='occupation'>Occupation</label>
                        <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.occupation} type='text' {...register('occupation', {required: true})} name='occupation' id='occupation'  />
                        {errors?.occupation && <p className={styles.error}>Occupation required. If none currently, type "none"</p>}
                    </div>
                    <div style={{columnCount: '2'}}>
                        <div>
                            <label htmlFor='pronouns'>Pronouns</label>
                            <select className={styles.forminput}  defaultValue={mostRecentHealthHistory?.pronouns} {...register('pronouns', {required: true})} name='pronouns' id='pronouns'>
                                <option value="">Select pronouns</option>
                                <option value="they/them">They/them</option>
                                <option value="she/her">She/her</option>
                                <option value="he/him">He/him</option>
                                <option value="other">Other</option>
                            </select>
                            {errors?.pronouns && <p className={styles.error}>Pronouns required</p>}
                        </div>
                        <div>
                            <label htmlFor='dateOfBirth'>Date of birth</label>
                            <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.dateOfBirth ? (moment.utc(mostRecentHealthHistory?.dateOfBirth).format("YYYY-MM-DD")) : ('')} type="date" {...register('dateOfBirth', {required: true})} name='dateOfBirth' id='dateOfBirth' />
                            {errors?.dateOfBirth && <p className={styles.error}>Date of birth required</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Contact info:</h2>
                    <div>
                        <label>Phone number</label>
                        <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.phoneNumber} type="text" {...register('phoneNumber', {required: true})} name='phoneNumber' id='phoneNumber' />
                        {errors?.phoneNumber && <p className={styles.error}>Phone number required</p>}
                    </div>
                    <h3 style={{marginBottom: '0px'}}>Address</h3>
                    <div style={{columnCount: '2'}}> 
                        <div className={styles.inlineforminput}>
                            <label>Street number</label>
                            <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.address?.streetNumber} name="addressStreetNumber" type="text" {...register('address.streetNumber', {required: true})} id='addressStreetNumber' />
                            
                        </div>    
                        <div className={styles.inlineforminput}>
                            <label>Street name</label>
                            <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.address?.streetName} name="addressStreetName" type="text" {...register('address.streetName', {required: true})} id="addressStreetName" />
                        </div>
                    </div>
                    {errors?.address?.streetNumber && <p className={styles.error}>Street number required</p>}
                    {errors?.address?.streetName && <p className={styles.error}>Street name required</p>}
                    <div style={{columnCount: '2'}}>
                        <div className={styles.inlineforminput}>                   
                            <label>City</label>
                            <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.address?.city} name="city" type="text" {...register('address.city', {required: true})} id="city" />
                        </div>
                        <div className={styles.inlineforminput}>                   
                            <label>Province</label>
                            <select className={styles.forminput} defaultValue={mostRecentHealthHistory?.address?.province} name="addressProvince" {...register('address.province', {required: true})} id='province'>
                                <option value="">Select your province</option>
                                <option value="ON">Ontario</option>
                                <option value="AB">Alberta</option>
                                <option value="BC">British Columbia</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="MB">Manitoba</option>
                                <option value="QB">Quebec</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NF">Newfoundland</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="YK">Yukon</option>
                                <option value="NV">Nunavut</option>
                                <option value="US">USA</option>
                            </select>
                        </div>   
                    </div>
                    {errors?.address?.province && <p className={styles.error}>Province required</p>}
                    {errors?.address?.city && <p className={styles.error}>City required</p>}
            </div>
            <div className={styles.section}>
                <h2>Doctor's contact info:</h2>
                <div>
                    <label className={styles.container}>I don't currently have a family doctor
                        <input defaultChecked={mostRecentHealthHistory?.noDoctor} name="noDoctor" type="checkbox" id="noDoctor" {...register('noDoctor')} /> 
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <div>
                    <label>Doctor's name</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.doctor?.doctorName} name="doctorName" type="text" {...register('doctor.doctorName', {required: true})} id='doctorName' />
                    {errors?.doctor?.doctorName && <p className={styles.error}>Please provide your doctor's full name. If you don't currently have a doctor, put "none."</p>}
                </div>
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>
                        <label>Street Number</label>
                        <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.doctor?.doctorAddress?.doctorStreetNumber} name="doctorStreetNumber" type="text" id ='doctorStreetNumber' {...register('doctor.doctorAddress.doctorStreetNumber')} />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Street name</label>
                        <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.doctor?.doctorAddress?.doctorStreetName} name="doctorStreetName" type="text" id='doctorStreetName' {...register('doctor.doctorAddress.doctorStreetName', {required: true})} />
                    </div>
                </div>
                {errors?.doctor?.doctorAddress?.doctorStreetNumber && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field</p>}
                {errors?.doctor?.doctorAddress?.doctorStreetName && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field.</p>}
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>  
                        <label>City</label>
                        <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.doctor?.doctorAddress?.doctorCity} name="doctorCity" type="text" id='doctorCity' {...register('doctor.doctorAddress.doctorCity', {required: true})} />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Province</label>
                        <select className={styles.forminput} defaultValue={mostRecentHealthHistory?.doctor?.doctorAddress?.doctorProvince} name="doctorProvince" id="doctorProvince" {...register('doctor.doctorAddress.doctorProvince', {required: true})} >
                            <option value="">Select province</option>
                            <option value="ON">Ontario</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="MB">Manitoba</option>
                            <option value="QB">Quebec</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NF">Newfoundland</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="NT">Northwest Territories</option>
                            <option value="YK">Yukon</option>
                            <option value="NV">Nunavut</option>
                            <option value="US">USA</option>
                        </select> 
                    </div>
                </div>
                {errors?.doctor?.doctorAddress?.doctorCity && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field.</p>}
                {errors?.doctor?.doctorAddress?.doctorProvince && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field.</p>}
            </div>
            <div className={styles.section}>
                <h2>Health history:</h2>
                <div>
                    <label>How would you describe your overall health</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.generalHealth} name="generalHealth" placeholder="For example: 'excellent, I exercise and eat well'" {...register('generalHealth', {required: true})} id='generalHealth' />
                    {errors?.generalHealth && <p className={styles.error}>Please give a brief description of your general health</p>}
                </div>
                <div>
                    <label>What is your history with massage therapy?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.historyOfMassage} name="historyOfMassage" placeholder="For example: 'I usually get 5-6 massages per year'" type="text" id="historyOfMassage" {...register('historyOfMassage', {required: true})} />
                    {errors?.historyOfMassage && <p className={styles.error}>Please provide a brief description of your history with massage</p>}
                </div>
                <div>
                    <label>Have you received any treatment from another Health Care Provider in the past year?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.otherHCP} name="otherHCP" placeholder="For example: physiotherapy, chiropractic, osteopathy" type="text" id="otherHCP" {...register('otherHCP')} />
                </div>
                <div>
                    <label>Have you had any injuries in the past year?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.injuries} name="injuries" placeholder="For example: ankle sprains, muscle strains, disc herniation" type="text" id="injuries" {...register('injuries')} />
                </div>
                <div>
                    <label>Have you had any surgeries in the past 2 years?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.surgeries} name="surgeries" placeholder="Please list any surgeries you've had" type="text" id="surgeries" {...register('surgeries')} />
                </div>
                <div >
                    <label>Do you have any of the following medical conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Epilepsy
                            <input defaultChecked={mostRecentHealthHistory?.epilepsy} name="epilepsy" type="checkbox" id="epilepsy" {...register('epilepsy')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Diabetes
                            <input defaultChecked={mostRecentHealthHistory?.diabetes} name="diabetes" type="checkbox" id="diabetes" {...register('diabetes')} /> 
                            <span className={styles.checkmark}></span>
                        </label>                        
                        <label className={styles.container}>
                            Cancer
                            <input defaultChecked={mostRecentHealthHistory?.cancer} name="cancer" type="checkbox" id="cancer" {...register('cancer')} />
                            <span className={styles.checkmark}></span>
                        </label>                                               
                        <label className={styles.container}>
                            Arthritis
                            <input defaultChecked={mostRecentHealthHistory?.arthritis} name="arthritis" type="checkbox" id="arthritis" {...register('arthritis')} />
                            <span className={styles.checkmark}></span>
                        </label >  
                        <label className={styles.container}>
                            Family history of arthritis
                            <input defaultChecked={mostRecentHealthHistory?.arthritisFamilyHistory} name="arthritisFamilyHistory" type="checkbox" id="arthritisFamilyHistory" {...register('arthritisFamilyHistory')} />
                            <span className={styles.checkmark}></span>
                        </label >                                     
                        <label className={styles.container}>
                            Chronic Headaches
                            <input defaultChecked={mostRecentHealthHistory?.chronicHeadaches} name="chronicHeadaches" type="checkbox" id="chronicHeadaches" {...register('chronicHeadaches')} />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Migraine Headaches
                            <input defaultChecked={mostRecentHealthHistory?.migraineHeadaches} name="migraineHeadaches" type="checkbox" id="migraineHeadaches" {...register('migraineHeadaches')} />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Vision Loss
                            <input defaultChecked={mostRecentHealthHistory?.visionLoss} name="visionLoss" type="checkbox" id="visionLoss" {...register('visionLoss')} />
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Hearing Loss
                            <input defaultChecked={mostRecentHealthHistory?.hearingLoss} name="hearingLoss" type="checkbox" id="hearingLoss" {...register('hearingLoss')} />
                            <span className={styles.checkmark}></span>
                        </label>                                    
                        <label className={styles.container}>
                            Osteoporosis
                            <input defaultChecked={mostRecentHealthHistory?.osteoporosis} name="osteoporosis" type="checkbox" id="osteoporosis" {...register('osteoporosis')} />
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Haemophilia
                            <input defaultChecked={mostRecentHealthHistory?.haemophilia} name="haemophilia" type="checkbox" id="haemophilia" {...register('haemophilia')} />
                            <span className={styles.checkmark}></span>
                        </label>                     
                    </div>    
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label >Do you have any of the following cardiovascular conditions?</label>
                    <div style={{marginLeft: '1.5rem'}} >
                        <label className={styles.container}>High blood pressure                 
                            <input  defaultChecked={mostRecentHealthHistory?.highBloodPressure} name="highBloodPressure" type="checkbox" id="highBloodPressure" {...register('highBloodPressure')} />
                            <span className={styles.checkmark}></span>
                        </label> 
                        <label className={styles.container}>Low blood pressure
                            <input defaultChecked={mostRecentHealthHistory?.lowBloodPressure} name="lowBloodPressure" type="checkbox" id="lowBloodPressure" {...register('lowBloodPressure')} />
                            <span className={styles.checkmark}></span>
                        </label>     
                        <label className={styles.container}>History of heart attacks              
                            <input defaultChecked={mostRecentHealthHistory?.heartAttack} name="heartAttack" type="checkbox" id="heartAttack" {...register('heartAttack')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Stroke                  
                            <input defaultChecked={mostRecentHealthHistory?.stroke} name="stroke" type="checkbox" id="stroke" {...register('stroke')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Vericose Veins
                            <input defaultChecked={mostRecentHealthHistory?.vericoseVeins} name="vericoseVeins" type="checkbox" id="vericoseVeins" {...register('vericoseVeins')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Pacemaker
                            <input defaultChecked={mostRecentHealthHistory?.pacemaker} name="pacemaker" type="checkbox" id="pacemaker" {...register('pacemaker')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Heart disease
                            <input defaultChecked={mostRecentHealthHistory?.heartDisease} name="heartDisease" type="checkbox" id="heartDisease" {...register('heartDisease')} />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label>Do you have any of the following respiratory conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Chronic cough
                            <input defaultChecked={mostRecentHealthHistory?.chronicCough} name="chronicCough" type="checkbox" id="chronicCough" {...register('chronicCough')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Bronchitis
                            <input defaultChecked={mostRecentHealthHistory?.bronchitis} name="bronchitis" type="checkbox" id="bronchitis" {...register('bronchitis')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Asthma
                            <input defaultChecked={mostRecentHealthHistory?.asthma} name="asthma" type="checkbox" id="asthma" {...register('asthma')} />
                            <span className={styles.checkmark}></span>
                        </label>  
                        <label className={styles.container}>Emphysema
                            <input defaultChecked={mostRecentHealthHistory?.emphysema} name="emphysema" type="checkbox" id="emphysema" {...register('emphysema')} />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>  
                </div> 
                <div>
                    <label>Do you have any internal pins, wires, artificial joints or special equipment?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.internalEquipment} name="internalEquipment" placeholder='Please describe the type of equipment and location and approximate date of implementation' type="text" id="internalEquipment" {...register('internalEquipment')} />
                </div>
                <div>
                    <label>Do you have any skin conditions?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.skinConditions} name="skinConditions" placeholder="Please list any skin conditions you have" type="text" id="skinConditions" {...register('skinConditions')} />
                </div>
                <div>
                    <label>Do you have any infectious conditions?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.infectiousConditions} name="infectiousConditions" placeholder="For example: hepatitis, HIV" type="text" id="infectiousConditions" {...register('infectiousConditions')} />
                </div>
                <div>
                    <label>Please describe any loss of feeling, numbness, or tingling you are experiencing:</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.lossOfFeeling} name="lossOfFeeling" placeholder="For example: tingling down arm, or leg" type="text" id="lossOfFeeling" {...register('lossOfFeeling')} />
                </div>
                <div>
                    <label>Please list any allergies that you have:</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.allergies} name="allergies" placeholder="List all allergies" type="text" id="allergies" {...register('allergies')} />
                </div>
                <div>
                    <label>Please list any medications you are currently taking:</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.medications} name="medications" placeholder="Please list all medications you're currently taking" type="text" id="medications" {...register('medications')} />
                </div>
                <div>
                    <label>Are you currently pregnant?</label>
                    <select className={styles.forminput} defaultValue={mostRecentHealthHistory?.pregnant} name="pregnant" id="pregnant" {...register('pregnant')}>
                        <option value="">Select a value</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="na">Not applicable</option>
                    </select>
                </div>
                <div>
                    <label>Do you have any other health conditions, medical conditions, or gynecological conditions?</label>
                    <input className={styles.forminput} defaultValue={mostRecentHealthHistory?.otherMedicalConditions} name="otherMedicalConditions" placeholder="Please list anything not listed above" type="text" id="otherMedicalConditions" {...register('otherMedicalConditions')} />
                </div>
                <div className={styles.section}>
                    <h2>Source of Referral</h2>
                    <label>How did you hear about Cip de Vries, RMT?</label>
                    <input type="text" className={styles.forminput} defaultValue={mostRecentHealthHistory?.sourceOfReferral} name="sourceOfReferral" id="sourceOfReferral" placeholder='Eg. Google, Facebook, etc. If referred by a friend or medical professional, please provide their name here' {...register('sourceOfReferral')} />
                </div>
                <div className={styles.section}>
                    <h2>Policies: Cancellations, Privacy, and Harassment</h2>
                    <div style={{marginLeft: '1.5rem', marginTop: '1rem'}}> 
                        <Link className={styles.link} target="_blank" to="/privacypolicy">Click here to read the policies for cancellation, privacy, and harassment.</Link>
                        <label className={styles.container}>By clicking here you are indicating that you have read and agree to the aforementioned policies.
                            <input defaultChecked={mostRecentHealthHistory?.privacyPolicy} name="privacyPolicy" type="checkbox" id="privacyPolicy" {...register('privacyPolicy', {required: true})} />
                            <span className={styles.checkmark}></span>
                        </label>
                        {errors?.privacyPolicy && <p className={styles.error}>You must agree to the privacy policy to book a massage.</p>}
                    </div>
                    
                </div>
            </div>
            <input type='submit' className={styles.btn} />
        </form>
    </div>
    )          
}

export default RFHHHForm
