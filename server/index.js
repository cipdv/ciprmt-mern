//dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//import routes
import HHRoutes from './routes/healthHistory.js'
import userRoutes from './routes/users.js'
import appointmentRoutes from './routes/appointments.js'
import RMTRoutes from './routes/rmt.js'
import financialRoutes from './routes/financials.js'

//configs
const app = express()
dotenv.config()
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

//routing
app.use('/healthhistory', HHRoutes)
app.use('/user', userRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/rmt', RMTRoutes )
app.use('/financials', financialRoutes)

app.get('/', (req, res)=>{
    res.send('Cip de Vries, RMT')
})

//connection
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}, you're doing great Cip, keep it up :)`)))
    .catch((error)=> console.log(error.message))

// mongoose.set('useFindAndModify', false)
