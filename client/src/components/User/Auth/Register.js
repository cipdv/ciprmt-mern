import React from 'react'
import useForm from './UseForm'
import styles from './auth.module.css'
import validate from './validate'
import { useDispatch } from 'react-redux'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import { Link } from 'react-router-dom'
import { register, login, showLoader, hideLoader } from '../../../actions/auth'

const Register = () => {

    const { handleChange, values, handleRegister, errors } = useForm(validate)

    const dispatch = useDispatch()

    const showLoadingSpinner = () => {
        dispatch(showLoader())
    }

    return (
        <>
            <div>
                Already have an account? 
                <Link to="/login">
                    <button className={styles.btn2}>Login here</button>
                </Link>
            </div>
            <form onSubmit={handleRegister}>
                <div className={styles.form}>
                    <h3>To book a massage, please register:</h3>
                    <p>
                        By registering, you will be able to access your receipts, confirm appointments, and manage your health history file.
                    </p>
                    <p>
                        All information provided is sent through a secure network in accordance with my <Link target="_blank" to="/privacypolicy">privacy policy</Link>.
                    </p>
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
            </form>
        </>
    )
}

export default Register