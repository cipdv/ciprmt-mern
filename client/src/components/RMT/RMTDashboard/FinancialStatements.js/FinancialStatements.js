import React from 'react'
import { useSelector } from 'react-redux'
import styles from './financialstyle.module.css'

const FinancialStatement = ({year, setYear}) => {

    const incomeData = useSelector((state)=>state?.financialsReducer?.income)
    const expensesData = useSelector((state)=>state?.financialsReducer?.expenses)

    const monthlyIncome = (m) => {
        const incomeArray = incomeData?.map((i)=>{
            if(new Date(i.date).getMonth() === m) {
                return i.amount
            } else {
                return null
            }
        })
        return incomeArray.reduce((accumulator, current)=> accumulator + current, 0).toFixed(2)
    }

    const monthlyExpenses = (m) => {
        const expenseArray = expensesData?.map((i)=>{
            if(new Date(i.date).getMonth() === m) {
                return i.amount
            } else {
                return null
            }
        })
        return expenseArray.reduce((accumulator, current)=> accumulator + current, 0).toFixed(2)
    }

    const januaryIncome = monthlyIncome(0)
    const januaryExpenses = monthlyExpenses(0)
    const januaryNetIncome = januaryIncome - januaryExpenses
    const februaryIncome = monthlyIncome(1)
    const februaryExpenses = monthlyExpenses(1)
    const februaryNetIncome = februaryIncome - februaryExpenses
    const marchIncome = monthlyIncome(2)
    const marchExpenses = monthlyExpenses(2)
    const marchNetIncome = marchIncome - marchExpenses
    const aprilIncome = monthlyIncome(3)
    const aprilExpenses = monthlyExpenses(3)
    const aprilNetIncome = aprilIncome - aprilExpenses
    const mayIncome = monthlyIncome(4)
    const mayExpenses = monthlyExpenses(4)
    const mayNetIncome = mayIncome - mayExpenses
    const juneIncome = monthlyIncome(5)
    const juneExpenses = monthlyExpenses(5)
    const juneNetIncome = juneIncome - juneExpenses
    const julyIncome = monthlyIncome(6)
    const julyExpenses = monthlyExpenses(6)
    const julyNetIncome = julyIncome - julyExpenses
    const augustIncome = monthlyIncome(7)
    const augustExpenses = monthlyExpenses(7)
    const augustNetIncome = augustIncome - augustExpenses
    const septemberIncome = monthlyIncome(8)
    const septemberExpenses = monthlyExpenses(8)
    const septemberNetIncome = septemberIncome - septemberExpenses
    const octoberIncome = monthlyIncome(9)
    const octoberExpenses = monthlyExpenses(9)
    const octoberNetIncome = octoberIncome - octoberExpenses
    const novemberIncome = monthlyIncome(10)
    const novemberExpenses = monthlyExpenses(10)
    const novemberNetIncome = novemberIncome - novemberExpenses
    const decemberIncome = monthlyIncome(11)
    const decemberExpenses = monthlyExpenses(11)
    const decemberNetIncome = decemberIncome - decemberExpenses

    const totalIncome = incomeData?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const totalExpenses = expensesData?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const netIncome = totalIncome - totalExpenses
    const taxes = netIncome * 0.15
    const incomeAfterTax = netIncome - taxes
    const HSTCollected = (totalIncome * 0.13).toFixed(2)
    const HSTPaid = (totalIncome * 0.088).toFixed(2)

    return (
        <div>
            <div>
                <select value={year} onChange={(e)=>setYear(e.target.value)}>
                    <option value="" disabled='disabled'>Select year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                </select>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Net Income</th>
                            <th>Taxes (15%)</th>
                            <th>Income After Tax</th>
                            <th>HST Collected (13%)</th>
                            <th>HST Quick Method (8.8%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td>
                                {totalIncome}
                            </td>
                            <td>
                                {totalExpenses}
                            </td>
                            <td>
                                {netIncome?.toFixed(2)}
                            </td>
                            <td>
                                {taxes?.toFixed(2)}
                            </td>
                            <td>
                                {incomeAfterTax?.toFixed(2)}
                            </td>
                            <td>
                                {HSTCollected}
                            </td>
                            <td>
                                {HSTPaid}
                            </td>
                        </tr>
                        <tr>
                            <td>January</td>
                            <td>{januaryIncome}</td>
                            <td>{januaryExpenses}</td>
                            <td>{januaryNetIncome.toFixed(2)}</td>
                            <td>{(januaryNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(januaryNetIncome - (januaryNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(januaryIncome * 0.13).toFixed(2)}</td>
                            <td>{(januaryIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>February</td>
                            <td>{februaryIncome}</td>
                            <td>{februaryExpenses}</td>
                            <td>{februaryNetIncome.toFixed(2)}</td>
                            <td>{(februaryNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(februaryNetIncome - (februaryNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(februaryIncome * 0.13).toFixed(2)}</td>
                            <td>{(februaryIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>March</td>
                            <td>{marchIncome}</td>
                            <td>{marchExpenses}</td>
                            <td>{marchNetIncome.toFixed(2)}</td>
                            <td>{(marchNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(marchNetIncome - (marchNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(marchIncome * 0.13).toFixed(2)}</td>
                            <td>{(marchIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>April</td>
                            <td>{aprilIncome}</td>
                            <td>{aprilExpenses}</td>
                            <td>{aprilNetIncome.toFixed(2)}</td>
                            <td>{(aprilNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(aprilNetIncome - (aprilNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(aprilIncome * 0.13).toFixed(2)}</td>
                            <td>{(aprilIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>May</td>
                            <td>{mayIncome}</td>
                            <td>{mayExpenses}</td>
                            <td>{mayNetIncome.toFixed(2)}</td>
                            <td>{(mayNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(mayNetIncome - (mayNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(mayIncome * 0.13).toFixed(2)}</td>
                            <td>{(mayIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>June</td>
                            <td>{juneIncome}</td>
                            <td>{juneExpenses}</td>
                            <td>{juneNetIncome.toFixed(2)}</td>
                            <td>{(juneNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(juneNetIncome - (juneNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(juneIncome * 0.13).toFixed(2)}</td>
                            <td>{(juneIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>July</td>
                            <td>{julyIncome}</td>
                            <td>{julyExpenses}</td>
                            <td>{julyNetIncome.toFixed(2)}</td>
                            <td>{(julyNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(julyNetIncome - (julyNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(julyIncome * 0.13).toFixed(2)}</td>
                            <td>{(julyIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>August</td>
                            <td>{augustIncome}</td>
                            <td>{augustExpenses}</td>
                            <td>{augustNetIncome.toFixed(2)}</td>
                            <td>{(augustNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(augustNetIncome - (augustNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(augustIncome * 0.13).toFixed(2)}</td>
                            <td>{(augustIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>September</td>
                            <td>{septemberIncome}</td>
                            <td>{septemberExpenses}</td>
                            <td>{septemberNetIncome.toFixed(2)}</td>
                            <td>{(septemberNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(septemberNetIncome - (septemberNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(septemberIncome * 0.13).toFixed(2)}</td>
                            <td>{(septemberIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>October</td>
                            <td>{octoberIncome}</td>
                            <td>{octoberExpenses}</td>
                            <td>{octoberNetIncome.toFixed(2)}</td>
                            <td>{(octoberNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(octoberNetIncome - (octoberNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(octoberIncome * 0.13).toFixed(2)}</td>
                            <td>{(octoberIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>November</td>
                            <td>{novemberIncome}</td>
                            <td>{novemberExpenses}</td>
                            <td>{novemberNetIncome.toFixed(2)}</td>
                            <td>{(novemberNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(novemberNetIncome - (novemberNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(novemberIncome * 0.13).toFixed(2)}</td>
                            <td>{(novemberIncome * 0.088).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>December</td>
                            <td>{decemberIncome}</td>
                            <td>{decemberExpenses}</td>
                            <td>{decemberNetIncome.toFixed(2)}</td>
                            <td>{(decemberNetIncome * 0.15).toFixed(2)}</td>
                            <td>{(decemberNetIncome - (decemberNetIncome * 0.15)).toFixed(2)}</td>
                            <td>{(decemberIncome * 0.13).toFixed(2)}</td>
                            <td>{(decemberIncome * 0.088).toFixed(2)}</td>
                        </tr>                
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinancialStatement


//  import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { createNewFinancialStatement } from '../../../../actions/financials'
// import styles from '../rmtdashboard.module.css'

// const FinancialStatements = ({year, setYear, financialData, user}) => {

//     const dispatch = useDispatch()
//     const history = useHistory()

//     const [newFSYear, setNewFSYear] = useState('')

//     const revenue = financialData?.financialState[0]?.income?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
//     const expenses = financialData?.financialState[0]?.expenses?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
//     const donations = financialData?.financialState[0]?.donations?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
//     const HST = (revenue * 0.088).toFixed(2)
//     const RRSP = financialData?.financialState[0]?.RRSPContributions?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
//     const taxes = ((revenue - expenses - donations - RRSP) * 0.15).toFixed(2)
//     const netIncome = ((revenue - expenses - donations - RRSP ) * 0.85).toFixed(2)

//     const selectMonth = () => {
//         history.push('/rmt/financialstatements/month')
//     }

//     //--------INCOME PER MONTH-----------//

//     const januaryi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 0
//     })
//     const januaryincome = januaryi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const februaryi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 1
//     })
//     const februaryincome = februaryi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const marchi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 2
//     })
//     const marchincome = marchi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const aprili = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 3
//     })
//     const aprilincome = aprili?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const mayi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 4
//     })
//     const mayincome = mayi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const junei = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 5
//     })
//     const juneincome = junei?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const julyi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 6
//     })
//     const julyincome = julyi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const augusti = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 7
//     })
//     const augustincome = augusti?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const septemberi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 8
//     })
//     const septemberincome = septemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const octoberi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 9
//     })
//     const octoberincome = octoberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const novemberi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 10
//     })
//     const novemberincome = novemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const decemberi = financialData?.financialState[0]?.income?.filter(income => {
//         let m = new Date(income?.date).getMonth()
//         return m === 11
//     })
//     const decemberincome = decemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

// //--------EXPENSES PER MONTH-----------//

//     const january = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 0
//     })
//     const januaryExpenses = january?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const february = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 1
//     })
//     const februaryExpenses = february?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const march = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 2
//     })
//     const marchExpenses = march?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const april = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 3
//     })
//     const aprilExpenses = april?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const may = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 4
//     })
//     const mayExpenses = may?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const june = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 5
//     })
//     const juneExpenses = june?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const july = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 6
//     })
//     const julyExpenses = july?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const august = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 7
//     })
//     const augustExpenses = august?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const september = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 8
//     })
//     const septemberExpenses = september?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const october = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 9
//     })
//     const octoberExpenses = october?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//     const november = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 10
//     })
//     const novemberExpenses = november?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    
//     const december = financialData?.financialState[0]?.expenses?.filter(expense => {
//         let m = new Date(expense?.date).getMonth()
//         return m === 11
//     })
//     const decemberExpenses = december?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)


//     const createNewFinancialStatement = (e) => {
//         e.preventDefault()
//         dispatch(createNewFinancialStatement(user?.result?._id, newFSYear))
//     }

//     return (
//         <div className={styles.box}>
//             <div>
//                 <input className={styles.forminput} type="text" placeholder='year' value={newFSYear} onChange={(e)=>setNewFSYear(e.target.value)} />
//                 <button className={styles.btn} onClick={createNewFinancialStatement}>Create new financial statement</button>
//             </div>
//             <div>
//                 <select className={styles.forminput} value={year} onChange={(e)=>setYear(e.target.value)}>
//                     <option value="" disabled='disabled'>Select year</option>
//                     <option value="2022">2022</option>
//                     <option value="2023">2023</option>
//                     <option value="2024">2024</option>
//                     <option value="2025">2025</option>
//                     <option value="2026">2026</option>
//                     <option value="2027">2027</option>
//                 </select>
//             </div>
//             <h3>Total</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Revenue</th>
//                         <th>Expenses</th>
//                         <th>Donations</th>
//                         <th>RRSP Contributions</th>
//                         <th>Taxes (15%)</th>
//                         <th>Net Income (after taxes)</th>
//                         <th>HST</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{revenue}</td>
//                         <td>{expenses}</td>
//                         <td>{donations}</td>
//                         <td>{RRSP}</td>
//                         <td>{taxes}</td>
//                         <td>{netIncome}</td>
//                         <td>{HST}</td>
//                     </tr>
//                 </tbody>
//             </table>
//             <div style={{marginTop: '2em'}}>
//                 <h4>First Quarter</h4>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Revenue</th>
//                             <th>Expenses</th>
//                             <th>Donations</th>
//                             <th>RRSP Contributions</th>
//                             <th>Taxes (15%)</th>
//                             <th>Net Income (after taxes)</th>
//                             <th>HST</th>
//                         </tr>
//                     </thead>
//                 </table>             
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>January</h5>
//                 <table>
                    
//                     <tbody>
//                         <tr onClick={selectMonth}>
//                             <td>{januaryincome}</td>
//                             <td>{januaryExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((januaryincome - januaryExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((januaryincome - januaryExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(januaryincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>February</h5>
//                 <table>
                    
//                     <tbody>
//                         <tr>
//                             <td>{februaryincome}</td>
//                             <td>{februaryExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((februaryincome - februaryExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((februaryincome - februaryExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(februaryincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>March</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{marchincome}</td>
//                             <td>{marchExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((marchincome - marchExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((marchincome - marchExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(marchincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div style={{marginTop: '2em'}}>
//                 <h4>Second Quarter</h4>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Revenue</th>
//                             <th>Expenses</th>
//                             <th>Donations</th>
//                             <th>RRSP Contributions</th>
//                             <th>Taxes (15%)</th>
//                             <th>Net Income (after taxes)</th>
//                             <th>HST</th>
//                         </tr>
//                     </thead>
//                 </table>
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>April</h5>
//                 <table>
//                     <tbody>                           
//                         <tr>
//                             <td>{aprilincome}</td>
//                             <td>{aprilExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((aprilincome - aprilExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((aprilincome - aprilExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(aprilincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>May</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{mayincome}</td>
//                             <td>{mayExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((mayincome - mayExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((mayincome - mayExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(mayincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>June</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{juneincome}</td>
//                             <td>{juneExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((juneincome - juneExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((juneincome - juneExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(juneincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div style={{marginTop: '2em'}}>
//                 <h4>Third Quarter</h4>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Revenue</th>
//                             <th>Expenses</th>
//                             <th>Donations</th>
//                             <th>RRSP Contributions</th>
//                             <th>Taxes (15%)</th>
//                             <th>Net Income (after taxes)</th>
//                             <th>HST</th>
//                         </tr>
//                     </thead>
//                 </table>
//                 <h5>July</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{julyincome}</td>
//                             <td>{julyExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((julyincome - julyExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((julyincome - julyExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(julyincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <h5>August</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{augustincome}</td>
//                             <td>{augustExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((augustincome - augustExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((augustincome - augustExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(augustincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <h5>September</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{septemberincome}</td>
//                             <td>{septemberExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((septemberincome - septemberExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((septemberincome - septemberExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(septemberincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div style={{marginTop: '2em'}}>
//                 <h4>Forth Quarter</h4>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Revenue</th>
//                             <th>Expenses</th>
//                             <th>Donations</th>
//                             <th>RRSP Contributions</th>
//                             <th>Taxes (15%)</th>
//                             <th>Net Income (after taxes)</th>
//                             <th>HST</th>
//                         </tr>
//                     </thead>
//                 </table>
//                 <h5>October</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{octoberincome}</td>
//                             <td>{octoberExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((octoberincome - octoberExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((octoberincome - octoberExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(octoberincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <h5>November</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{novemberincome}</td>
//                             <td>{novemberExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((novemberincome - novemberExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((novemberincome - novemberExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(novemberincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <h5>December</h5>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>{decemberincome}</td>
//                             <td>{decemberExpenses}</td>
//                             <td>{donations}</td>
//                             <td>{RRSP}</td>
//                             <td>{((decemberincome - decemberExpenses) * 0.15).toFixed(2)}</td>
//                             <td>{((decemberincome - decemberExpenses) * 0.85).toFixed(2)}</td>
//                             <td>{(decemberincome * 0.088).toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default FinancialStatements
