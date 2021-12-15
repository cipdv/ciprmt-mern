import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { submitHH, updateUser } from '../../../actions/healthHistory'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import SignatureCanvas from 'react-signature-canvas'
import { useForm, Controller } from 'react-hook-form'

const RFHHHForm = ({userState}) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const history = useHistory()
    let sigPad = useRef({})

    const healthHistory = userState?.healthHistory[0]
    const userId = userState?._id

    // console.log(userState)

    const [signature, setSignature] = useState('')

    const onSubmit = (data) => {
        dispatch(submitHH(data))
        dispatch(updateUser(userId, sig))
        history.push(`/dashboard`)
    }
    
    const sig = {
        signature
    }

    const formatIntoPng = () => {
        // if (sigPad.current) {
        //   const dataURL = sigPad.current.toDataURL();
        //   return dataURL;
        //  }
        setSignature(sigPad.current.toDataURL())
      }

    const clearSignature = (e) => {
        e.preventDefault()
        setSignature(sigPad.current.clear())
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="ui form">
                <div>
                    <h3>Personal information:</h3>
                </div>
                <div>
                    <label htmlFor='occupation'>Occupation</label>
                    <input defaultValue={healthHistory?.occupation} type='text' {...register('occupation', {required: true})} name='occupation' id='occupation' placeholder='occupation' />
                    {errors?.occupation && <p style={{color: 'red'}}>Occupation required. If none currently, type "none"</p>}
                    <label htmlFor='pronouns'>Pronouns</label>
                    <select defaultValue={healthHistory?.pronouns} {...register('pronouns', {required: true})} name='pronouns' id='pronouns'>
                        <option value="">Select pronouns</option>
                        <option value="she/her">She/her</option>
                        <option value="he/him">He/him</option>
                        <option value="they/them">They/them</option>
                        <option value="other">Other</option>
                    </select>
                    {errors?.pronouns && <p style={{color: 'red'}}>Pronouns required</p>}
                </div>
            <div>
                <label>Date of birth</label>
                <input defaultValue={moment.utc(healthHistory?.dateOfBirth).format("YYYY-MM-DD")} type="date" {...register('dateOfBirth', {required: true})} name='dateOfBirth' id='dateOfBirth' />
                {errors?.dateOfBirth && <p style={{color: 'red'}}>Date of birth required</p>}
            </div>
            <div>
                <h3>Contact info:</h3>
                    <div>
                        <label>Phone number</label>
                        <input defaultValue={healthHistory?.phoneNumber} type="text" {...register('phoneNumber', {required: true})} name='phoneNumber' id='phoneNumber' />
                        {errors?.phoneNumber && <p style={{color: 'red'}}>Phone number required</p>}
                    </div>
                    <div>
                        <h5>Address</h5>
                        <label>Street number</label>
                        <input defaultValue={healthHistory?.address?.streetNumber} name="addressStreetNumber" type="text" {...register('address.streetNumber', {required: true})} id='addressStreetNumber' />
                        {errors?.address?.streetNumber && <p style={{color: 'red'}}>Street number required</p>}
                        <label>Street name</label>
                        <input defaultValue={healthHistory?.address?.streetName} name="addressStreetName" type="text" {...register('address.streetName', {required: true})} id="addressStreetName" />
                        {errors?.address?.streetName && <p style={{color: 'red'}}>Street name required</p>}
                        <label>City</label>
                        <input defaultValue={healthHistory?.address?.city} name="city" type="text" {...register('address.city', {required: true})} id="city" />
                        {errors?.address?.city && <p style={{color: 'red'}}>City required</p>}
                        <label>Province</label>
                        <select defaultValue={healthHistory?.address?.province} name="addressProvince" {...register('address.province', {required: true})} id='province'>
                            <option value="" disabled="disabled">Select your province</option>
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
                        {errors?.address?.province && <p style={{color: 'red'}}>Province required</p>}
                    </div>
            </div>
            <div>
                <h3>Health history:</h3>
                <div>
                    <label>How would you describe your overall health</label>
                    <input defaultValue={healthHistory?.generalHealth} name="generalHealth" placeholder="For example: 'excellent, I exercise and eat well'" {...register('generalHealth', {required: true})} id='generalHealth' />
                    {errors?.generalHealth && <p style={{color: 'red'}}>Please give a brief description of your general health</p>}
                </div>        
                <div>
                    <h5>Doctor's contact info:</h5>
                    <label>Doctor's name</label>
                    <input defaultValue={healthHistory?.doctor?.doctorName} name="doctorName" placeholder="Doctor's name" type="text" {...register('doctor.doctorName', {required: true})} id='doctorName' />
                    {errors?.doctor?.doctorName && <p style={{color: 'red'}}>Please provide your doctor's full name. If you don't currently have a doctor, put "none."</p>}
                    <h5>Doctor's address</h5>
                        <label>Street Number</label>
                        <input defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetNumber} name="doctorStreetNumber" placeholder="Street number" type="text" id ='doctorStreetNumber' {...register('doctor.doctorAddress.doctorStreetNumber')} />
                        {errors?.doctor?.doctorAddress?.doctorStreetNumber && <p style={{color: 'red'}}>Doctor address required. If you don't currently have a doctor, put "none."</p>}
                        <label>Street name</label>
                        <input defaultValue={healthHistory?.doctor?.doctorAddress?.doctorStreetName} name="doctorStreetName" type="text" id='doctorStreetName' placeholder='Street name' {...register('doctor.doctorAddress.doctorStreetName', {required: true})} />
                        {errors?.doctor?.doctorAddress?.doctorStreetName && <p style={{color: 'red'}}>Doctor address required. If you don't currently have a doctor, put "none."</p>}
                        <label>City</label>
                        <input defaultValue={healthHistory?.doctor?.doctorAddress?.doctorCity} name="doctorCity" type="text" id='doctorCity' {...register('doctor.doctorAddress.doctorCity', {required: true})} />
                        {errors?.doctor?.doctorAddress?.doctorCity && <p style={{color: 'red'}}>Doctor address required. If you don't currently have a doctor, put "none."</p>}
                        <label>Province</label>
                        <select defaultValue={healthHistory?.doctor?.doctorAddress?.doctorProvince} name="doctorProvince" id="doctorProvince" {...register('doctor.doctorAddress.doctorProvince', {required: true})} >
                            <option value="" disabled="disabled">Select your province</option>
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
                        {errors?.doctor?.doctorAddress?.doctorProvince && <p style={{color: 'red'}}>Doctor address required. If you don't currently have a doctor, put "none."</p>}
                </div>
                <div>
                    <label>What is your history with massage therapy?</label>
                    <input defaultValue={healthHistory?.historyOfMassage} name="historyOfMassage" placeholder="For example: 'I usually get 5-6 massages per year'" type="text" id="historyOfMassage" {...register('historyOfMassage', {required: true})} />
                    {errors?.historyOfMassage && <p style={{color: 'red'}}>Please provide a brief description of your history with massage</p>}
                </div>
                <div>
                    <label>Have you received any treatment from another Health Care Provider in the past year?</label>
                    <input defaultValue={healthHistory?.otherHCP} name="otherHCP" placeholder="For example: physiotherapy, chiropractic, osteopathy" type="text" id="otherHCP" {...register('otherHCP')} />
                </div>
                <div>
                    <label>Have you had any injuries in the past year?</label>
                    <input defaultValue={healthHistory?.injuries} name="injuries" placeholder="For example: ankle sprains, muscle strains, disc herniation" type="text" id="injuries" {...register('injuries')} />
                </div>
                <div>
                    <label>Have you had any surgeries in the past 2 years?</label>
                    <input defaultValue={healthHistory?.surgeries} name="surgeries" placeholder="Please list any surgeries you've had" type="text" id="surgeries" {...register('surgeries')} />
                </div>
                <div>
                    <h4>Do you have any of the following medical conditions?</h4>
                    <input defaultChecked={healthHistory?.epilepsy} name="epilepsy" type="checkbox" id="epilepsy" {...register('epilepsy')} />
                    <label>Epilepsy</label>
                    
                    <input defaultChecked={healthHistory?.diabetes} name="diabetes" type="checkbox" id="diabetes" {...register('diabetes')} />
                    <label>Diabetes</label>
                    <input defaultChecked={healthHistory?.cancer} name="cancer" type="checkbox" id="cancer" {...register('cancer')} />
                    <label>Cancer</label>
                    <input defaultChecked={healthHistory?.arthritis} name="arthritis" type="checkbox" id="arthritis" {...register('arthritis')} />
                    <label>Arthritis Headaches</label>
                    <input defaultChecked={healthHistory?.chronicHeadaches} name="chronicHeadaches" type="checkbox" id="chronicHeadaches" {...register('chronicHeadaches')} />
                    <label>Chronic Headaches</label>
                    <input defaultChecked={healthHistory?.migraineHeadaches} name="migraineHeadaches" type="checkbox" id="migraineHeadaches" {...register('migraineHeadaches')} />
                    <label>Migraine Headaches</label>
                    <input defaultChecked={healthHistory?.visionLoss} name="visionLoss" type="checkbox" id="visionLoss" {...register('visionLoss')} />
                    <label>Vision Loss</label>
                    <input defaultChecked={healthHistory?.hearingLoss} name="hearingLoss" type="checkbox" id="hearingLoss" {...register('hearingLoss')} />
                    <label>Hearing Loss</label>
                    <input defaultChecked={healthHistory?.osteoporosis} name="osteoporosis" type="checkbox" id="osteoporosis" {...register('osteoporosis')} />
                    <label>Osteoporosis</label>
                    <input defaultChecked={healthHistory?.haemophilia} name="haemophilia" type="checkbox" id="haemophilia" {...register('haemophilia')} />
                    <label>Haemophilia</label>
                </div>
                <div>
                    <h4>Do you have any of the following cardiovascular conditions?</h4>
                    <input defaultChecked={healthHistory?.highBloodPressure} name="highBloodPressure" type="checkbox" id="highBloodPressure" {...register('highBloodPressure')} />
                    <label>High blood pressure</label>
                    <input defaultChecked={healthHistory?.lowBloodPressure} name="lowBloodPressure" type="checkbox" id="lowBloodPressure" {...register('lowBloodPressure')} />
                    <label>Low blood pressure</label>
                    <input defaultChecked={healthHistory?.heartAttack} name="heartAttack" type="checkbox" id="heartAttack" {...register('heartAttack')} />
                    <label>History of heart attacks</label>
                    <input defaultChecked={healthHistory?.stroke} name="stroke" type="checkbox" id="stroke" {...register('stroke')} />
                    <label>Stroke</label>
                    <input defaultChecked={healthHistory?.vericoseVeins} name="vericoseVeins" type="checkbox" id="vericoseVeins" {...register('vericoseVeins')} />
                    <label>Vericose Veins</label>
                    <input defaultChecked={healthHistory?.pacemaker} name="pacemaker" type="checkbox" id="pacemaker" {...register('pacemaker')} />
                    <label>Pacemaker</label>
                    <input defaultChecked={healthHistory?.heartDisease} name="heartDisease" type="checkbox" id="heartDisease" {...register('heartDisease')} />
                    <label>Heart disease</label>
                </div>
                <div>
                    <h4>Do you have any of the following respiratory conditions?</h4>
                    <input defaultChecked={healthHistory?.chronicCough} name="chronicCough" type="checkbox" id="chronicCough" {...register('chronicCough')} />
                    <label>Chronic cough</label>
                    <input defaultChecked={healthHistory?.bronchitis} name="bronchitis" type="checkbox" id="bronchitis" {...register('bronchitis')} />
                    <label>Bronchitis</label>
                    <input defaultChecked={healthHistory?.asthma} name="asthma" type="checkbox" id="asthma" {...register('asthma')} />
                    <label>Asthma</label>  
                    <input defaultChecked={healthHistory?.emphysema} name="emphysema" type="checkbox" id="emphysema" {...register('emphysema')} />
                    <label>Emphysema</label>  
                </div> 
                <div>
                    <h4>Do you have any skin conditions?</h4>
                    <input defaultValue={healthHistory?.skinConditions} name="skinConditions" placeholder="Please list any skin conditions you have" type="text" id="skinConditions" {...register('skinConditions')} />
                </div>
                <div>
                    <h4>Do you have any infectious conditions?</h4>
                    <input defaultValue={healthHistory?.infectiousConditions} name="infectiousConditions" placeholder="For example: hepatitis, HIV" type="text" id="infectiousConditions" {...register('infectiousConditions')} />
                </div>
                <div>
                    <h4>Do you have any other medical conditions?</h4>
                    <input defaultValue={healthHistory?.otherMedicalConditions} name="otherMedicalConditions" placeholder="Please list any medical conditions not listed above" type="text" id="otherMedicalConditions" {...register('otherMedicalConditions')} />
                </div>
                <div>
                    <h4>Please describe any loss of feeling, numbness, or tingling you are experiencing:</h4>
                    <input defaultValue={healthHistory?.lossOfFeeling} name="lossOfFeeling" placeholder="For example: tingling down arm, or leg" type="text" id="lossOfFeeling" {...register('lossOfFeeling')} />
                </div>
                <div>
                    <h4>Please list any allergies that you have:</h4>
                    <input defaultValue={healthHistory?.allergies} name="allergies" placeholder="List all allergies" type="text" id="allergies" {...register('allergies')} />
                </div>
                <div>
                    <h4>Please list any medications you are currently taking:</h4>
                    <input defaultValue={healthHistory?.medications} name="medications" placeholder="Please list all medications you're currently taking" type="text" id="medications" {...register('medications')} />
                </div>
                <div>
                    <h4>Are you currently pregnant?</h4>
                    <select defaultValue={healthHistory?.pregnant} name="pregnant" id="pregnant" {...register('pregnant')}>
                        <option value="" disabled="disabled">Select a value</option>
                        <option >Yes</option>
                        <option>No</option>
                        <option>Not applicable</option>
                    </select>
                </div>
                <div>
                    <h3>Privacy Policy</h3>
                    <input defaultChecked={healthHistory?.privacyPolicy} name="privacyPolicy" type="checkbox" id="privacyPolicy" {...register('privacyPolicy', {required: true})} />
                    <label>By clicking here you are indicating that you have read the privacy policy</label>
                    {errors?.privacyPolicy && <p style={{color: 'red'}}>You must agree to the privacy policy to book a massage.</p>}
                </div>
                <div>
                    <h4>Signature</h4>
                    <SignatureCanvas ref={sigPad} onEnd={formatIntoPng}  penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
                    <button onClick={clearSignature}>Clear</button>
                    <input defaultChecked={healthHistory.signatureConsent} name="signatureConsent" type="checkbox" id="signatureConsent" {...register('signatureConsent', {required: true})} />
                    <label>By checking this box you are consenting to storing your signature to use for future consents when booking appointments.</label>
                    {errors?.signatureConsent && <p style={{color: 'red'}}>Your signature is required for providing consents for booking appointments</p>}
                </div>
            </div>
            <input type='submit' className="ui button" />
        </form>          
    </div>
    )
}


export default RFHHHForm
