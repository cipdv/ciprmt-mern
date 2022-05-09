import express from 'express'
import TreatmentPlan from '../models/treatmentPlan.js'
import Treatment from '../models/treatment.js'
import User from '../models/user.js'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { google } from 'googleapis'

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//for google calendar api
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events']
// const GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTzZRMGkA7GX7L\nH8jX7CeD9ekMipSXHvkMY5jY9bubIjcsyTGNEk2jhqEFZMlGbKiZJ1pK+LVvqqCU\nu1qubSbBbSc8PZ7g4hBDFzhTMLX+FwQx0HxEaPP8DC3hK9mhO7sEOoPDaMEnVVuM\nSkdmQHoDhzwXAFOtcuBz6FLdJpdRn5fzXYMt/zhP30NM3H7vjyi0hresX3nbJPMa\nQOoUm59Mf3g9oPZMzzPI3KpbV61AKxu82mlVAXG/WVfQm0UiiRohRRN+k5J5hCag\nvWbZ55jR8nKSq7Dbm1Vx7n0GOewR1hWEh2yUQbsB6cHIb08Bth/Aoa77LRdkP/7W\nmclhDxFjAgMBAAECggEAPjq7KoOO8ZMdcFZUkJysUoIR+ibKwwnWX+H7M7XapEl2\no5OeGkBPkf8YApZZrB4JqloISTKH6ZkUfSqY1oG8ZIoZj+J95z8nC6hWHaiPp4h3\nSqX1/DOYLlHOa1S0D49/gRtF6NtNH8tvfRS1FRcmiB/DLAgGMyv/1q1FXjlmUoXU\nK0BuptyHxAFcQ/uI3WmWS+GgN5GMuV9m4DYD1AFsm2xFeQqYuEMGl5MrABKc7WYR\nXFmSSczrhdxqMNvgPJMbcg+16GREUzibPEv/UJpyfLzcx0njG/FJyfIZ3KdJuZ/p\nTzgQG07Y+QrHp9h+svsdkKAOnEjtbns5vVRhlyMraQKBgQDPLz2hDLN3/Z12rUMk\nV9XgPrBio4122Rjlm16A4x4+/Oan35uUR90OY85brFyz9VnlWN+7dJkr5RMT50UD\n7nBMAmYz9vwoVhU8L7oLa2NP7i2nQB/PKmskImN+ftc8XBz0BEZiCW4kkNpzUXFA\nTHaMU3ALz9MphcWwLz7G4XR7DQKBgQC2oJ9Xao0R4HI1OftpVeAozOZo1y/OhlF8\nHhAtcdQPvqI9tiY/LGzHv8tOwWjUyypKQBDY1pbtcCNTLhftFmoPJ+MYRW4yQ3OI\nJ3ws17zNwREboQLa96YYqFwKoRe4CsQdxSf9Aw6N4Rvq79xwcb7S71X+m3oNHzPJ\nB+q2iXfiLwKBgC7RxCGS1zO0clMRUGz0FHb6c622vA8xfDjW5YJG0Nz3FcC1/ViC\n7OeFkmqRBtn8BfaYIOchsEOFHsyOpMAAsAvdNu9jTxRmb6IMPwS5ndXAQzzadtXA\nBjpCMy2wyD7xqfFSzfz1mJhWy6bnrqoTHW8Uo+tnaZamjkgERTF4XXQ5AoGBAKiN\nWkLN3mEva3jgiL9ROM+vPMBqSn8rzKzm+jtXIUdexFJ8eJQ5pjQ9OaD4NI6g6+kX\nc/UNKML/ijrNAdwZoc1XHOtbuTa+tjRlbN/eRS0JEYcUdZQumKeNS1WsFD4SAasQ\nObX0Skx8BM4yjptg/6OirRWN3Xma4Kqbme7atUCVAoGAMgeTU77c+VqHWSbLSCV5\nNRK2sfU3xoInwqwB8rBLLfqH362RA+mM8JL1ZVXpkIDE/wZzumtSzkzBRO6m+nzE\nAN68iQQZ6gcbs8pqg14BF6OGnoRkXrFOBy4QEqBW77SZ00ZvzsLLzbzehvS6glq5\nJVQgi9tWxvMz72PbYDlJNCM=\n-----END PRIVATE KEY-----\n'
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

