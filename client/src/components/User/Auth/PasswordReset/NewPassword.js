import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import styles from '../auth.module.css'

const NewPassword = () => {

    const params = useParams()
    const history = useHistory()

    const resetToken = params?.token

    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState('')
    const [updateFailed, setUpdateFailed] = useState(false)

    const data = {
        email,
        newPassword
    }

    useEffect(async ()=>{
        await axios.post(`https://cip-mern.herokuapp.com/user/validatetoken/${params?.email}/${resetToken}`)
            .then(response=>{ 
                if(response?.data?.message === "reset token is valid") {
                    setEmail(response?.data?.email)
                    setIsValid(true)
                }
            })
    }, [])

    const resetPassword = async (e) => {
        e.preventDefault()
        if (newPassword === newPassword2) {
            await axios.post(`https://cip-mern.herokuapp.com/user/resetpassword`, data)
                .then(response=>{
                    if(response?.data?.message === 'user updated') {
                        alert('password successfully updated')
                        history.push('/auth')
                    } else {
                        setNewPassword('')
                        setNewPassword2('')
                        setUpdateFailed(true)
                    }
                })
        } else if (newPassword !== newPassword2) {
            setError('passwords do not match')
        }
    }

    return (
        <div>
            {isValid ? (
                <form onSubmit={resetPassword}>
                <label>Email</label>
                <input className={styles.forminput} type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <label>New password</label>
                <input className={styles.forminput} type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
                <label>Confirm new password</label>
                <input className={styles.forminput} type="password" value={newPassword2} onChange={e=>setNewPassword2(e.target.value)} />
                {error ? (<div>{error}</div>) : (<div></div>)}
                <button className={styles.btn} type="submit">Reset password</button>
            </form>
            ) : updateFailed ? (
                <div>
                    Please try again.
                </div>
            ) : (
                <div>
                    <p>This password reset link may have expired - try refreshing this page.</p>
                    <p>If this does not work, <Link to="/auth/resetpassword">click here</Link> to send a new link.</p>
                </div>
            )}
        </div>
    )
}

export default NewPassword