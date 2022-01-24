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
    console.log(tid)
    try {
        const treatment = await Treatment.findById({_id: tid})
        res.status(200).json(treatment)
        console.log(treatment)
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
        console.log(results)
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
            from: 'cip@cip.gay', // Change to your verified sender
            subject: `Please confirm your appointment with Cip de Vries, RMT`,
            text: `Please login to your account at www.ciprmt.com to confirm your appointment`,
            html: `
            <p>
                Please <a href="https://ciprmt.netlify.app/">login to your account</a> to provide some details and to confirm your appointment on ${req.body.date} at ${req.body.time}.
            </p>
            `
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
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
    console.log('req body', req.body)
    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(tid, req.body, {new: true})
        res.status(200).json(updatedTreatment)
    } catch (error) {
        
    }
}

