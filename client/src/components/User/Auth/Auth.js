import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { register, login } from '../../../actions/auth'
import { useHistory } from 'react-router-dom'
import useForm from './UseForm'
import validate from './validate'
import './auth.css'

// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

    const { handleChange, values, handleSubmit, isRegister, switchMode, errors } = useForm(validate)

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

    return (
        <div>
            <form className="ui form" onSubmit={handleSubmit}>
                <div>
                    {
                        isRegister ? (
                            <>
                                <div>
                                <h3>Register:</h3>
                                    <label>First name</label>
                                    <input name="firstName" label="First name" type="text" value={values.firstName} onChange={handleChange} />
                                    {errors?.firstName && <p className="auth-error">{errors?.firstName}</p>}
                                    <label>Last name</label>
                                    <input name="lastName" label="Last name" type="text" value={values.lastName} onChange={handleChange} />
                                    {errors?.lastName && <p className="auth-error">{errors?.lastName}</p>}
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input name="email" label="Email" type="email" value={values.email} onChange={handleChange} />
                                    {errors?.email && <p className="auth-error">{errors?.email}</p>}
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input name="password" label="Password" type="password" value={values.password} onChange={handleChange} />
                                    {errors?.password && <p className="auth-error">{errors?.password}</p>}
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input name="confirmPassword" label="Confirm Password" value={values.confirmPassword} type="password" onChange={handleChange} />
                                    {errors?.confirmPassword && <p className="auth-error">{errors?.confirmPassword}</p>}
                                </div>          
                                <button type="submit" className="ui button ">Register</button>
                            </>
                        ) : (
                            <div>
                                <h3>Login</h3>
                                <label>Email</label>
                                <input name="email" type="text" label="Email" value={values.email} onChange={handleChange} />
                                <label>Password</label>
                                {errors?.email && <p className="auth-error">{errors?.email}</p>}
                                <input name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
                                {errors?.password && <p className="auth-error">{errors?.password}</p>}
                                <button type="submit" className="ui button">Login</button>
                            </div>
                        )
                    }
                <div onClick={switchMode}>
                    {
                        isRegister ? 'Already have an account? Login here' : 'First time booking a massage? Click here to register'
                    }
                </div>
                </div>   
            </form>
        </div>
        
    )
}

export default Auth
