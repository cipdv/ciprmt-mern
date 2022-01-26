import React, { useEffect, useState } from 'react';
import FinancialStatement from './FinancialStatement';
import CreateNewFinancialStatement from './CreateNewFinancialStatement';
import FSYearSelector from './FSYearSelector';
import { useDispatch } from 'react-redux';
import { getFinancialData, getFinancialStatementsByRMTId } from '../../../../actions/financials';
import AddTransaction from './AddTransaction';

const Finances = ({user}) => {
    
    const [FSyear, setFSYear] = useState('')

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getFinancialStatementsByRMTId(user?.result?._id))
    }, [])

    return (
        <div>
            <AddTransaction />
            <FSYearSelector setFSYear={setFSYear} />
            <FinancialStatement FSyear={FSyear}/>
            <CreateNewFinancialStatement user={user} />
        </div>
    )
}

export default Finances;
