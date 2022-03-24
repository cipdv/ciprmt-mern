import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RMTRegister, RMTLogin } from '../../../actions/auth'
import { useHistory } from 'react-router-dom'
import styles from './rmtauth.module.css'
import { showLoader } from '../../../actions/auth'
import LoadingSpinner from '../../User/Auth/LoadingSpinner/LoadingSpinner'
import { googleOauth } from '../../../api'

const RMTAuth = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [HSTNumber, setHSTNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)

    const formData = {
        firstName, 
        lastName,
        email,
        registrationNumber, 
        HSTNumber,
        password,
        confirmPassword
    }

    const clear = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setRegistrationNumber('')
        setHSTNumber('')
        setPassword('')
        setConfirmPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isRegister) {
            dispatch(RMTRegister(formData, history))
        } else {
            dispatch(RMTLogin(formData, history))
        }
        clear()
    }

    const switchMode = () => {
        setIsRegister((prevIsRegister)=> !prevIsRegister)
    }

    const showLoadingSpinner = () => {
        dispatch(showLoader())
    }

    return (
        <div>
            <form className="ui form" onSubmit={handleSubmit}>
                <div>
                    {
                        isRegister ? (
                            <>
                                {/* <div>
                                <h3>Register as a RMT:</h3>
                                    <label>First name</label>
                                    <input name="firstName" label="First name" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                                    <label>Last name</label>
                                    <input name="lastName" label="Last name" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input name="email" label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label>Registration Number</label>
                                    <input name="registrationNumber" label="Registration Number" type="text" value={registrationNumber} onChange={(e)=>setRegistrationNumber(e.target.value)} />
                                </div><div>
                                    <label>HST Number</label>
                                    <input name="HSTNumber" label="HST Number" type="text" value={HSTNumber} onChange={(e)=>setHSTNumber(e.target.value)} />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input name="password" label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input name="confirmPassword" label="Confirm Password" value={confirmPassword} type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
                                </div>          
                                <button type="submit" className={styles.btn}>Register</button> */}
                            </>
                        ) : (
                            <div className={styles.form}>
                                <LoadingSpinner />
                                <h3>RMT Login</h3>
                                <label>Email</label>
                                <input className={styles.forminput} name="email" type="text" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                <label>Password</label>
                                <input className={styles.forminput} name="password" type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                <button type="submit" className={styles.btn} onClick={showLoadingSpinner}>Login</button>
                            </div>
                        )
                    }
                {/* <div onClick={switchMode}>
                    {
                        isRegister ? 'Already have an account? Login here' : 'First time booking a massage? Click here to register'
                    }
                </div> */}
                </div>   
            </form>
        </div>
        
    )
}

export default RMTAuth
