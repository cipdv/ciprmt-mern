//dependencies
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//api calls
import { addToFinancials } from '../../../../actions/financials'
import { showLoadingScreen } from '../../../../actions/loadingScreen'
//components
import LoadingScreen from '../../../../LoadingScreen/LoadingScreen'
//styling
import styles from '../rmtdashboard.module.css'

const AddToFinancials = ({setReload}) => {

    const dispatch = useDispatch()

    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState('')
    const [errors, setErrors] = useState({
        general: ''
    })

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(showLoadingScreen())
        dispatch(addToFinancials(formData, setErrors))
        clear()
        setReload(true)
    }

    const clear = () => {
        setType('')
        setDate('')
        setAmount('')
        setCategory('')
        setDetails('')
    }

    const formData = {
        type,
        date,
        amount,
        category,
        details
    }

    return (    
        <>
            <LoadingScreen /> 
            <div className={styles.box}>
                {errors?.general && <h3>{errors?.general}</h3>}
                <form onSubmit={handleAdd}>
                    <div className='inline'>
                        <select value={type} onChange={(e)=>setType(e.target.value)} placeholder="Select type">
                            <option value="" disabled="disabled">Select transaction type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                            <option value="rrsp">RRSP Contribution</option>
                            <option value="donation">Donation</option>
                        </select>
                        <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className={styles.forminput} />
                        <div>
                            <input value={amount} onChange={(e)=>setAmount(e.target.value)} className={styles.forminput} type="text" placeholder="Amount"/>
                        </div>
                        <div>
                        { type ==='income' ? (
                            <select placeholder="Select category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value="" disabled="disabled">Select category</option>
                                <option value="government credit">government credit</option>
                                <option value="revenue">revenue</option>
                                <option value="other income">other income</option>
                            </select>
                        ) : type === 'expense' ? (
                                <select placeholder="Select category" value={category} onChange={(e)=>setCategory(e.target.value)} >
                                <option value="" disabled="disabled">Select category</option>
                                <option value="supplies">supplies</option>
                                <option value="advertising">advertising</option>
                                <option value="travel">travel</option>
                                <option value="licenses">licenses</option>
                                <option value="insurance">insurance</option>
                                <option value="interest paid">interest paid</option>
                                <option value="repairs and maintenance">repairs and maintenance</option>
                                <option value="office supplies">office supplies</option>
                                <option value="bank fees">bank fees</option>
                                <option value="administrative fees">administrative fees</option>
                                <option value="rent">rent</option>
                                <option value="hydro">hydro</option>
                                <option value="gas">gas</option>
                                <option value="phone">phone</option>
                                <option value="internet">internet</option>
                                <option value="other expense">other expense</option>
                            </select>
                        ) : (
                            <select placeholder="No category to select">
                                <option value="" disabled="disabled">No category to select</option>
                            </select>
                        )}
                        </div>
                        <div>
                            <input value={details} onChange={(e)=>setDetails(e.target.value)} className={styles.forminput} type="text" placeholder="Details"/>
                        </div>
                        <button type="submit" className={styles.btn}>Add</button>
                    </div>                 
                </form>
            </div>
        </>
    )
}

export default AddToFinancials
