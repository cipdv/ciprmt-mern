//dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
//api calls
import { getIncomes, getExpenses } from '../../../../../actions/financials'
import MonthlyIncome from './MonthlyIncome'

const MonthlyFinances = () => {

    const params = useParams()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const formData = {
            year: params?.year
        }

        dispatch(getIncomes(formData))
        dispatch(getExpenses(formData))
    }, [])

    const incomeData = useSelector((state)=>state?.financialsReducer?.income)
    const expensesData = useSelector((state)=>state?.financialsReducer?.expenses)

    return (
        <div>
            <MonthlyIncome incomeData={incomeData} year={params?.year} month={params?.month}/>
        </div>
    )
}

export default MonthlyFinances