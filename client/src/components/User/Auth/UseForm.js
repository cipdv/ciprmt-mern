import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { register, login } from '../../../actions/auth'
import { useHistory } from 'react-router-dom'

const useForm = (validate) => {

    //dependencies
    const dispatch = useDispatch()
    const history = useHistory()

    //states
    const [isRegister, setIsRegister] = useState(true)

    const [ values, setValues ] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
        // emailReceiptOptIn: false
    })

    const [ errors, setErrors ] = useState({})

    //functions
    const switchMode = () => {
        setIsRegister((prevIsRegister)=> !prevIsRegister)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(values))
        
        if (isRegister) {       
                dispatch(register(values, history)) 
                history.push('/')
            } else {
                dispatch(login(values, history))
                history.push('/')
            }
            
        
    }

    // useEffect(
    //     () => {
    //       if (Object.keys(errors).length === 0) {
    //         callback();
    //       }
    //     },
    //     [errors]
    //   );

    return { handleChange, values, handleSubmit, isRegister, switchMode, errors }

}

export default useForm