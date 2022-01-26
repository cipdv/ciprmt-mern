import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const FinancialStatement = ({FSyear}) => {

    const financialStatements = useSelector((state)=>state?.financialsReducer?.financialStatements)
    console.log('financials', financialStatements)

    const [income, setIncome] = useState('')
    const [expenses, setExpenses] = useState('')
    const [donation, setDonations] = useState('')
    const [rrspContributions, setRrspContributions] = useState('')
    const [taxes, setTaxes] = useState('')
    const [netIncome, setNetIncome] = useState('')
    const [hst, setHst] = useState('')

    useEffect(()=>{
        if (financialStatements.length > 0) {
            const currentFinancialStatement = financialStatements.find(({year})=>year === FSyear)
            setIncome(currentFinancialStatement?.income)
            setExpenses(currentFinancialStatement?.expenses)
            setDonations(currentFinancialStatement?.donations)
            setRrspContributions(currentFinancialStatement?.rrspContributions)
        }
    }, [FSyear])
    

    return (
        <div>
            {FSyear}
            <table>
                <thead>
                    <tr>
                        <th>Income</th>
                        <th>Expenses</th>
                        <th>Donations</th>
                        <th>RRSP Contributions</th>
                        <th>Taxes</th>
                        <th>Net Income</th>
                        <th>HST</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FinancialStatement;
