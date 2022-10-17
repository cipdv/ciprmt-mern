//dependencies
import React from 'react'
import { useParams } from 'react-router-dom'
//api calls
import MonthlyExpenses from './MonthlyExpenses'
import MonthlyIncome from './MonthlyIncome'

const MonthlyFinances = () => {

    const params = useParams()

    return (
        <div>
            <MonthlyIncome year={params?.year} month={params?.month}/>
            <MonthlyExpenses year={params?.year} month={params?.month} />
        </div>
    )
}

export default MonthlyFinances