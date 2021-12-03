import React, {  useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

//components
import Home from './components/User/Home/Home'
import Auth from './components/User/Auth/Auth'
import Dashboard from './components/User/Dashboard/Dashboard'
import Navbar from './components/User/Navbar/Navbar'
import PatientProfile from './components/RMT/RMTDashboard/PatientProfile'
import AppointmentForm from './components/User/Appointments/AppointmentForm'
import RMTAuth from './components/RMT/RMTAuth/RMTAuth'
import RMTDashboard from './components/RMT/RMTDashboard/RMTDashboard'
import Appointments from './components/User/Appointments/Appointments'
import HealthHistory from './components/User/HHForm/HealthHistory'
import AppointmentReceipt from './components/User/Appointments/AppointmentReceipt'
import AddAppointment from './components/RMT/RMTDashboard/AddAppointment'
import AppointmentList from './components/RMT/RMTDashboard/AppointmentList'
import Financials from './components/RMT/RMTDashboard/FinancialStatements.js/Financials'
import MonthlyStatement from './components/RMT/RMTDashboard/FinancialStatements.js/MonthlyStatement'

const App = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    return (
        <div className="ui container tm30">
            <BrowserRouter>
                <Navbar user={user} setUser={setUser} />
                <Switch>
                    {/* User Routes */}
                    <Route path="/" exact render={() => user?.result?.userType === 'patient' ?  (<Dashboard user={user} />) : (<Redirect to="/welcome" />)} />
                    <Route path="/welcome" exact component={Home} />
                    <Route path="/auth" exact render={() => !user ? (<Auth />) : (<Redirect to="/dashboard" />)} />
                    <Route path="/healthhistory" exact render={() => user ? (<HealthHistory user={user} />) : (<Redirect to="/auth" />)} />
                    <Route path="/healthhistory/update" exact render={() => user ? (<HealthHistory user={user} />) : (<Redirect to="/auth" />)} />
                    <Route path="/dashboard" exact render={() => user?.result?.userType === 'patient' ? (<Dashboard user={user} />) : (<Redirect to="/auth" />)} />
                    <Route path="/bookappointment" exact render={()=> user?.result?.userType === 'patient' ? (<AppointmentForm />) : (<Redirect to="/auth" />) } />
                    <Route path="/dashboard/receipts" exact render={()=> user?.result?.userType === 'patient' ? (<Appointments user={user} />) : (<Redirect to="/auth" />) } />
                    <Route path="/dashboard/appointment/:id" exact render={()=> user?.result?.userType === 'patient' ? (<AppointmentReceipt user={user} />) : (<Redirect to="/auth" />) } />
                    {/* RMT Routes */}
                    <Route path="/rmt/auth" exact render={()=> user?.result?.userType !== 'rmt' ? (<RMTAuth />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path="/rmt/dashboard" exact render={()=> user?.result?.userType === 'rmt' ? (<RMTDashboard />) : (<Redirect to="/rmt/auth" />) } />
                    <Route path="/rmt/dashboard/patientprofile/:id" exact render={()=> user?.result?.userType === 'rmt' ? (<PatientProfile />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/dashboard/appointment/:id" exact render={()=> user?.result?.userType === 'rmt' ? (<AppointmentList user={user} />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/dashboard/patientprofile/:id/addappointment" exact render={()=> user?.result?.userType === 'rmt' ? (<AddAppointment user={user} />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/financialstatements" exact render={()=> user?.result?.userType === 'rmt' ? (<Financials />) : (<Redirect to="rmt/auth" />)} />
                    <Route path="/rmt/financialstatements/month" exact render={()=> user?.result?.userType === 'rmt' ? (<MonthlyStatement />) : (<Redirect to="rmt/auth" />)} />
                </Switch>
            </BrowserRouter>
        </div>       
    )
}

export default App
