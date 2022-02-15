import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {emailResetPassword} from '../../../../api/index'

const PasswordReset = () => {

    const history = useHistory()

    const [email, setEmail] = useState('')

    const data = {
        email: email
    }

    const sendResetEmail = () => {
        emailResetPassword(data)
        history.push('/')
    }

    return (
        <div>
            <form onSubmit={sendResetEmail}>
                <h3>Password Reset</h3>
                <p>Please enter the email address you used to register your account. A link to reset your password will be sent to your email.</p>
                <label>Email address:</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button type="submit">Send reset link</button>
            </form>
        </div>
    )
}

export default PasswordReset