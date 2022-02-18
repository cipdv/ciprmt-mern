import { useDispatch } from "react-redux"

export default function validate(values) {
    let errors = {}

    if(!values?.firstName) {
        errors.firstName = 'First name required'
    }

    if(!values?.lastName) {
        errors.lastName = 'Last name required'
    }

    if(!values?.email) {
        errors.email = 'Email required'
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values?.email)) {
        errors.email = 'Not a valid email address'
    }

    if(!values?.password) {
        errors.password = 'Password required'
    }

    if(!values?.confirmPassword) {
        errors.confirmPassword = 'Please retype password'
    } else if (values?.confirmPassword !== values?.password) {
        errors.confirmPassword = 'Passwords do not match'
    }
    
    return errors

}