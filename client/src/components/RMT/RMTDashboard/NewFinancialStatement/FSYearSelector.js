import React, { useState } from 'react';
import styles from '../rmtdashboard.module.css'

const FSYearSelector = ({setFSYear}) => {

    const [year, setYear] = useState('')
    const selectYear = (value) => {
        setYear(value)
        setFSYear(value)
    }

    return (
        <div>
            <select className={styles.forminput} value={year} onChange={e=>selectYear(e.target.value)}>
                <option value="" disabled="disabled">Select year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
        </div>
    )
}

export default FSYearSelector;
