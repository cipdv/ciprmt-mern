import axios from 'axios'
//PRODUCTION
// const API = axios.create({ baseURL: 'https://cip-mern.herokuapp.com/'})
//DEVELOPMENT
const API = axios.create({ baseURL: 'http://localhost:5000'})


// API.interceptors.request.use((req)=>{
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//     }
//     return req
// })

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

export const addTransaction = (RMTid, financialData) => API.put(`/financials/${RMTid}`, financialData)
export const getFinancialData = (year) => API.post('/financials/getfinancialdata', year)
export const addFinancials = (formData) => API.patch(`/financials/addFinancials`, formData)

//electronic audit log
export const addToEAL = (data) => API.post(`/electronicauditlog`, data)

//treatment plans
export const createNewTreatmentPlan = (data, userId) => API.post(`/treatmentplan/createnewforthisuser/${userId}`, data)
export const getTreatmentPlans = (userId) => API.post(`/treatmentplan/getallforthisuser/${userId}`)
export const addTreatmentToTP = (formData) => API.post('/treatmentplan/addTreatment', formData)
export const getTreatmentPlanById = (tpid) => API.post(`/treatmentplan/gettreatmentplanbyid/${tpid}`)
export const getTreatmentById = (tid) => API.post(`/treatmentplan/gettreatmentbyid/${tid}`)