import axios from 'axios'

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

export const submitAppointmentForm = (formData) => API.post('/appointments', formData)
export const getAppointments = (userId) => API.get(`/appointments/${userId}`)
export const getAppointment = (userId) => API.post(`/appointments/${userId}`, userId)
export const updateAppointment = (userId, appointmentId, formData) => API.patch(`/appointments/${userId}/${appointmentId}`, formData)
export const addAppointment = (userId, formData) => API.post(`/appointments/${userId}/add`, formData)
export const confirmAppointment = (userId, appointmentId, formData) => API.patch(`/appointments/confirm/${userId}/${appointmentId}`, formData)

export const RMTRegister = (formData) => API.post('/rmt/register', formData)
export const RMTLogin = (formData) => API.post('/rmt/login', formData)

export const userTypeVerification = () => API.get('/user/usertype')

export const addTransaction = (RMTid, financialData) => API.put(`/financials/${RMTid}`, financialData)
export const getFinancialData = (year) => API.post('/financials/getfinancialdata', year)
export const addFinancials = (formData) => API.patch(`/financials/addFinancials`, formData)