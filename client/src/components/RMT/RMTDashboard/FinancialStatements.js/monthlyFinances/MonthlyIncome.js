//dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//api calls
import { getIncomeByMonthAndYear } from '../../../../../actions/financials'

const MonthlyIncome = ({year, month}) => {

    const dispatch = useDispatch()

    useEffect(()=>{

        const mm = parseInt(month, 10)
        const mmonth = mm + 1

        const body = {
            year,
            month: mmonth
        }

        dispatch(getIncomeByMonthAndYear(body))
    }, [dispatch])

    const incomeByMonth = useSelector((state)=>state?.financialsReducer?.incomeByMonth)    

  return (
    <div>
        <div>
            <h3>Income for {month}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Details</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeByMonth && incomeByMonth.map((income)=>(
                        <tr key={income?._id}>
                            <td>{income?.category}</td>
                            <td>{income?.details}</td>
                            <td>${income?.amount.toFixed(2)}</td>
                            <td>{new Date(income?.date).toLocaleDateString('en-ca')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MonthlyIncome