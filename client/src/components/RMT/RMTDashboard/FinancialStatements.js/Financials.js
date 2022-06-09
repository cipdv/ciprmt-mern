//dependencies
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
//actions
import { getIncomes, getExpenses } from '../../../../actions/financials'
//components
import FinancialStatements from './FinancialStatements'
import AddToFinancials from './AddToFinancials'

const Financials = ({user}) => {

    const dispatch = useDispatch()
    const [year, setYear] = useState('')
    const [reload, setReload] = useState(false)

    const formData = {
        year
    }
    
    useEffect(()=>{
        dispatch(getIncomes(formData))
        dispatch(getExpenses(formData))
        setReload(false)
    }, [dispatch, formData, reload, setReload])

    return (
        <div>
            <AddToFinancials setReload={setReload} />
            <FinancialStatements setYear={setYear} year={year} user={user} />
        </div>
    )    
}

export default Financials
