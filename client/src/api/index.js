import axios from 'axios'
//PRODUCTION
const API = axios.create({ baseURL: 'https://cip-mern.herokuapp.com/'})
//DEVELOPMENT
// const API = axios.create({ baseURL: 'http://localhost:5000/'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const register = (formData) => API.post('/user/register', formData)
export const login = (formData) => API.post('/user/login', formData)

export const submitHH = (formData) => API.put('/healthhistory', formData)
export const getAllUsers = () => API.get('/healthhistory')
export const getUser = (userId) => API.post(`/healthhistory/${userId}`, userId)
export const searchUsers = (searchQuery) => API.get(`/healthhistory/search?searchQuery=${searchQuery}`)
export const updateUser = (userId, signature) => API.put(`/healthhistory/${userId}/update`, signature)

export const submitAppointmentForm = (formData) => API.post('/appointments', formData)
export const getAppointments = (userId) => API.get(`/appointments/${userId}`)
export const getAppointment = (userId) => API.post(`/appointments/${userId}`, userId)
export const updateAppointment = (userId, appointmentId, formData) => API.patch(`/appointments/${userId}/${appointmentId}`, formData)
export const addAppointment = (userId, formData) => API.post(`/appointments/${userId}/add`, formData)
export const confirmAppointment = (userId, reqBody) => API.patch(`/appointments/confirm/${userId}/${reqBody.otherData.apptId}`, reqBody)

export const RMTRegister = (formData) => API.post('/rmt/register', formData)
export const RMTLogin = (formData) => API.post('/rmt/login', formData)

export const userTypeVerification = () => API.get('/user/usertype')

//financial statements
export const addTransaction = (RMTid, financialData) => API.put(`/financials/${RMTid}`, financialData)
export const getFinancialStatementsByRMTId = (rmtid) => API.get(`/financials/getfinancialstatementsbyrmtid/${rmtid}`)
export const getFinancialData = (year) => API.post('/financials/getfinancialdata', year)
export const addToFinancials = (formData) => API.post(`/financials/addFinancials`, formData)
export const createNewFinancialStatement = (rmtid, year) => API.post(`/financials/addnewfinancialstatement/${rmtid}`, year)
//new financial routes
export const addIncome = (rmtid, financialData) => API.post(`/financials/${rmtid}/addincome`, financialData)
export const addExpense = (rmtid, financialData) => API.post(`/financials/${rmtid}/addexpense`, financialData)
export const getIncomes = (year) => API.post(`/financials/getincomes`, year)
export const getExpenses = (year) => API.post(`/financials/getexpenses`, year)

//electronic audit log
export const addToEAL = (data) => API.post(`/electronicauditlog`, data)

//treatment plans
export const createNewTreatmentPlan = (data, userId) => API.post(`/treatmentplan/createnewforthisuser/${userId}`, data)
export const getTreatmentPlans = (userId) => API.post(`/treatmentplan/getallforthisuser/${userId}`)
export const addTreatmentToTP = (formData) => API.post('/treatmentplan/addTreatment', formData)
export const getTreatmentPlanById = (tpid) => API.post(`/treatmentplan/gettreatmentplanbyid/${tpid}`)
export const getTreatmentById = (tid) => API.post(`/treatmentplan/gettreatmentbyid/${tid}`)
export const updateTreatmentPlan = (tpid, formData) => API.put(`/treatmentplan/${tpid}/update`, formData)
export const getTreatmentsByClientId = (clientid) => API.post(`/treatmentplan/getTreatmentsByClientId/${clientid}`)
export const getTreatmentsByTreatmentPlanId = (tpid) => API.post(`/treatmentplan/${tpid}/gettreatments`)
export const addTreatment = (form) => API.post('/treatmentplan/addtreatment', form)
export const updateTreatment = (tid, form) => API.put(`/treatmentplan/treatment/${tid}/updatetreatment`, form)
export const getAllTreatments = () => API.get('/treatmentplan/getalltreatments')

//new health history routes
export const getClientHealthHistory = (clientId) => API.post(`/healthhistory/gethealthhistorybyclientid/${clientId}`)
export const addNewHealthHistory = (form) => API.post('/healthhistory/addnewhealthhistory', form)

//non-redux calls
export const emailApptConfirmed = (data) => API.post('/treatmentplan/sendemailtormtforconfirmedappt', data)
export const emailSendReceipt = (data) => API.post('/treatmentplan/sendreceipt', data)
export const sendConfirmEmail = (clientid, data) => API.post(`/treatmentplan/sendconfirmemail/${clientid}`, data)
export const addToMaintenanceLog = (data) => API.post('/maintenancelog', data)
export const addJournalEntry = (data) => API.post('/journal/addentry', data)
//password reset
export const emailResetPassword = (data) => API.post('/user/sendpasswordresetlink', data)

//google oauth
export const googleOauth = () => API.get('/auth/google')
//google calendar
export const addToCalendar = (data) => API.post('/google/auth/calendar', data)

export const deleteTreatment = (tid, patientId) => API.delete(`treatmentplan/deletetreatment/${patientId}/${tid}`)

//maintenance logs 
export const getMaintenanceLogs = () => API.get('/maintenancelog')