import React from 'react'
import useForm from './UseForm'
import styles from './auth.module.css'
import validate from './validate'
import { useDispatch } from 'react-redux'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner'
import { Link } from 'react-router-dom'
import { showLoader } from '../../../actions/auth'


const Login = () => {

    const { handleChange, values, handleLogin, errors } = useForm(validate)

    const dispatch = useDispatch()

    const showLoadingSpinner = () => {
        dispatch(showLoader())
    }

    return (
        <div className={styles.main}>
            <LoadingSpinner />
            <div>
                <h4>Is this your first time booking a massage with Cip?</h4>
                <div> 
                    <Link to="/register">
                        <button className={styles.btn}>Register here</button>
                    </Link>
                </div>
            </div>
            <form onSubmit={handleLogin}>
                <div className={styles.form}>
                    <h4>Otherwise, login here</h4>
                    <label>Email</label>
                    <input className={styles.forminput} name="email" type="text" label="Email" value={values.email} onChange={handleChange} />
                    {errors?.email && <p className={styles.error}>{errors?.email}</p>}
                    <label>Password</label>
                    <input className={styles.forminput} name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
                    {errors?.password && <p className={styles.error}>{errors?.password}</p>}
                    <button type="submit" className={styles.btn} onClick={showLoadingSpinner}>Login</button>
                    <Link to="/auth/resetpassword">
                        <div>
                            Forgot your password? Click here
                        </div>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login