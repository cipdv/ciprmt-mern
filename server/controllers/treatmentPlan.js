import express from 'express'
import TreatmentPlan from '../models/treatmentPlan.js'

const router = express.Router()

export const createNewTreatmentPlan = async (req, res) => {
    const data = req.body
    const newTreatmentPlan = new TreatmentPlan({...data, startDate: new Date().toISOString(), clientId: req.params.userid})
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

export const addTreatmentToTP = async (req, res) => {
    const {tpId} = req.body
    
        TreatmentPlan.findById(tpId, function(err, result) {
            if (!err) {
                if (!result) {
                    res.status(404).send('no tp found').end()
                } else {
                    result.treatments.unshift(req.body)
                    result.markModified('treatmentPlan')
                    result.save(function(saveerr, saveresult) {
                        if (!saveerr) {
                            res.status(200).json(saveresult)
                        } else {
                            res.status(400).json(saveerr.message)
                        }
                    })
                }
            } else {
                res.status(400).send(err.message)
            }    
        })
}

export const getTreatmentById = async (req, res) => {
    const {id: _id} = req.params
    try {
        const treatment = await TreatmentPlan.findOne({'treatments._id': `${_id}`})
        res.status(200).json(treatment)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}