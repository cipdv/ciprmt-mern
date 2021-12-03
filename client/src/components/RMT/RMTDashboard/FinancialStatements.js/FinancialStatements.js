import React from 'react'
import { useHistory } from 'react-router-dom'

const FinancialStatements = ({year, setYear, financialData}) => {

    const history = useHistory()

    const revenue = financialData?.financialState[0]?.income?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const expenses = financialData?.financialState[0]?.expenses?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const donations = financialData?.financialState[0]?.donations?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const HST = (revenue * 0.088).toFixed(2)
    const RRSP = financialData?.financialState[0]?.RRSPContributions?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    const taxes = ((revenue - expenses - donations - RRSP) * 0.15).toFixed(2)
    const netIncome = ((revenue - expenses - donations - RRSP ) * 0.85).toFixed(2)

    const selectMonth = () => {
        history.push('/rmt/financialstatements/month')
    }

    //--------INCOME PER MONTH-----------//

    const januaryi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 0
    })
    const januaryincome = januaryi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const februaryi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 1
    })
    const februaryincome = februaryi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const marchi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 2
    })
    const marchincome = marchi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const aprili = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 3
    })
    const aprilincome = aprili?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const mayi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 4
    })
    const mayincome = mayi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const junei = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 5
    })
    const juneincome = junei?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const julyi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 6
    })
    const julyincome = julyi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const augusti = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 7
    })
    const augustincome = augusti?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const septemberi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 8
    })
    const septemberincome = septemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const octoberi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 9
    })
    const octoberincome = octoberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const novemberi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 10
    })
    const novemberincome = novemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const decemberi = financialData?.financialState[0]?.income?.filter(income => {
        let m = new Date(income?.date).getMonth()
        return m === 11
    })
    const decemberincome = decemberi?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

//--------EXPENSES PER MONTH-----------//

    const january = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 0
    })
    const januaryExpenses = january?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const february = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 1
    })
    const februaryExpenses = february?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const march = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 2
    })
    const marchExpenses = march?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const april = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 3
    })
    const aprilExpenses = april?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const may = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 4
    })
    const mayExpenses = may?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const june = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 5
    })
    const juneExpenses = june?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const july = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 6
    })
    const julyExpenses = july?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const august = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 7
    })
    const augustExpenses = august?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const september = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 8
    })
    const septemberExpenses = september?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const october = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 9
    })
    const octoberExpenses = october?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)

    const november = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 10
    })
    const novemberExpenses = november?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)
    
    const december = financialData?.financialState[0]?.expenses?.filter(expense => {
        let m = new Date(expense?.date).getMonth()
        return m === 11
    })
    const decemberExpenses = december?.reduce((accumulator, current)=> accumulator + current.amount, 0).toFixed(2)


    return (
        <div>
            <h5>Select year</h5>
            <select className="ui dropdown" value={year} onChange={(e)=>setYear(e.target.value)}>
                <option value="" disabled='disabled'>Select year</option>
                <option value="2021">2021</option>
            </select>
            <h3>Total</h3>
            <table className="ui table">
                <thead>
                    <tr>
                        <th>Revenue</th>
                        <th>Expenses</th>
                        <th>Donations</th>
                        <th>RRSP Contributions</th>
                        <th>Taxes (15%)</th>
                        <th>Net Income (after taxes)</th>
                        <th>HST</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{revenue}</td>
                        <td>{expenses}</td>
                        <td>{donations}</td>
                        <td>{RRSP}</td>
                        <td>{taxes}</td>
                        <td>{netIncome}</td>
                        <td>{HST}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{marginTop: '2em'}}>
                <h4>First Quarter</h4>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Donations</th>
                            <th>RRSP Contributions</th>
                            <th>Taxes (15%)</th>
                            <th>Net Income (after taxes)</th>
                            <th>HST</th>
                        </tr>
                    </thead>
                </table>             
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>January</h5>
                <table className="ui table">
                    
                    <tbody>
                        <tr onClick={selectMonth}>
                            <td>{januaryincome}</td>
                            <td>{januaryExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((januaryincome - januaryExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((januaryincome - januaryExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(januaryincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>February</h5>
                <table className="ui table">
                    
                    <tbody>
                        <tr>
                            <td>{februaryincome}</td>
                            <td>{februaryExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((februaryincome - februaryExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((februaryincome - februaryExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(februaryincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>March</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{marchincome}</td>
                            <td>{marchExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((marchincome - marchExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((marchincome - marchExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(marchincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{marginTop: '2em'}}>
                <h4>Second Quarter</h4>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Donations</th>
                            <th>RRSP Contributions</th>
                            <th>Taxes (15%)</th>
                            <th>Net Income (after taxes)</th>
                            <th>HST</th>
                        </tr>
                    </thead>
                </table>
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>April</h5>
                <table className="ui table">
                    <tbody>                           
                        <tr>
                            <td>{aprilincome}</td>
                            <td>{aprilExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((aprilincome - aprilExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((aprilincome - aprilExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(aprilincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>May</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{mayincome}</td>
                            <td>{mayExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((mayincome - mayExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((mayincome - mayExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(mayincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <h5 style={{marginLeft: '1em', marginBottom: '1em', marginTop: '1em'}}>June</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{juneincome}</td>
                            <td>{juneExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((juneincome - juneExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((juneincome - juneExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(juneincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{marginTop: '2em'}}>
                <h4>Third Quarter</h4>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Donations</th>
                            <th>RRSP Contributions</th>
                            <th>Taxes (15%)</th>
                            <th>Net Income (after taxes)</th>
                            <th>HST</th>
                        </tr>
                    </thead>
                </table>
                <h5>July</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{julyincome}</td>
                            <td>{julyExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((julyincome - julyExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((julyincome - julyExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(julyincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h5>August</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{augustincome}</td>
                            <td>{augustExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((augustincome - augustExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((augustincome - augustExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(augustincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h5>September</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{septemberincome}</td>
                            <td>{septemberExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((septemberincome - septemberExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((septemberincome - septemberExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(septemberincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{marginTop: '2em'}}>
                <h4>Forth Quarter</h4>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>Revenue</th>
                            <th>Expenses</th>
                            <th>Donations</th>
                            <th>RRSP Contributions</th>
                            <th>Taxes (15%)</th>
                            <th>Net Income (after taxes)</th>
                            <th>HST</th>
                        </tr>
                    </thead>
                </table>
                <h5>October</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{octoberincome}</td>
                            <td>{octoberExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((octoberincome - octoberExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((octoberincome - octoberExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(octoberincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h5>November</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{novemberincome}</td>
                            <td>{novemberExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((novemberincome - novemberExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((novemberincome - novemberExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(novemberincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h5>December</h5>
                <table className="ui table">
                    <tbody>
                        <tr>
                            <td>{decemberincome}</td>
                            <td>{decemberExpenses}</td>
                            <td>{donations}</td>
                            <td>{RRSP}</td>
                            <td>{((decemberincome - decemberExpenses) * 0.15).toFixed(2)}</td>
                            <td>{((decemberincome - decemberExpenses) * 0.85).toFixed(2)}</td>
                            <td>{(decemberincome * 0.088).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinancialStatements
