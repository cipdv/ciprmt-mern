import React, { useState } from 'react'

const NewLogin = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        general: '',
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        setErrors({
            email: 'wrong email'
        })
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label className={!errors?.email ? ('') : ('label-error')}>{!errors?.email ? ('Email') : (errors?.email)}</label>
                <input
                    type='text'
                    name='email'
                    placeholder={!errors?.email ? ('Email') : (errors?.email)}
                    className={!errors?.email ? ('') : ('form-error')}
                    value={values.email} 
                    onChange={handleChange} 
                />
                <label className={!errors?.password ? ('') : ('label-error')}>{!errors?.password ? ('Password') : (errors?.password)}</label>
                <input
                    type='password'
                    name='password'
                    placeholder={!errors?.password ? ('Password') : (errors?.password)}
                    className={!errors?.password ? ('') : ('form-error')}
                    value={values.password} 
                    onChange={handleChange} 
                />
                <button type='submit'>Login</button>
            </form> 
        </div>
  )
}

export default NewLogin