import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitHH, updateUser } from '../../../actions/healthHistory'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import styles from './hhform.module.css'

const RFHHHForm = () => {

    const userState = useSelector((state)=>state?.authReducer?.authData?.result)

    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const history = useHistory()

    const healthHistory = userState?.healthHistory[0]
    const userId = userState?._id

    const onSubmit = (data) => {
        dispatch(submitHH(data))
        dispatch(updateUser(userId))
        history.push(`/dashboard`)
    }
    

    return (
        !userState ? (
            <div>Loading . . .</div>
        ) : (
        <div className={styles.environment}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={styles.section}>
                    <h2>Personal information:</h2>
                    <div>
                        <label htmlFor='occupation'>Occupation</label>
                        <input className={styles.forminput} defaultValue={healthHistory?.occupation} type='text' {...register('occupation', {required: true})} name='occupation' id='occupation'  />
                        {errors?.occupation && <p className={styles.error}>Occupation required. If none currently, type "none"</p>}
                    </div>
                    <div style={{columnCount: '2'}}>
                        <div>
                            <label htmlFor='pronouns'>Pronouns</label>
                            <select className={styles.forminput}  defaultValue={healthHistory?.pronouns} {...register('pronouns', {required: true})} name='pronouns' id='pronouns'>
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
                            <input className={styles.forminput} defaultValue={healthHistory?.dateOfBirth ? (moment.utc(healthHistory?.dateOfBirth).format("YYYY-MM-DD")) : ('')} type="date" {...register('dateOfBirth', {required: true})} name='dateOfBirth' id='dateOfBirth' />
                            {errors?.dateOfBirth && <p className={styles.error}>Date of birth required</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Contact info:</h2>
                    <div>
                        <label>Phone number</label>
                        <input className={styles.forminput} defaultValue={healthHistory?.phoneNumber} type="text" {...register('phoneNumber', {required: true})} name='phoneNumber' id='phoneNumber' />
                        {errors?.phoneNumber && <p className={styles.error}>Phone number required</p>}
                    </div>
                    <h3 style={{marginBottom: '0px'}}>Address</h3>
                    <div style={{columnCount: '2'}}> 
                        <div className={styles.inlineforminput}>
                            <label>Street number</label>
                            <input className={styles.forminput} defaultValue={healthHistory?.address?.streetNumber} name="addressStreetNumber" type="text" {...register('address.streetNumber', {required: true})} id='addressStreetNumber' />
                            
                        </div>    
                        <div className={styles.inlineforminput}>
                            <label>Street name</label>
                            <input className={styles.forminput} defaultValue={healthHistory?.address?.streetName} name="addressStreetName" type="text" {...register('address.streetName', {required: true})} id="addressStreetName" />
                        </div>
                    </div>
                    {errors?.address?.streetNumber && <p className={styles.error}>Street number required</p>}
                    {errors?.address?.streetName && <p className={styles.error}>Street name required</p>}
                    <div style={{columnCount: '2'}}>
                        <div className={styles.inlineforminput}>                   
                            <label>City</label>
                            <input className={styles.forminput} defaultValue={healthHistory?.address?.city} name="city" type="text" {...register('address.city', {required: true})} id="city" />
                        </div>
                        <div className={styles.inlineforminput}>                   
                            <label>Province</label>
                            <select className={styles.forminput} defaultValue={healthHistory?.address?.province} name="addressProvince" {...register('address.province', {required: true})} id='province'>
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
                    <label>Doctor's name</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.doctor?.doctorName} name="doctorName" type="text" {...register('doctor.doctorName', {required: true})} id='doctorName' />
                    {errors?.doctor?.doctorName && <p className={styles.error}>Please provide your doctor's full name. If you don't currently have a doctor, put "none."</p>}
                </div>
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>
                        <label>Street Number</label>
                        <input className={styles.forminput} defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetNumber} name="doctorStreetNumber" type="text" id ='doctorStreetNumber' {...register('doctor.doctorAddress.doctorStreetNumber')} />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Street name</label>
                        <input className={styles.forminput} defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetName} name="doctorStreetName" type="text" id='doctorStreetName' {...register('doctor.doctorAddress.doctorStreetName', {required: true})} />
                    </div>
                </div>
                {errors?.doctor?.doctorAddress?.doctorStreetNumber && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field</p>}
                {errors?.doctor?.doctorAddress?.doctorStreetName && <p className={styles.error}>Doctor address required. If you don't currently have a doctor, put "none" into each field.</p>}
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>  
                        <label>City</label>
                        <input className={styles.forminput} defaultValue={healthHistory?.doctor?.doctorAddress?.doctorCity} name="doctorCity" type="text" id='doctorCity' {...register('doctor.doctorAddress.doctorCity', {required: true})} />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Province</label>
                        <select className={styles.forminput} defaultValue={healthHistory?.doctor?.doctorAddress?.doctorProvince} name="doctorProvince" id="doctorProvince" {...register('doctor.doctorAddress.doctorProvince', {required: true})} >
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
                    <input className={styles.forminput} defaultValue={healthHistory?.generalHealth} name="generalHealth" placeholder="For example: 'excellent, I exercise and eat well'" {...register('generalHealth', {required: true})} id='generalHealth' />
                    {errors?.generalHealth && <p className={styles.error}>Please give a brief description of your general health</p>}
                </div>
                <div>
                    <label>What is your history with massage therapy?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.historyOfMassage} name="historyOfMassage" placeholder="For example: 'I usually get 5-6 massages per year'" type="text" id="historyOfMassage" {...register('historyOfMassage', {required: true})} />
                    {errors?.historyOfMassage && <p className={styles.error}>Please provide a brief description of your history with massage</p>}
                </div>
                <div>
                    <label>Have you received any treatment from another Health Care Provider in the past year?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.otherHCP} name="otherHCP" placeholder="For example: physiotherapy, chiropractic, osteopathy" type="text" id="otherHCP" {...register('otherHCP')} />
                </div>
                <div>
                    <label>Have you had any injuries in the past year?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.injuries} name="injuries" placeholder="For example: ankle sprains, muscle strains, disc herniation" type="text" id="injuries" {...register('injuries')} />
                </div>
                <div>
                    <label>Have you had any surgeries in the past 2 years?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.surgeries} name="surgeries" placeholder="Please list any surgeries you've had" type="text" id="surgeries" {...register('surgeries')} />
                </div>
                <div >
                    <label>Do you have any of the following medical conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Epilepsy
                            <input defaultChecked={healthHistory?.epilepsy} name="epilepsy" type="checkbox" id="epilepsy" {...register('epilepsy')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Diabetes
                            <input defaultChecked={healthHistory?.diabetes} name="diabetes" type="checkbox" id="diabetes" {...register('diabetes')} /> 
                            <span className={styles.checkmark}></span>
                        </label>                        
                        <label className={styles.container}>
                            Cancer
                            <input defaultChecked={healthHistory?.cancer} name="cancer" type="checkbox" id="cancer" {...register('cancer')} />
                            <span className={styles.checkmark}></span>
                        </label>                                               
                        <label className={styles.container}>
                            Arthritis
                            <input defaultChecked={healthHistory?.arthritis} name="arthritis" type="checkbox" id="arthritis" {...register('arthritis')} />
                            <span className={styles.checkmark}></span>
                        </label >                                      
                        <label className={styles.container}>
                            Chronic Headaches
                            <input defaultChecked={healthHistory?.chronicHeadaches} name="chronicHeadaches" type="checkbox" id="chronicHeadaches" {...register('chronicHeadaches')} />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Migraine Headaches
                            <input defaultChecked={healthHistory?.migraineHeadaches} name="migraineHeadaches" type="checkbox" id="migraineHeadaches" {...register('migraineHeadaches')} />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Vision Loss
                            <input defaultChecked={healthHistory?.visionLoss} name="visionLoss" type="checkbox" id="visionLoss" {...register('visionLoss')} />
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Hearing Loss
                            <input defaultChecked={healthHistory?.hearingLoss} name="hearingLoss" type="checkbox" id="hearingLoss" {...register('hearingLoss')} />
                            <span className={styles.checkmark}></span>
                        </label>                                    
                        <label className={styles.container}>
                            Osteoporosis
                            <input defaultChecked={healthHistory?.osteoporosis} name="osteoporosis" type="checkbox" id="osteoporosis" {...register('osteoporosis')} />
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Haemophilia
                            <input defaultChecked={healthHistory?.haemophilia} name="haemophilia" type="checkbox" id="haemophilia" {...register('haemophilia')} />
                            <span className={styles.checkmark}></span>
                        </label>                     
                    </div>    
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label >Do you have any of the following cardiovascular conditions?</label>
                    <div style={{marginLeft: '1.5rem'}} >
                        <label className={styles.container}>High blood pressure                 
                            <input  defaultChecked={healthHistory?.highBloodPressure} name="highBloodPressure" type="checkbox" id="highBloodPressure" {...register('highBloodPressure')} />
                            <span className={styles.checkmark}></span>
                        </label> 
                        <label className={styles.container}>Low blood pressure
                            <input defaultChecked={healthHistory?.lowBloodPressure} name="lowBloodPressure" type="checkbox" id="lowBloodPressure" {...register('lowBloodPressure')} />
                            <span className={styles.checkmark}></span>
                        </label>     
                        <label className={styles.container}>History of heart attacks              
                            <input defaultChecked={healthHistory?.heartAttack} name="heartAttack" type="checkbox" id="heartAttack" {...register('heartAttack')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Stroke                  
                            <input defaultChecked={healthHistory?.stroke} name="stroke" type="checkbox" id="stroke" {...register('stroke')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Vericose Veins
                            <input defaultChecked={healthHistory?.vericoseVeins} name="vericoseVeins" type="checkbox" id="vericoseVeins" {...register('vericoseVeins')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Pacemaker
                            <input defaultChecked={healthHistory?.pacemaker} name="pacemaker" type="checkbox" id="pacemaker" {...register('pacemaker')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Heart disease
                            <input defaultChecked={healthHistory?.heartDisease} name="heartDisease" type="checkbox" id="heartDisease" {...register('heartDisease')} />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label>Do you have any of the following respiratory conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Chronic cough
                            <input defaultChecked={healthHistory?.chronicCough} name="chronicCough" type="checkbox" id="chronicCough" {...register('chronicCough')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Bronchitis
                            <input defaultChecked={healthHistory?.bronchitis} name="bronchitis" type="checkbox" id="bronchitis" {...register('bronchitis')} />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Asthma
                            <input defaultChecked={healthHistory?.asthma} name="asthma" type="checkbox" id="asthma" {...register('asthma')} />
                            <span className={styles.checkmark}></span>
                        </label>  
                        <label className={styles.container}>Emphysema
                            <input defaultChecked={healthHistory?.emphysema} name="emphysema" type="checkbox" id="emphysema" {...register('emphysema')} />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>  
                </div> 
                <div>
                    <label>Do you have any skin conditions?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.skinConditions} name="skinConditions" placeholder="Please list any skin conditions you have" type="text" id="skinConditions" {...register('skinConditions')} />
                </div>
                <div>
                    <label>Do you have any infectious conditions?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.infectiousConditions} name="infectiousConditions" placeholder="For example: hepatitis, HIV" type="text" id="infectiousConditions" {...register('infectiousConditions')} />
                </div>
                <div>
                    <label>Please describe any loss of feeling, numbness, or tingling you are experiencing:</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.lossOfFeeling} name="lossOfFeeling" placeholder="For example: tingling down arm, or leg" type="text" id="lossOfFeeling" {...register('lossOfFeeling')} />
                </div>
                <div>
                    <label>Please list any allergies that you have:</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.allergies} name="allergies" placeholder="List all allergies" type="text" id="allergies" {...register('allergies')} />
                </div>
                <div>
                    <label>Please list any medications you are currently taking:</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.medications} name="medications" placeholder="Please list all medications you're currently taking" type="text" id="medications" {...register('medications')} />
                </div>
                <div>
                    <label>Are you currently pregnant?</label>
                    <select className={styles.forminput} defaultValue={healthHistory?.pregnant} name="pregnant" id="pregnant" {...register('pregnant')}>
                        <option value="">Select a value</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="na">Not applicable</option>
                    </select>
                </div>
                <div>
                    <label>Do you have any other health conditions, medical conditions, or gynecological conditions?</label>
                    <input className={styles.forminput} defaultValue={healthHistory?.otherMedicalConditions} name="otherMedicalConditions" placeholder="Please list anything not listed above" type="text" id="otherMedicalConditions" {...register('otherMedicalConditions')} />
                </div>
                <div className={styles.section}>
                    <h2>Privacy Policy</h2>
                    <div style={{marginLeft: '1.5rem', marginTop: '1rem'}}> 
                        <Link className={styles.link} to="/privacypolicy">Click here to read the privacy policy</Link>
                        <label className={styles.container}>By clicking here you are indicating that you have read the privacy policy
                            <input defaultChecked={healthHistory?.privacyPolicy} name="privacyPolicy" type="checkbox" id="privacyPolicy" {...register('privacyPolicy', {required: true})} />
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
    )
}


export default RFHHHForm
