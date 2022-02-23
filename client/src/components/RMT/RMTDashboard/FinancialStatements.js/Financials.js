import React, {useState, useEffect} from 'react'
import FinancialStatements from './FinancialStatements'
import { useDispatch } from 'react-redux'
import { getIncomes, getExpenses } from '../../../../actions/financials'
import AddToFinancials from './AddToFinancials'

const Financials = ({user}) => {

    const dispatch = useDispatch()
    const [year, setYear] = useState('')

    const formData = {
        year
    }
    
    useEffect(()=>{
        dispatch(getIncomes(formData))
        dispatch(getExpenses(formData))
    }, [dispatch, formData])

    return (
        // !financialData ? (
        //     <div>
        //         Loading ...
        //     </div>
        // ) : (
            <div>
                {/* <AddToFinancials /> */}
                {/* <FinancialStatements setYear={setYear} financialData={financialData} year={year} user={user}/> */}
                <AddToFinancials />
                <FinancialStatements setYear={setYear} year={year} user={user}/>
            </div>
        )    
    // )
}

export default Financials
