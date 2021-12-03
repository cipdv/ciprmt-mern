import React, {useState, useEffect} from 'react'
import FinancialStatements from './FinancialStatements'
import { useDispatch, useSelector } from 'react-redux'
import { getFinancialData } from '../../../../actions/financials'
import AddToFinancials from './AddToFinancials'

const Financials = () => {

    const dispatch = useDispatch()
    const [year, setYear] = useState('')

    const formData = {
        year
    }
    
    useEffect(()=>{
        dispatch(getFinancialData(formData))
    }, [dispatch, year, formData])

    const financialData = useSelector((state)=>state?.financialsReducer)

    return (
        !financialData ? (
            <div>
                Loading ...
            </div>
        ) : (
            <div>
                <AddToFinancials />
                <FinancialStatements setYear={setYear} financialData={financialData} year={year} />
            </div>
        )    
    )
}

export default Financials
