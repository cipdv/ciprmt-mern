import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, login, showLoader, hideLoader } from '../../../actions/auth'
import { Link } from 'react-router-dom'
import useForm from './UseForm'
import validate from './validate'
import styles from './auth.module.css'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'

// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const { handleChange, values, handleSubmit, isRegister, switchMode, errors } = useForm(validate)

    // const dispatch = useDispatch()

    // const showLoadingSpinner = () => {
    //     dispatch(showLoader())

    //     setTimeout(()=>{
    //         dispatch(hideLoader())
    //     }, 3000)
    // }

    // const dispatch = useDispatch()
    // const history = useHistory()

    // const [formData, setFormData] = useState(initialState)
    // const [isRegister, setIsRegister] = useState(true)
    // const [formErrors, setFormErrors] = useState({})
    // const [isSubmit, setIsSubmit] = useState(false)

    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value})
    // }

    // const clear = () => {
    //     setFormData(initialState)
    // }

    // const validate = (values) => {
    //     const errors = {}
    //     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i

    //     if (!values.firstName) {
    //         errors.firstName = "First name is required"
    //     }
    //     if (!values.lastName) {
    //         errors.lastName = "Last name is required"
    //     }
        
    //     if (!values.email) {
    //         errors.email = "Email is required"
    //     } else if (!regex.test(values.email)) {
    //         errors.email = "Email is not valid"
    //     }
        
    //     if (!values.password) {
    //         errors.password = "Password is required"
    //     }
        
    //     if (!values.confirmPassword) {
    //         errors.confirmPassword = "Confirm password is required"
    //     }

    //     return errors
    // }

    // useEffect(()=>{
    //     if(Object.keys(formErrors).length === 0) {
    //         setIsSubmit(true)
    //     } else {
    //         setIsSubmit(false)
    //     }
    // }, [formErrors])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setFormErrors(validate(formData))
        
    //     if (isRegister) {
    //         if(isSubmit) {
    //             dispatch(register(formData, history)) 
    //         } else {
    //             alert("Complete missing fields")
    //             setIsSubmit(false)
    //             setFormErrors({})
    //         }
    //     } else {
    //         if(isSubmit) {
    //             dispatch(login(formData, history))
    //         } else {
    //             alert("Complete missing fields")
    //             setIsSubmit(false)
    //             setFormErrors({})
    //         }
    //     }
    //     clear()
    // }

    // const switchMode = () => {
    //     setIsRegister((prevIsRegister)=> !prevIsRegister)
    // }

    const dispatch = useDispatch()

    const showLoadingSpinner = () => {
        dispatch(showLoader())
    }
    
    return (
        <div className={styles.main}>
            <LoadingSpinner />
            <form onSubmit={handleSubmit}>
                <div>
                    {
                        isRegister ? (
                            <>
                                <div className={styles.form}>
                                <h3>To book a massage, please register:</h3>
                                <p>
                                    By registering, you will be able to access your receipts, confirm appointments, and manage your health history file.
                                </p>
                                <p>
                                    All information provided is sent through a secure network in accordance with my <Link target="_blank" to="/privacypolicy">privacy policy</Link>.
                                </p>
                                <div onClick={switchMode}>
                                    {
                                        isRegister ? (<div>Already have an account? <button className={styles.btn2}>Login</button></div>) : (<div>First time booking a massage? <button className={styles.btn2}>Register here</button></div>)
                                    }
                                </div>
                                    <label>First name</label>
                                    <input className={styles.forminput} name="firstName" label="First name" type="text" value={values.firstName} onChange={handleChange} />
                                    {errors?.firstName && <p className={styles.error}>{errors?.firstName}</p>}
                                    <label>Last name</label>
                                    <input className={styles.forminput} name="lastName" label="Last name" type="text" value={values.lastName} onChange={handleChange} />
                                    {errors?.lastName && <p className={styles.error}>{errors?.lastName}</p>}
                                
                                    <label>Email</label>
                                    <input className={styles.forminput} name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
                                    {errors?.email && <p className={styles.error}>{errors?.email}</p>}
                                    {/* <input type="checkbox" name="emailReceiptOptIn" value={values.emailReceiptOptIn} onChange={handleChange} />
                                    <label>Check here to receive your RMT receipts via email</label> */}
                                
                                    <label>Password</label>
                                    <input className={styles.forminput} name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
                                    {errors?.password && <p className={styles.error}>{errors?.password}</p>}
                                
                                    <label>Confirm Password</label>
                                    <input className={styles.forminput} name="confirmPassword" label="Confirm Password" value={values.confirmPassword} type="password" onChange={handleChange} />
                                    {errors?.confirmPassword && <p className={styles.error}>{errors?.confirmPassword}</p>}
                                </div>          
                                <button type="submit" className={styles.btn} onClick={showLoadingSpinner}>Register</button>
                            </>
                        ) : (
                            <div className={styles.form}>
                                <h3>Login</h3>
                                <label>Email</label>
                                <input className={styles.forminput} name="email" type="text" label="Email" value={values.email} onChange={handleChange} />
                                {errors?.email && <p className={styles.error}>{errors?.email}</p>}
                                <label>Password</label>
                                <input className={styles.forminput} name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
                                {errors?.password && <p className={styles.error}>{errors?.password}</p>}
                                <button type="submit" className={styles.btn} onClick={showLoadingSpinner}>Login</button>
                            </div>
                        )
                    }
                
                </div>   
            </form>
        </div>
        
    )

    // return (
    //     <div className={styles.main}>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 {
    //                     isRegister ? (
    //                         <>
    //                             <div className={styles.form} style={{marginTop: '2rem'}}>
    //                                 <h3>To book a massage, please register:</h3>
    //                                 <p>
    //                                     By registering, you will be able to access your receipts, confirm appointments, and manage your health history file.
    //                                 </p>
    //                                 <p>
    //                                     All information provided will be encrypted and sent through a secure network in accordance with my <Link target="_blank" to="/privacypolicy">privacy policy</Link>.
    //                                 </p>
    //                             <div onClick={switchMode}>
    //                                 {
    //                                     isRegister ? (<div>Already have an account? <button className={styles.btn2}>Login here</button></div>) : (<div>First time booking a massage? <button className={styles.btn2}>Register here</button></div>)
    //                                 }
    //                             </div>
    //                                 <label>First name</label>
    //                                 <input className={styles.forminput} name="firstName" label="First name" type="text" value={values.firstName} onChange={handleChange} />
    //                                 {errors?.firstName && <p className={styles.error}>{errors?.firstName}</p>}
    //                                 <label>Last name</label>
    //                                 <input className={styles.forminput} name="lastName" label="Last name" type="text" value={values.lastName} onChange={handleChange} />
    //                                 {errors?.lastName && <p className={styles.error}>{errors?.lastName}</p>}
                                
    //                                 <label>Email</label>
    //                                 <input className={styles.forminput} name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
    //                                 {errors?.email && <p className={styles.error}>{errors?.email}</p>}
    //                                 {/* <input type="checkbox" name="emailReceiptOptIn" value={values.emailReceiptOptIn} onChange={handleChange} />
    //                                 <label>Check here to receive your RMT receipts via email</label> */}
                                
    //                                 <label>Password</label>
    //                                 <input className={styles.forminput} name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
    //                                 {errors?.password && <p className={styles.error}>{errors?.password}</p>}
                                
    //                                 <label>Confirm Password</label>
    //                                 <input className={styles.forminput} name="confirmPassword" label="Confirm Password" value={values.confirmPassword} type="password" onChange={handleChange} />
    //                                 {errors?.confirmPassword && <p className={styles.error}>{errors?.confirmPassword}</p>}
    //                             </div>          
    //                             <button type="submit" className={styles.btn}>Register</button>
    //                         </>
    //                     ) : (
    //                         <div className={styles.form} style={{marginTop: '2rem'}}>
    //                             <div onClick={switchMode}>
    //                                 {
    //                                     isRegister ? (
    //                                         <div>
    //                                             Already have an account? <button className={styles.btn2}>Login</button>
    //                                         </div>
    //                                         ) : (
    //                                         <div>
    //                                             <h3>Is this your first time booking a massage with Cip?</h3>
    //                                             <div>
    //                                                 <button className={styles.btn2}>Register here</button>
    //                                             </div>
    //                                         </div>
    //                                         )
    //                                 }
    //                             </div>
    //                             <h3>Otherwise, login here</h3>
    //                             <label>Email</label>
    //                             <input className={styles.forminput} name="email" type="text" label="Email" value={values.email} onChange={handleChange} />
    //                             {errors?.email && <p className={styles.error}>{errors?.email}</p>}
    //                             <label>Password</label>
    //                             <input className={styles.forminput} name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
    //                             {errors?.password && <p className={styles.error}>{errors?.password}</p>}
    //                             <button type="submit" className={styles.btn}>Login</button>
    //                         </div>
    //                     )
    //                 }
                
    //             </div>   
    //         </form>
    //     </div>
        
    // )
}

export default Auth
