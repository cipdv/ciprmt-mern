import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { submitHH } from '../../../actions/healthHistory'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import SignatureCanvas from 'react-signature-canvas'
import HHFormValidation from './HHFormValidation'


const HHForm = ({user, userState }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [occupation, setOccupation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [streetName, setStreetName] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [pronouns, setPronouns] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [doctorStreetNumber, setDoctorStreetNumber] = useState('')
    const [doctorStreetName, setDoctorStreetName] = useState('')
    const [doctorCity, setDoctorCity] = useState('')
    const [doctorProvince, setDoctorProvince] = useState('')
    const [generalHealth, setGeneralHealth] = useState('')
    const [historyOfMassage, setHistoryOfMassage] = useState('')
    const [injuries, setInjuries] = useState('')
    const [surgeries, setSurgeries] = useState('')
    const [otherHCP, setOtherHCP] = useState('')
    const [cardioNone, setCardioNone] = useState(false)
    const [highBloodPressure, setHighBloodPressure] = useState(false)
    const [lowBloodPressure, setLowBloodPressure] = useState(false)
    const [heartAttack, setHeartAttack] = useState(false)
    const [vericoseVeins, setVericoseVeins] = useState(false)
    const [stroke, setStroke] = useState(false)
    const [pacemaker, setPacemaker] = useState(false)
    const [heartDisease, setHeartDisease] = useState(false)
    const [respNone, setRespNone] = useState(false)
    const [chronicCough, setChronicCough] = useState(false)
    const [bronchitis, setBronchitis] = useState(false)
    const [asthma, setAsthma] = useState(false)
    const [emphysema, setEmphysema] = useState(false)
    const [skinConditions, setSkinConditions] = useState('')
    const [infectiousConditions, setInfectiousConditions] = useState('')
    const [diabetes, setDiabetes] = useState(false)
    const [epilepsy, setEpilepsy] = useState(false)
    const [cancer, setCancer] = useState(false)
    const [arthritis, setArthritis] = useState(false)
    const [chronicHeadaches, setChronicHeadaches] = useState(false)
    const [migraineHeadaches, setMigrainHeadaches] = useState(false)
    const [visionLoss, setVisionLoss] = useState(false)
    const [hearingLoss, setHearingLoss] = useState(false)
    const [osteoporosis, setOsteoporosis] = useState(false)
    const [haemophilia, setHaemophilia] = useState(false)
    const [otherMedicalConditions, setOtherMedicalConditions] = useState('')
    const [lossOfFeeling, setLossOfFeeling] = useState('')
    const [allergies, setAllergies] = useState('')
    const [medications, setMedications] = useState('')
    const [pregnant, setPregnant] = useState('')
    // const [glutes, setGlutes] = useState(false)
    // const [abdomen, setAbdomen] = useState(false)
    // const [innerThighs, setInnerThighs] = useState(false)
    // const [chest, setChest] = useState(false)
    // const [areasToAvoid, setAreasToAvoid] = useState(userState?.healthHistory[0]?.areasToAvoid ? (userState?.healthHistory[0]?.areasToAvoid) : (''))
    const [privacyPolicy, setPrivacyPolicy] = useState(false)
    const [signatureConsent, setSignatureConsent] = useState(false)
    const [signature, setSignature] = useState('')

    //errors
    const [ errors, setErrors ] = useState({})

    let sigPad = useRef({})
    // let data = ''

    const formData = {
        pronouns,
        occupation,
        phoneNumber,
        address: {
            streetNumber,
            streetName,
            city,
            province,
        },
        dateOfBirth,
        doctor: {
            doctorName,
            doctorAddress: {
                doctorStreetNumber,
                doctorStreetName,
                doctorCity,
                doctorProvince
            },
        },
        generalHealth,
        historyOfMassage,
        injuries,
        surgeries,
        otherHCP,
        cardioNone,
        highBloodPressure,
        lowBloodPressure,
        heartAttack,
        vericoseVeins,
        stroke,
        pacemaker,
        heartDisease,
        respNone,
        chronicCough,
        bronchitis,
        asthma,
        emphysema,
        diabetes,
        epilepsy,
        cancer,
        arthritis,
        chronicHeadaches,
        migraineHeadaches,
        visionLoss, 
        hearingLoss,
        osteoporosis,
        haemophilia,
        skinConditions,
        infectiousConditions,
        otherMedicalConditions,
        lossOfFeeling,
        allergies,
        pregnant,
        medications,
        // consent: {
        //     glutes,
        //     innerThighs,
        //     abdomen,
        //     chest,
        //     areasToAvoid,
        // },
        privacyPolicy,
        signature
    }

    useEffect(()=>{
        setOccupation(userState?.healthHistory[0]?.occupation ? (userState?.healthHistory[0]?.occupation) : (''))
        setPhoneNumber(userState?.healthHistory[0]?.phoneNumber ? (userState?.healthHistory[0]?.phoneNumber) : (''))
        setStreetNumber(userState?.healthHistory[0]?.address?.streetNumber ? (userState?.healthHistory[0]?.address?.streetNumber) : (''))
        setStreetName(userState?.healthHistory[0]?.address?.streetName ? (userState?.healthHistory[0]?.address?.streetName) : (''))
        setCity(userState?.healthHistory[0]?.address?.city ? (userState?.healthHistory[0]?.address?.city) : (''))
        setProvince(userState?.healthHistory[0]?.address?.province ? (userState?.healthHistory[0]?.address?.province) : (''))
        setDateOfBirth(userState?.healthHistory[0]?.dateOfBirth ? (moment.utc(userState?.healthHistory[0]?.dateOfBirth).format("YYYY-MM-DD")) : (''))
        setDoctorName(userState?.healthHistory[0]?.doctor?.doctorName ? (userState?.healthHistory[0]?.doctor?.doctorName) : (''))
        setDoctorStreetNumber(userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorStreetNumber ? (userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorStreetNumber) : (''))
        setDoctorStreetName(userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorStreetName ? (userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorStreetName) : (''))
        setDoctorCity(userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorCity ? (userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorCity) : (''))
        setDoctorProvince(userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorProvince ? (userState?.healthHistory[0]?.doctor?.doctorAddress?.doctorProvince) : (''))
        setGeneralHealth(userState?.healthHistory[0]?.generalHealth ? (userState?.healthHistory[0]?.generalHealth) : (''))
        setHistoryOfMassage(userState?.healthHistory[0]?.historyOfMassage ? (userState?.healthHistory[0]?.historyOfMassage) : (''))
        setPronouns(userState?.healthHistory[0]?.pronouns ? (userState?.healthHistory[0]?.pronouns) : (''))
        setInjuries(userState?.healthHistory[0]?.injuries ? (userState?.healthHistory[0]?.injuries) : (''))
        setSurgeries(userState?.healthHistory[0]?.surgeries ? (userState?.healthHistory[0]?.surgeries) : (''))
        setOtherHCP(userState?.healthHistory[0]?.otherHCP ? (userState?.healthHistory[0]?.otherHCP) : (''))
        setCardioNone(userState?.healthHistory[0]?.cardioNone === true ? (true) : (false))
        setHighBloodPressure(userState?.healthHistory[0]?.highBloodPressure === true ? (true) : (false))
        setLowBloodPressure(userState?.healthHistory[0]?.lowBloodPressure === true ? (true) : (false))
        setHeartAttack(userState?.healthHistory[0]?.heartAttack === true ? (true) : (false))
        setVericoseVeins(userState?.healthHistory[0]?.vericoseVeins === true ? (true) : (false))
        setStroke(userState?.healthHistory[0]?.stroke === true ? (true) : (false))
        setPacemaker(userState?.healthHistory[0]?.pacemaker === true ? (true) : (false))
        setHeartDisease(userState?.healthHistory[0]?.heartDisease === true ? (true) : (false))
        setRespNone(userState?.healthHistory[0]?.respNone === true ? (true) : (false))
        setChronicCough(userState?.healthHistory[0]?.chronicCough === true ? (true) : (false))
        setBronchitis(userState?.healthHistory[0]?.bronchitis === true ? (true) : (false))
        setAsthma(userState?.healthHistory[0]?.asthma === true ? (true) : (false))
        setEmphysema(userState?.healthHistory[0]?.emphysema === true ? (true) : (false))
        setSkinConditions(userState?.healthHistory[0]?.skinConditions ? (userState?.healthHistory[0]?.skinConditions) : (''))
        setInfectiousConditions(userState?.healthHistory[0]?.infectiousConditions ? (userState?.healthHistory[0]?.infectiousConditions) : (''))
        setDiabetes(userState?.healthHistory[0]?.diabetes === true ? (true) : (false))
        setEpilepsy(userState?.healthHistory[0]?.epilepsy === true ? (true) : (false))
        setCancer(userState?.healthHistory[0]?.cancer === true ? (true) : (false))
        setArthritis(userState?.healthHistory[0]?.arthritis === true ? (true) : (false))
        setChronicHeadaches(userState?.healthHistory[0]?.chronicHeadaches === true ? (true) : (false))
        setMigrainHeadaches(userState?.healthHistory[0]?.migraineHeadaches === true ? (true) : (false))
        setVisionLoss(userState?.healthHistory[0]?.visionLoss === true ? (true) : (false))
        setHearingLoss(userState?.healthHistory[0]?.hearingLoss === true ? (true) : (false))
        setOsteoporosis(userState?.healthHistory[0]?.osteoporosis === true ? (true) : (false))
        setHaemophilia(userState?.healthHistory[0]?.haemophilia === true ? (true) : (false))
        setOtherMedicalConditions(userState?.healthHistory[0]?.otherMedicalConditions ? (userState?.healthHistory[0]?.otherMedicalConditions) : (''))
        setLossOfFeeling(userState?.healthHistory[0]?.lossOfFeeling ? (userState?.healthHistory[0]?.lossOfFeeling) : (''))
        setAllergies(userState?.healthHistory[0]?.allergies ? (userState?.healthHistory[0]?.allergies) : (''))
        setPregnant(userState?.healthHistory[0]?.pregnant ? (userState?.healthHistory[0]?.pregnant) : (''))
        setMedications(userState?.healthHistory[0]?.medications ? (userState?.healthHistory[0]?.medications) : (''))
        // setGlutes(userState?.healthHistory[0]?.consent?.glutes === true ? (true) : (false))
        // setInnerThighs(false)
        // setAbdomen(false)
        // setChest(false)
        // setAreasToAvoid('')
        setPrivacyPolicy(userState?.healthHistory[0]?.privacyPolicy === true ? (true) : (false))
        //setSignature(userState?.healthHistory[0]?.signature ? (sigPad?.current?.fromDataURL(userState?.healthHistory[0]?.signature)): (''))
    }, [])

    const saveSignature = (e) => {
        e.preventDefault()
        setSignature(sigPad.current.toDataURL())
    }

    const clearSignature = (e) => {
        e.preventDefault()
        setSignature(sigPad.current.clear())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        console.log('form data', formData)
        console.log('phone number', phoneNumber)
        HHFormValidation(formData)
        console.log('errors', errors)

        if(Object.keys(errors).length === 0) {
            if(user) {
                console.log('no errors')
                dispatch(submitHH(formData))
                clear() 
                history.push('/dashboard')
            }
            else {
                console.log('there were errors')
                // clear() 
                // history.push('/dashboard')
            }  
        }   
    }

    const clear = () => {
        setOccupation('')
        setPhoneNumber('')
        setStreetNumber('')
        setStreetName('')
        setCity('')
        setProvince('')
        setDateOfBirth('')
        setDoctorName('')
        setDoctorStreetNumber('')
        setDoctorStreetName('')
        setDoctorCity('')
        setDoctorProvince('')
        setGeneralHealth('')
        setHistoryOfMassage('')
        setPronouns('')
        setInjuries('')
        setSurgeries('')
        setOtherHCP('')
        setCardioNone(false)
        setHighBloodPressure(false)
        setLowBloodPressure(false)
        setHeartAttack(false)
        setVericoseVeins(false)
        setStroke(false)
        setPacemaker(false)
        setHeartDisease(false)
        setRespNone(false)
        setChronicCough(false)
        setBronchitis(false)
        setAsthma(false)
        setEmphysema(false)
        setSkinConditions('')
        setInfectiousConditions('')
        setDiabetes(false)
        setEpilepsy(false)
        setCancer(false)
        setArthritis(false)
        setChronicHeadaches(false)
        setMigrainHeadaches(false)
        setVisionLoss(false)
        setHearingLoss(false)
        setOsteoporosis(false)
        setHaemophilia(false)
        setOtherMedicalConditions('')
        setLossOfFeeling('')
        setAllergies('')
        setPregnant('')
        setMedications('')
        // setGlutes(false)
        // setInnerThighs(false)
        // setAbdomen(false)
        // setChest(false)
        // setAreasToAvoid('')
        setPrivacyPolicy(false)
    }

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div>
                <h3>Personal information:</h3>
            </div>
            <div>
            <label>Pronouns</label>
            <select name="pronouns" label="Pronouns" value={pronouns} onChange={(e)=> setPronouns(e.target.value)}>
                <option value="" disabled="disabled">Select your pronouns</option>
                <option value="they">They/them</option>
                <option value="she">She/her</option>
                <option value="he">He/him</option>
                <option value="other">Other</option>
            </select>
            </div>
            <div>
                <label>Date of birth</label>
                <input name="dateOfBirth" label="Date of birth" type="date" value={dateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)} />
            </div>
            <div>
                <label>Occupation</label>
                <input name="occupation" type="text" value={occupation} onChange={(e)=> setOccupation(e.target.value)} />
            </div>
            <div>
                <h3>Contact info:</h3>
                    <div>
                        <label>Phone number</label>
                        <input name="phoneNumber" type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} />
                    </div>
                    <div>
                        <h5>Address</h5>
                        <label>Street number</label>
                        <input name="addressStreetNumber" type="text" value={streetNumber} onChange={(e)=> setStreetNumber(e.target.value)} />
                        <label>Street name</label>
                        <input name="addressStreetName" type="text" value={streetName} onChange={(e)=> setStreetName(e.target.value)} />
                        <label>City</label>
                        <input name="addressCity" type="text" value={city} onChange={(e)=> setCity(e.target.value)} />
                        <label>Province</label>
                        <select name="addressProvince" value={province} onChange={(e)=> setProvince(e.target.value)}>
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
                    </div>
            </div>
            <div>
                <h3>Health history:</h3>
                <div>
                    <label>How would you describe your overall health</label>
                    <input name="generalHealth" label="How would you describe your overall health?" value={generalHealth} type="text" onChange={(e)=> setGeneralHealth(e.target.value)}/>
                </div>
                <div>
                    <h5>Doctor's contact info:</h5>
                    <label>Doctor's name</label>
                    <input name="doctorName" label="Doctor's name" type="text" value={doctorName} onChange={(e)=> setDoctorName(e.target.value)} />
                    <h5>Doctor's address</h5>
                        <label>Street Number</label>
                        <input name="doctorStreetNumber" label="Street number" type="text" value={doctorStreetNumber} onChange={(e)=>setDoctorStreetNumber(e.target.value)} />
                        <label>Street name</label>
                        <input name="doctorStreetName" type="text" value={doctorStreetName} onChange={(e)=> setDoctorStreetName(e.target.value)} />
                        <label>City</label>
                        <input name="doctorCity" type="text" value={doctorCity} onChange={(e)=> setDoctorCity(e.target.value)} />
                        <label>Province</label>
                        <select name="doctorProvince" value={doctorProvince} onChange={(e)=> setDoctorProvince(e.target.value)}>
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
                </div>
                <div>
                    <label>What is your history with massage therapy?</label>
                    <input name="historyOfMassage" label="What is your history with massage therapy?" type="text" value={historyOfMassage} onChange={(e)=> setHistoryOfMassage(e.target.value)} />
                </div>
                <div>
                    <label>Have you received any treatment from another Health Care Provider in the past year?</label>
                    <input name="otherHCP" type="text" value={otherHCP} onChange={(e)=> setOtherHCP(e.target.value)} />
                </div>
                <div>
                    <label>Have you had any injuries in the past year?</label>
                    <input name="injuries" label="Have you had any injuries in the past year?" type="text" value={injuries} onChange={(e)=> setInjuries(e.target.value)} />
                </div>
                <div>
                    <label>Have you had any surgeries in the past 2 years?</label>
                    <input name="surgeries" label="Have you had any surgeries in the past 2 years?" type="text" value={surgeries} onChange={(e)=> setSurgeries(e.target.value)} />
                </div>
                <div>
                    <h4>Do you have any of the following medical conditions?</h4>
                    <label>Epilepsy</label>
                    <input name="epilepsy" type="checkbox" checked={epilepsy} onChange={(e)=> setEpilepsy(e.target.checked)} />
                    <label>Diabetes</label>
                    <input name="diabetes" type="checkbox" checked={diabetes} onChange={(e)=> setDiabetes(e.target.checked)} />
                    <label>Cancer</label>
                    <input name="cancer" type="checkbox" checked={cancer} onChange={(e)=> setCancer(e.target.checked)} />
                    <label>Arthritis</label>
                    <input name="arthritis" type="checkbox" checked={arthritis} onChange={(e)=> setArthritis(e.target.checked)} />
                    <label>Chronic Headaches</label>
                    <input name="chronicHeadaches" type="checkbox" checked={chronicHeadaches} onChange={(e)=> setChronicHeadaches(e.target.checked)} />
                    <label>Migraine Headaches</label>
                    <input name="migraineHeadaches" type="checkbox" checked={migraineHeadaches} onChange={(e)=> setMigrainHeadaches(e.target.checked)} />
                    <label>Vision Loss</label>
                    <input name="visionLoss" type="checkbox" checked={visionLoss} onChange={(e)=> setVisionLoss(e.target.checked)} />
                    <label>Hearing Loss</label>
                    <input name="hearingLoss" type="checkbox" checked={hearingLoss} onChange={(e)=> setHearingLoss(e.target.checked)} />
                    <label>Osteoporosis</label>
                    <input name="osteoporosis" type="checkbox" checked={osteoporosis} onChange={(e)=> setOsteoporosis(e.target.checked)} />
                    <label>Haemophilia</label>
                    <input name="haemophilia" type="checkbox" checked={haemophilia} onChange={(e)=> setHaemophilia(e.target.checked)} />
                </div>
                <div>
                    <h4>Do you have any of the following cardiovascular conditions?</h4>
                    <input name="cardioNone" type="checkbox" checked={cardioNone} onChange={(e)=> setCardioNone(e.target.checked)} />
                    <label>None</label>
                    <input name="highBloodPressure" type="checkbox" checked={highBloodPressure} onChange={(e)=> setHighBloodPressure(e.target.checked)} />
                    <label>High blood pressure</label>
                    <input name="lowBloodPressure" type="checkbox" checked={lowBloodPressure} onChange={(e)=> setLowBloodPressure(e.target.checked)} />
                    <label>Low blood pressure</label>
                    <input name="heartAttack" type="checkbox" checked={heartAttack} onChange={(e)=> setHeartAttack(e.target.checked)} />
                    <label>History of heart attacks</label>
                    <input name="stroke" type="checkbox" checked={stroke} onChange={(e)=> setStroke(e.target.checked)} />
                    <label>Stroke</label>
                    <input name="vericoseVeins" type="checkbox" checked={vericoseVeins} onChange={(e)=> setVericoseVeins(e.target.checked)} />
                    <label>Vericose Veins</label>
                    <input name="pacemaker" type="checkbox" checked={pacemaker} onChange={(e)=> setPacemaker(e.target.checked)} />
                    <label>Pacemaker</label>
                    <input name="heartDisease" type="checkbox" checked={heartDisease} onChange={(e)=> setHeartDisease(e.target.checked)} />
                    <label>Heart disease</label>
                </div>
                <div>
                    <h4>Do you have any of the following respiratory conditions?</h4>
                    <input name="respNone" type="checkbox" checked={respNone} onChange={(e)=> setRespNone(e.target.checked)} />
                    <label>None</label>
                    <input name="chronicCough" type="checkbox" checked={chronicCough} onChange={(e)=> setChronicCough(e.target.checked)} />
                    <label>Chronic cough</label>
                    <input name="bronchitis" type="checkbox" checked={bronchitis} onChange={(e)=> setBronchitis(e.target.checked)} />
                    <label>Bronchitis</label>
                    <input name="asthma" type="checkbox" checked={asthma} onChange={(e)=> setAsthma(e.target.checked)} />
                    <label>Asthma</label>  
                    <input name="emphysema" type="checkbox" checked={emphysema} onChange={(e)=> setEmphysema(e.target.checked)} />
                    <label>Emphysema</label>  
                </div> 
                <div>
                    <h4>Do you have any skin conditions?</h4>
                    <input name="skinConditions" type="text" value={skinConditions} onChange={(e)=> setSkinConditions(e.target.value)} />
                </div>
                <div>
                    <h4>Do you have any infectious conditions?</h4>
                    <input name="infectiousConditions" type="text" value={infectiousConditions} onChange={(e)=> setInfectiousConditions(e.target.value)} />
                </div>
                <div>
                    <h4>Do you have any other medical conditions?</h4>
                    <input name="medicalConditions" type="text" value={otherMedicalConditions} onChange={(e)=> setOtherMedicalConditions(e.target.value)} />
                </div>
                <div>
                    <h4>Please describe any loss of feeling, numbness, or tingling you are experiencing:</h4>
                    <input name="lossOfFeeling" type="text" value={lossOfFeeling} onChange={(e)=> setLossOfFeeling(e.target.value)} />
                </div>
                <div>
                    <h4>Please list any allergies that you have:</h4>
                    <input name="allergies" type="text" value={allergies} onChange={(e)=> setAllergies(e.target.value)} />
                </div>
                <div>
                    <h4>Please list any medications you are currently taking:</h4>
                    <input name="medications" type="text" value={medications} onChange={(e)=> setMedications(e.target.value)} />
                </div>
                <div>
                    <h4>Are you currently pregnant?</h4>
                    <select name="pregnant" value={pregnant} onChange={(e)=> setPregnant(e.target.value)}>
                        <option value="" disabled="disabled">Select a value</option>
                        <option >Yes</option>
                        <option>No</option>
                        <option>Not applicable</option>
                    </select>
                </div>
                {/* <div> */}
                    {/* <h3>Consent for treatment</h3>
                    <p>Thai massage involves close body contact, through clothing. The goal of Thai Massage is to relieve tension throughout the body. All areas are connected, and as such, it is important to release tension in all areas of the body to relieve any pain or stiffness you may be feeling. For example, soreness in the lower back area can be the result of tightness in the thighs, hips, and buttocks. Areas that may be touched include inner thighs, glutes/buttocks, chest wall (not including breat tissue), and abdomen. Areas that will never be touched during a massage include breasts or genital regions. If you do not feel comfortable with any of these sensitive areas being touched, please indicate which areas here:</p>
                    <input name="glutesNonConsent" type="checkbox" checked={glutes} onChange={(e)=> setGlutes(e.target.checked)} />
                    <label>Glutes</label>
                    <input name="innerThighsNonConsent" type="checkbox" checked={innerThighs} onChange={(e)=> setInnerThighs(e.target.checked)} />
                    <label>Inner thighs</label>
                    <input name="abdomenNonConsent" type="checkbox" checked={abdomen} onChange={(e)=> setAbdomen(e.target.checked)} />
                    <label>Abdomen</label>
                    <input name="chestNonConsent" type="checkbox" checked={chest} onChange={(e)=> setChest(e.target.checked)} />
                    <label>Chest</label> */}
                    {/* <input name="allAreasConsent" type="checkbox" checked={consent} onChange={(e)=> setFormData({...formData, allAreasConsent: e.target.checked})} />
                    <label>I am comfortable with all of these areas being massaged</label> */}
                    {/* <div>
                        <h5>Are there any other areas that you would like to avoid being massaged?</h5>
                        <input name="otherAreasNonConsent" type="text" value={areasToAvoid} onChange={(e)=> setAreasToAvoid(e.target.value)} />
                    </div> */}
                {/* </div> */}
                <div>
                    <h3>Privacy Policy</h3>
                    <input name="privacyPolicy" type="checkbox" checked={privacyPolicy} onChange={(e)=> setPrivacyPolicy(e.target.checked)} />
                    <label>By clicking here you are indicating that you have read the privacy policy</label>
                </div>
                {!userState?.healthHistory[0]?.signature ? (
                    <>
                        <div>
                            <h4>Signature</h4>
                            <SignatureCanvas ref={sigPad} onEnd={saveSignature}  penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
                            <button onClick={clearSignature}>Clear</button>
                            <button onClick={saveSignature}>Save</button>
                        </div>
                        <div>
                            <input name="signature" type="checkbox" checked={signatureConsent} onChange={(e)=> setSignatureConsent(e.target.checked)} />
                            <label>By checking this box you are consenting to storing your signature to use for future consents when booking appointments.</label>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
            <button type="submit" className="ui button">Submit</button>
        </form>
    )
}

export default HHForm