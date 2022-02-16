import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

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
                    console.log(response)
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
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <label>New password</label>
                <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
                <label>Confirm new password</label>
                <input type="password" value={newPassword2} onChange={e=>setNewPassword2(e.target.value)} />
                {error ? (<div>{error}</div>) : (<div></div>)}
                <button type="submit">Reset password</button>
            </form>
            ) : updateFailed ? (
                <div>
                    Please try again.
                </div>
            ) : (
                <div>
                    This password reset link has expired. Click here to send new password reset link.
                </div>
            )}
        </div>
    )
}

export default NewPassword