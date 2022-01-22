import React from 'react'
import {Link } from 'react-router-dom'
import styles from '../User/HHForm/hhform.module.css'

const HealthHistoryForm = ({user}) => {

    return (
        <div >
            <div className={styles.box}>
                <h2>This is a reference only - this is not a functional form</h2>
            </div>
            <form className={styles.form} >
                <div className={styles.section}>
                    <h2>Personal information:</h2>
                    <div>
                        <label htmlFor='occupation'>Occupation</label>
                        <input className={styles.forminput} type='text' name='occupation' id='occupation'  />
                    </div>
                    <div style={{columnCount: '2'}}>
                        <div>
                            <label htmlFor='pronouns'>Pronouns</label>
                            <select className={styles.forminput}>
                                <option value="">Select pronouns</option>
                                <option value="they/them">They/them</option>
                                <option value="she/her">She/her</option>
                                <option value="he/him">He/him</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor='dateOfBirth'>Date of birth</label>
                            <input className={styles.forminput} type="date"/>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Contact info:</h2>
                    <div>
                        <label>Phone number</label>
                        <input className={styles.forminput} type="text"  />
                    </div>
                    <h3 style={{marginBottom: '0px'}}>Address</h3>
                    <div style={{columnCount: '2'}}> 
                        <div className={styles.inlineforminput}>
                            <label>Street number</label>
                            <input className={styles.forminput}  name="addressStreetNumber" type="text" id='addressStreetNumber' />
                            
                        </div>    
                        <div className={styles.inlineforminput}>
                            <label>Street name</label>
                            <input className={styles.forminput}  name="addressStreetName" type="text" id="addressStreetName" />
                        </div>
                    </div>
                    <div style={{columnCount: '2'}}>
                        <div className={styles.inlineforminput}>                   
                            <label>City</label>
                            <input className={styles.forminput} name="city" type="text" id="city" />
                        </div>
                        <div className={styles.inlineforminput}>                   
                            <label>Province</label>
                            <select className={styles.forminput} name="addressProvince" id='province'>
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
            </div>
            <div className={styles.section}>
                <h2>Doctor's contact info:</h2>
                <div>
                    <label>Doctor's name</label>
                    <input className={styles.forminput}name="doctorName" type="text" id='doctorName' />
                </div>
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>
                        <label>Street Number</label>
                        <input className={styles.forminput} name="doctorStreetNumber" type="text" id ='doctorStreetNumber' />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Street name</label>
                        <input className={styles.forminput} name="doctorStreetName" type="text" id='doctorStreetName'  />
                    </div>
                </div>
                <div style={{columnCount: '2'}}>
                    <div className={styles.inlineforminput}>  
                        <label>City</label>
                        <input className={styles.forminput} type="text" />
                    </div>
                    <div className={styles.inlineforminput}>    
                        <label>Province</label>
                        <select className={styles.forminput} >
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
            </div>
            <div className={styles.section}>
                <h2>Health history:</h2>
                <div>
                    <label>How would you describe your overall health</label>
                    <input className={styles.forminput}  name="generalHealth" placeholder="For example: 'excellent, I exercise and eat well'" />
                </div>
                <div>
                    <label>What is your history with massage therapy?</label>
                    <input className={styles.forminput} name="historyOfMassage" placeholder="For example: 'I usually get 5-6 massages per year'" type="text" id="historyOfMassage"  />
                </div>
                <div>
                    <label>Have you received any treatment from another Health Care Provider in the past year?</label>
                    <input className={styles.forminput} name="otherHCP" placeholder="For example: physiotherapy, chiropractic, osteopathy" type="text" id="otherHCP"  />
                </div>
                <div>
                    <label>Have you had any injuries in the past year?</label>
                    <input className={styles.forminput}  name="injuries" placeholder="For example: ankle sprains, muscle strains, disc herniation" type="text" id="injuries"  />
                </div>
                <div>
                    <label>Have you had any surgeries in the past 2 years?</label>
                    <input className={styles.forminput} name="surgeries" placeholder="Please list any surgeries you've had" type="text" id="surgeries"  />
                </div>
                <div >
                    <label>Do you have any of the following medical conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Epilepsy
                            <input name="epilepsy" type="checkbox" id="epilepsy"  />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Diabetes
                            <input name="diabetes" type="checkbox" id="diabetes"  /> 
                            <span className={styles.checkmark}></span>
                        </label>                        
                        <label className={styles.container}>
                            Cancer
                            <input name="cancer" type="checkbox" id="cancer"  />
                            <span className={styles.checkmark}></span>
                        </label>                                               
                        <label className={styles.container}>
                            Arthritis
                            <input  name="arthritis" type="checkbox" id="arthritis" />
                            <span className={styles.checkmark}></span>
                        </label >  
                        <label className={styles.container}>
                            Family history of arthritis
                            <input  name="arthritisFamilyHistory" type="checkbox" id="arthritisFamilyHistory"  />
                            <span className={styles.checkmark}></span>
                        </label >                                     
                        <label className={styles.container}>
                            Chronic Headaches
                            <input name="chronicHeadaches" type="checkbox" id="chronicHeadaches" />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Migraine Headaches
                            <input  name="migraineHeadaches" type="checkbox" id="migraineHeadaches"  />
                            <span className={styles.checkmark}></span>
                        </label>                                      
                        <label className={styles.container}>
                            Vision Loss
                            <input name="visionLoss" type="checkbox" id="visionLoss"/>
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Hearing Loss
                            <input name="hearingLoss" type="checkbox" id="hearingLoss"/>
                            <span className={styles.checkmark}></span>
                        </label>                                    
                        <label className={styles.container}>
                            Osteoporosis
                            <input name="osteoporosis" type="checkbox" id="osteoporosis"  />
                            <span className={styles.checkmark}></span>
                        </label>                                        
                        <label className={styles.container}>
                            Haemophilia
                            <input name="haemophilia" type="checkbox" id="haemophilia" />
                            <span className={styles.checkmark}></span>
                        </label>                     
                    </div>    
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label >Do you have any of the following cardiovascular conditions?</label>
                    <div style={{marginLeft: '1.5rem'}} >
                        <label className={styles.container}>High blood pressure                 
                            <input  name="highBloodPressure" type="checkbox" id="highBloodPressure"  />
                            <span className={styles.checkmark}></span>
                        </label> 
                        <label className={styles.container}>Low blood pressure
                            <input name="lowBloodPressure" type="checkbox" id="lowBloodPressure"  />
                            <span className={styles.checkmark}></span>
                        </label>     
                        <label className={styles.container}>History of heart attacks              
                            <input name="heartAttack" type="checkbox" id="heartAttack"  />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Stroke                  
                            <input name="stroke" type="checkbox" id="stroke" />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Vericose Veins
                            <input name="vericoseVeins" type="checkbox" id="vericoseVeins"  />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Pacemaker
                            <input name="pacemaker" type="checkbox" id="pacemaker" />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Heart disease
                            <input name="heartDisease" type="checkbox" id="heartDisease"  />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                </div>
                <div style={{marginTop: '1rem'}}>
                    <label>Do you have any of the following respiratory conditions?</label>
                    <div style={{marginLeft: '1.5rem'}}>
                        <label className={styles.container}>Chronic cough
                            <input  name="chronicCough" type="checkbox" id="chronicCough" />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Bronchitis
                            <input name="bronchitis" type="checkbox" id="bronchitis"  />
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>Asthma
                            <input name="asthma" type="checkbox" id="asthma"  />
                            <span className={styles.checkmark}></span>
                        </label>  
                        <label className={styles.container}>Emphysema
                            <input name="emphysema" type="checkbox" id="emphysema"  />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>  
                </div> 
                <div>
                    <label>Do you have any internal pins, wires, artificial joints or special equipment?</label>
                    <input className={styles.forminput}  name="internalEquipment" placeholder='Please describe the type of equipment and location and approximate date of implementation' type="text" id="internalEquipment" />
                </div>
                <div>
                    <label>Do you have any skin conditions?</label>
                    <input className={styles.forminput}  name="skinConditions" placeholder="Please list any skin conditions you have" type="text" id="skinConditions"  />
                </div>
                <div>
                    <label>Do you have any infectious conditions?</label>
                    <input className={styles.forminput} name="infectiousConditions" placeholder="For example: hepatitis, HIV" type="text" id="infectiousConditions"  />
                </div>
                <div>
                    <label>Please describe any loss of feeling, numbness, or tingling you are experiencing:</label>
                    <input className={styles.forminput} name="lossOfFeeling" placeholder="For example: tingling down arm, or leg" type="text" id="lossOfFeeling" />
                </div>
                <div>
                    <label>Please list any allergies that you have:</label>
                    <input className={styles.forminput}  name="allergies" placeholder="List all allergies" type="text" id="allergies"  />
                </div>
                <div>
                    <label>Please list any medications you are currently taking:</label>
                    <input className={styles.forminput}  name="medications" placeholder="Please list all medications you're currently taking" type="text" id="medications"  />
                </div>
                <div>
                    <label>Are you currently pregnant?</label>
                    <select className={styles.forminput} name="pregnant" id="pregnant">
                        <option value="">Select a value</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="na">Not applicable</option>
                    </select>
                </div>
                <div>
                    <label>Do you have any other health conditions, medical conditions, or gynecological conditions?</label>
                    <input className={styles.forminput}  name="otherMedicalConditions" placeholder="Please list anything not listed above" type="text" id="otherMedicalConditions"  />
                </div>
                <div className={styles.section}>
                    <h2>Source of Referral</h2>
                    <label>How did you hear about Cip de Vries, RMT?</label>
                    <input type="text" className={styles.forminput} name="sourceOfReferral" id="sourceOfReferral" placeholder='Eg. Google, Facebook, etc. If referred by a friend or medical professional, please provide their name here' />
                </div>
                <div className={styles.section}>
                    <h2>Policies: Cancellations, Privacy, and Harassment</h2>
                    <div style={{marginLeft: '1.5rem', marginTop: '1rem'}}> 
                        <Link className={styles.link} target="_blank" to="/privacypolicy">Click here to read the policies for cancellation, privacy, and harassment.</Link>
                        <label className={styles.container}>By clicking here you are indicating that you have read and agree to the aforementioned policies.
                            <input  name="privacyPolicy" type="checkbox" id="privacyPolicy"  />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                    
                </div>
            </div>
            <button className={styles.btn}>Submit</button>
        </form>
    </div>
    )         
}

export default HealthHistoryForm
