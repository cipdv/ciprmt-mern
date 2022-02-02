import express from 'express'
import TreatmentPlan from '../models/treatmentPlan.js'
import Treatment from '../models/treatment.js'
import User from '../models/user.js'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

    const { tpid, tid } = req.params
    const { findings, remex, treatmentPlan, price, paymentType, referToHCP} = req.body
    const { generalTreatment, specificTreatment } = req.body.treatment
    const { subjectiveResults, objectiveResults } = req.body.results

    try {
        const updatedTreatment = await TreatmentPlan.findByIdAndUpdate(tpid,
          {$set:
            {
              "treatments.$[i].findings": findings,
              "treatments.$[i].treatment.generalTreatment": generalTreatment,
              "treatments.$[i].treatment.specificTreatment": specificTreatment,
              "treatments.$[i].results.subjectiveResults": subjectiveResults,
              "treatments.$[i].results.objectiveResults": objectiveResults,
              "treatments.$[i].remex": remex,
              "treatments.$[i].treatmentPlan": treatmentPlan,
              "treatments.$[i].price": price,
              "treatments.$[i].paymentType": paymentType,
              "treatments.$[i].referToHCP": referToHCP,
            //   "treatments.$[i].documentation.file1": file1,
            //   "treatments.$[i].documentation.file2": file2,
            //   "treatments.$[i].documentation.file3": file3,
            //   "treatments.$[i].documentation.file4": file4,
            //   "treatments.$[i].documentation.file5": file5,
            //   "treatments.$[i].documentation.file6": file6,
            }
          },{
              new:true,
              arrayFilters: [{ 'i._id': tid }],
            })
            
            res.status(200).json(updatedTreatment)
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
    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(tid, req.body, {new: true})
        res.status(200).json(updatedTreatment)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const clientConfirmedTreatment = async (req, res) => {

    const { name, apptDate, apptTime, reasonForMassage, glutes, chest, abdomen, innerThighs, areasToAvoid, covidvaccinated, covidnoosymptoms, covidnotisolating, notes } = req.body
    
    let gluteConsent = ''
    let chestConsent = ''
    let abdomenConsent = ''
    let innerThighsConsent = ''

    if (glutes !== '' && glutes !== undefined) {
        gluteConsent = 'yes'
     } else {
        gluteConsent = 'no'
     }
   
     if (chest !== '' && chest !==  undefined) {
        chestConsent = 'yes'
    } else {
        chestConsent = 'no'
    }
   
    if (abdomen !== '' && abdomen !== undefined) {
        abdomenConsent = 'yes'
   } else {
        abdomenConsent = 'no'
   }
   
   if (innerThighs !== '' && innerThighs !== undefined) {
        innerThighsConsent = 'yes'
   } else {
        innerThighsConsent = 'no'
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
            <li>Glutes: ${gluteConsent}</li>
            <li>Chest: ${chestConsent}</li>
            <li>Abdomen: ${abdomenConsent}</li>
            <li>Inner Thighs: ${innerThighsConsent}</li>
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