const router = express.Router()

export const createNewTreatmentPlan = async (req, res) => {
    const data = req.body
    const newTreatmentPlan = new TreatmentPlan({...data, clientId: req.params.userid})
    try {
        const result = await newTreatmentPlan.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getTreatmentPlans = async (req, res) => {
    const {userid} = req.params
    try {
        const result = await TreatmentPlan.find({clientId: userid})
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTreatmentPlanById = async (req, res) => {
    const {tpid} = req.params
    try {
        const result = await TreatmentPlan.findById(tpid)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

// export const addTreatment = async (req, res) => {

//     const newTreatment = new Treatment({...data, clientId: req.params.userid})
// }

export const getTreatmentById = async (req, res) => {
    const {tid} = req.params
    try {
        const treatment = await Treatment.findById({_id: tid})
        res.status(200).json(treatment)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateTreatmentPlan = async (req, res) => {

    const { tpid } = req.params
    const { conclusionOfTreatmentPlan } = req.body
    let endDate = ''

    if (conclusionOfTreatmentPlan !== '') {
        endDate = new Date()
    } else {
        endDate = ''
    }

    try {
        const updatedTreatmentPlan = await TreatmentPlan.findByIdAndUpdate(tpid, {...req.body, endDate}, {new: true})
        res.status(200).json(updatedTreatmentPlan)
    } catch (error) {
        console.log(error.message)
    }
}

export const getTreatmentsByClientId = async (req, res) => {
    const { clientId: id } = req.params
    try {
        const results = await Treatment.find({clientId: id})
        res.status(200).json(results)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
} 

export const getTreatmentsByTreatmentPlanId = async (req, res) => {
    try {
        const results = await Treatment.find({treatmentPlanId: req.params.tpid})
        res.status(200).json(results)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addTreatment = async (req, res) => {
    const newTreatment = new Treatment(req.body)
    try {
        const result = await newTreatment.save()

        const {dateAndTime, duration, firstName, lastName} = req.body

        let endDateTime = ''
        if (duration === '60') {
            let newDate = new Date(dateAndTime)
            newDate.setHours(newDate.getHours() + 1)
            endDateTime = newDate.toISOString()
        } else if (duration === '75') {
            let newDate = new Date(dateAndTime)
            newDate.setMinutes(newDate.getMinutes() + 75)
            endDateTime = newDate.toISOString()
        } else if (duration === '90') {
            let newDate = new Date(dateAndTime)
            newDate.setMinutes(newDate.getMinutes() + 90)
            endDateTime = newDate.toISOString()
        }

        const event = {
            'summary': `${firstName} ${lastName}`,
            'start': {
                'dateTime': `${dateAndTime}`,
                'timeZone': 'Canada/Eastern'
            },
            'end': {
                'dateTime': `${endDateTime}`,
                'timeZone': 'Canada/Eastern'
            },
            'colorId': '2'
        }

        const jwtClient = new google.auth.JWT(
            GOOGLE_CLIENT_EMAIL,
            null,
            GOOGLE_PRIVATE_KEY,
            SCOPES
        )

        const calendar = google.calendar({
            version: 'v3',
            project: GOOGLE_PROJECT_NUMBER,
            auth: jwtClient
        })

        calendar.events.insert({
            calendarId: GOOGLE_CALENDAR_ID,
            resource: event
        }, {
            function (err, event) {
                if (err) {
                    console.log('this is an error', err)
                    return
                }
                console.log('Event created:', event.htmlLink);
            }
        })
    

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const sendConfirmEmail = async (req, res) => {

    const user = await User.findById(req.params.clientid)

    try {
        const msg = {
            to: `${user.email}`, // Change to your recipient
            from: 'cipdevries@ciprmt.com', // Change to your verified sender
            subject: `Please confirm your appointment with Cip de Vries, RMT`,
            text: `Please login to your account at www.ciprmt.com to confirm your appointment`,
            html: `
            <h4>Hi ${user?.firstName},</h4>
            <p>
                Please login to your account at <a href="https://www.ciprmt.com/auth">www.ciprmt.com</a> to confirm your massage therapy appointment on ${req.body.date} at ${req.body.time}.
            </p>
            <p>
                Trouble logging in? Please text Cip de Vries at 416-258-1230.
            </p>
            <p>Thanks for checking out my new website! I've worked really hard to create this over the past year, and I'm continuing to learn more about coding to add new features including sending your receipts directly to your email.</p>
            <p>If you have any ideas how to improve the website, notice any performance issues, or have an idea for a cool feature, feel free to text me at 416-258-1230 or send me an email at cip.devries@gmail.com.</p>
            `
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                res.send('email sent')
            })
            .catch((error) => {
                console.error(error)
            }) 
    } catch (error) {
        console.log(console.error)
    }
}

export const updateTreatment = async (req, res) => {
    const { tid } = req.params

    console.log(req.body)

    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(tid, req.body, {new: true})
        res.status(200).json(updatedTreatment)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const clientConfirmedTreatment = async (req, res) => {

    const { name, apptDate, apptTime, reasonForMassage, glutesConsent, chestConsent, abdomenConsent, innerThighsConsent, areasToAvoid, covidvaccinated, covidnoosymptoms, covidnotisolating, notes } = req.body

    let glutes = ''
    let chest = ''
    let abdomen = ''
    let innerThighs = ''

    if (glutesConsent) {
        glutes = 'yes'
     } else {
        glutes = 'no'
     }
   
     if (chestConsent) {
        chest = 'yes'
    } else {
        chest = 'no'
    }
   
    if (abdomenConsent) {
        abdomen = 'yes'
   } else {
        abdomen = 'no'
   }
   
   if (innerThighsConsent) {
        innerThighs = 'yes'
   } else {
        innerThighs = 'no'
   }

    const msg = {
        to: `cipdevries@ciprmt.com`,
        from: 'cipdevries@ciprmt.com', // Change to your verified sender
        subject: `Confirmed: ${name} on ${apptDate} at ${apptTime} `,
        text: `${name} has confirmed their appointment on ${apptDate} at ${apptTime}`,
        html: `
          <p>${name} has confirmed an appointment on ${apptDate} at ${apptTime}</p>
          <p>Reason for booking a massage is: ${reasonForMassage}</p> 
          <p>Consents given:</p>
          <ul>
            <li>Glutes: ${glutes}</li>
            <li>Chest: ${chest}</li>
            <li>Abdomen: ${abdomen}</li>
            <li>Inner Thighs: ${innerThighs}</li>
          </ul>
          <p>Areas to avoid: ${areasToAvoid}</p>
          <p>Notes provided: ${notes}</p>
          <p>Covid Screening</p>
          <ul>
            <li>Vaccinated: ${covidvaccinated}</li>
            <li>No symptoms: ${covidnoosymptoms}</li>
            <li>Not isolating: ${covidnotisolating}</li>
          </ul>
        `,
      }

    try {
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                res.send('email sent')
        })
            .catch((error) => {
            console.error(error)
        }) 
    } catch (error) {
        console.log(error.message)
    }
}

export const sendReceipt = async (req, res) => {
    const {firstName, email} = req.body
    try {
        const msg = {
            to: `${email}`, // Change to your recipient
            from: 'cipdevries@ciprmt.com', // Change to your verified sender
            subject: `Your Massage Therapy Treatment Receipt is Ready to Download`,
            text: `Please login to your account at www.ciprmt.com to download your receipt.`,
            html: `
            <h4>Hi ${firstName},</h4>
            <p>
                Your receipt is ready to download. Login at <a href="https://www.ciprmt.com/auth">www.ciprmt.com</a> to view and download receipts.
            </p>
            <p>
                Trouble logging in? Please text Cip de Vries at 416-258-1230.
            </p>
            <p>Thanks for checking out my new website! I've worked really hard to create this over the past year, and I'm continuing to learn more about coding to add new features including sending your receipts directly to your email.</p>
            <p>If you have any ideas how to improve the website, notice any performance issues, or have an idea for a cool feature, feel free to text me at 416-258-1230 or send me an email at cip.devries@gmail.com.</p>
            `
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                res.send('email sent')
            })
            .catch((error) => {
                console.error(error)
            }) 
    } catch (error) {
        console.log(console.error)
    }
}

export const getAllTreatments = async (req, res) => {
    try {
        const result = await Treatment.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}