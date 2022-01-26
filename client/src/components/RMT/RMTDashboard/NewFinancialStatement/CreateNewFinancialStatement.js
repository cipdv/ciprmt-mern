import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewFinancialStatement } from '../../../../actions/financials'
import styles from '../rmtdashboard.module.css'

const CreateNewFinancialStatement = ({user}) => {
    
    const dispatch = useDispatch()

    const [year, setYear] = useState('')

    const createNewFS = (e) => {
        e.preventDefault()
        dispatch(createNewFinancialStatement(user?.result?._id, {year}))
        setYear('')
    }

    return (
        <div className={styles.box}>
            <form onSubmit={createNewFS}>
                <div className={styles.inline}>
                    <input className={styles.forminput} type="text" value={year} onChange={e=>setYear(e.target.value)} />
                    <button className={styles.btn} type="submit">Create new financial statement</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewFinancialStatement;
