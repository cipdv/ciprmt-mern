//dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//api calls
import { getExpensesByMonthAndYear } from '../../../../../actions/financials'

const MonthlyExpenses = ({year, month}) => {

    const dispatch = useDispatch()

    useEffect(()=>{

        const mm = parseInt(month, 10)
        const mmonth = mm + 1

        const body = {
            year,
            month: mmonth
        }

        dispatch(getExpensesByMonthAndYear(body))
    }, [dispatch])

    const expensesByMonth = useSelector((state)=>state?.financialsReducer?.expensesByMonth)    

  return (
    <div>
        <div>
            <h3>Expenses for {month}</h3>
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
                    {expensesByMonth && expensesByMonth.map((expense)=>(
                        <tr key={expense?._id}>
                            <td>{expense?.category}</td>
                            <td>{expense?.details}</td>
                            <td>${expense?.amount?.toFixed(2)}</td>
                            <td>{new Date(expense?.date).toLocaleDateString('en-ca')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MonthlyExpenses