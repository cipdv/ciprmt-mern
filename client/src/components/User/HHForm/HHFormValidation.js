export default function HHFormValidation (formData) {
    let errors = {}

    console.log('errors form data', formData)

    if(formData.phoneNumber === '') {
        errors.phoneNumber = 'Phone number is required'
    }

    if(formData.occupation === '') {
        errors.occupation = `Occupation is required. If none currently, put "none"`
    }

    console.log('errors valivdation', errors)
    return errors
} 