//dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'


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
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//routing
app.use('/healthhistory', HHRoutes)
app.use('/user', userRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/rmt', RMTRoutes )
app.use('/financials', financialRoutes)

app.get('/', (req, res)=>{
    res.send('Cip de Vries, RMT')
})

app.get('/sendgrid', (req, res)=> {

    const msg = {
        to: 'cip.devries@gmail.com', // Change to your recipient
        from: 'cip@cip.gay', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }

    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

    res.send('message sent')

})

//connection
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}, you're doing great Cip, keep it up :)`)))
    .catch((error)=> console.log(error.message))

// mongoose.set('useFindAndModify', false)
