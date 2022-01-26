import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTransactionToFinancialStatement } from '../../../../actions/financials'
import styles from '../rmtdashboard.module.css'

const AddTransaction = () => {

    const dispatch = useDispatch()

    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [details, setDetails] = useState('')

    const addTransaction = (e) => {
        e.preventDefault()
        dispatch(addTransactionToFinancialStatement(formData))
        clear()
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
        <div className={styles.box}>
            <form onSubmit={addTransaction}>
                <div>
                    <div>
                        <select value={type} onChange={(e)=>setType(e.target.value)} className={styles.forminput} placeholder="Select type">
                            <option value="" disabled="disabled">Select transaction type</option>
                            <option>Income</option>
                            <option>Expense</option>
                            <option>RRSP Contribution</option>
                            <option>Donation</option>
                        </select>
                    </div>
                    <div>
                        <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className={styles.forminput} />
                    </div>
                    <div>
                        <input value={amount} onChange={(e)=>setAmount(e.target.value)} className={styles.forminput} type="text" placeholder="Amount"/>
                    </div>
                    <div>
                    { type ==='Income' ? (
                        <select className={styles.forminput} placeholder="Select category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="" disabled="disabled">Select category</option>
                            <option value="government credit">government credit</option>
                            <option value="revenue">revenue</option>
                            <option value="other income">other income</option>
                        </select>
                    ) : type === 'Expense' ? (
                            <select className={styles.forminput} placeholder="Select category" value={category} onChange={(e)=>setCategory(e.target.value)} >
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
                            <option value="other expense">other expense</option>
                        </select>
                    ) : (
                        <select className={styles.forminput} placeholder="No category to select">
                            <option value="" disabled="disabled">No category to select</option>
                        </select>
                    )}
                    </div>
                    <div value={details} onChange={(e)=>setDetails(e.target.value)}>
                        <input className={styles.forminput} type="text" placeholder="Details"/>
                    </div>
                    <button type="submit" className={styles.btn}>Add</button>
                </div>                 
            </form>
        </div>
    )
}

export default AddTransaction
