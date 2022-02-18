import React, {  useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'


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
import RFHHHForm from './components/User/HHForm/RFHHHForm'
import PrivacyPolicy from './components/User/Home/PrivacyPolicy'
import ConsentInfo from './components/User/Home/ConsentInfo'
import CovidMeasures from './components/User/Home/CovidMeasures'
import MaintenanceLog from './components/RMT/RMTDashboard/MaintenanceLog/MaintenanceLog'
import TreatmentPlan from './components/RMT/RMTDashboard/TreatmentPlan'
import Treatment from './components/RMT/RMTDashboard/Treatment'
import TreatmentPlanAddNew from './components/RMT/RMTDashboard/TreatmentPlanAddNew'
import TreatmentAddnew from './components/RMT/RMTDashboard/TreatmentAddnew'
import Prices from './components/User/Home/Prices'
//references
import HealthHistoryForm from './components/References/HealthHistoryForm'
import AppointmentConfirmation from './components/References/AppointmentConfirmation'
//financials practice
import Finances from './components/RMT/RMTDashboard/NewFinancialStatement/Finances'
import Journal from './components/RMT/RMTDashboard/Journal/Journal'
import DailyLog from './components/RMT/RMTDashboard/DailyLog/DailyLog'
//password reset
import PasswordReset from './components/User/Auth/PasswordReset/PasswordReset'
import NewPassword from './components/User/Auth/PasswordReset/NewPassword'
import Login from './components/User/Auth/Login'
import Register from './components/User/Auth/Register'


const App = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    return (
        <div >
            <BrowserRouter>
                <Navbar user={user} setUser={setUser} />
                <Switch>
                    {/* User Routes */}
                    <Route path="/" exact render={() => user?.result?.userType === 'patient' ?  (<Dashboard user={user} />) : user?.result?.userType === 'rmt' ? (<RMTDashboard />) : (<Redirect to="/welcome" />)} />
                    <Route path="/welcome" exact component={Home} />
                    <Route path="/auth" exact render={() => !user ? (<Auth />) : (<Redirect to="/dashboard" />)} />
                    <Route path="/healthhistory" exact render={() => user ?  (<HealthHistory user={user} />) : (<Redirect to="/auth" />)} />
                    <Route path="/healthhistory/update" exact render={() => user ? (<RFHHHForm user={user} />) : (<Redirect to="/auth" />)} />
                    <Route path="/dashboard" exact render={() => user?.result?.userType === 'patient' ? (<Dashboard user={user} setUser={setUser} />) : (<Redirect to="/auth" />)} />
                    <Route path="/bookappointment" exact render={()=> user?.result?.userType === 'patient' ? (<AppointmentForm />) : (<Redirect to="/auth" />) } />
                    <Route path="/dashboard/receipts" exact render={()=> user?.result?.userType === 'patient' ? (<Appointments user={user} />) : (<Redirect to="/auth" />) } />
                    <Route path="/dashboard/appointment/:id" exact render={()=> user?.result?.userType === 'patient' ? (<AppointmentReceipt user={user} />) : (<Redirect to="/auth" />) } />
                    <Route path="/privacypolicy" exact component={PrivacyPolicy} />
                    <Route path="/dashboard/consentinfo" exact component={ConsentInfo} />
                    <Route path="/covidmeasures" exact component={CovidMeasures} />
                    <Route path="/prices" exact component={Prices} />
                    {/* RMT Routes */}
                    <Route path="/rmt/auth" exact render={()=> user?.result?.userType !== 'rmt' ? (<RMTAuth />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path="/rmt/dashboard" exact render={()=> user?.result?.userType === 'rmt' ? (<RMTDashboard />) : (<Redirect to="/rmt/auth" />) } />
                    <Route path="/rmt/dashboard/patientprofile/:id" exact render={()=> user?.result?.userType === 'rmt' ? (<PatientProfile user={user} />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/dashboard/appointment/:id" exact render={()=> user?.result?.userType === 'rmt' ? (<AppointmentList user={user} />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/dashboard/patientprofile/:id/addappointment" exact render={()=> user?.result?.userType === 'rmt' ? (<AddAppointment user={user} />) : (<Redirect to="/rmt/auth" />)} />
                    <Route path="/rmt/financialstatements" exact render={()=> user?.result?.userType === 'rmt' ? (<Financials user={user} />) : (<Redirect to="rmt/auth" />)} />
                    <Route path="/rmt/financialstatements/month" exact render={()=> user?.result?.userType === 'rmt' ? (<MonthlyStatement />) : (<Redirect to="rmt/auth" />)} />
                    <Route path="/formtest" exact component={RFHHHForm} />
                    <Route path="/rmt/maintenancelog" exact render={()=> user?.result?.userType === 'rmt' ? (<MaintenanceLog user={user} />) : (<Redirect to="rmt/auth" />)} />
                    <Route path="/rmt/dashboard/patient/:clientid/treatments/:tpid" exact render={()=>user?.result?.userType === 'rmt' ? (<TreatmentPlan user={user}/>) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path='/rmt/dashboard/patient/:clientid/treatmentplan/:tpid/treatment/:tid' exact render={()=>user?.result?.userType === 'rmt' ? (<Treatment user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path='/rmt/dashboard/patient/:clientid/addtreatmentplan' exact render={()=>user?.result?.userType === 'rmt' ? (<TreatmentPlanAddNew user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path="/rmt/dashboard/patient/:clientid/treatmentplan/:tpid/addtreatment" exact render={()=>user?.result?.userType === 'rmt' ? (<TreatmentAddnew user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path="/rmt/dashboard/journal" exact render={()=>user?.result?.userType === 'rmt' ? (<Journal user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    <Route path="/rmt/dashboard/dailylog" exact render={()=>user?.result?.userType === 'rmt' ? (<DailyLog user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    {/* <Route path="/rmt/dashboard/patient/:clientid/treatmentplan/:tpid/treatment/:tid" exact render={()=>user?.result?.userType === 'rmt' ? (<Treatment user={user} />) : (<Redirect to="/rmt/dashboard" />)} /> */}
                    {/* References */}
                    <Route path="/references/healthhistoryform" exact component={HealthHistoryForm} />
                    <Route path="/references/appointmentconfirmation" exact component={AppointmentConfirmation} />
                    {/* Password Reset */}
                    <Route path="/auth/resetpassword" exact component={PasswordReset} />
                    <Route path="/passwordreset/:email/:token" exact component={NewPassword} />
                    {/* New financial stuff */}
                    <Route path="/rmt/dashboard/financialstatements" exact render={()=>user?.result?.userType === 'rmt' ? (<Finances user={user} />) : (<Redirect to="/rmt/dashboard" />)} />
                    {/* Login and register */}
                    <Route path="/login" exact render={()=>!user ? (<Login />) : (<Redirect to="/dashboard" />)} />
                    <Route path="/register" exact render={()=>!user ? (<Register />) : (<Redirect to="/dashboard" />)} />
                </Switch>
            </BrowserRouter>
        </div>       
    )
}

export default App
