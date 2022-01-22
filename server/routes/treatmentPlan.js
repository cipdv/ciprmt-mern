import express from 'express'

const router = express.Router()

import auth from '../middleware/auth.js'

import { getTreatmentPlans, createNewTreatmentPlan, addTreatmentToTP, getTreatmentPlanById, getTreatmentById } from '../controllers/treatmentPlan.js'

router.post('/getallforthisuser/:userid', getTreatmentPlans)
router.post('/createnewforthisuser/:userid', createNewTreatmentPlan)
router.post('/addTreatment', addTreatmentToTP)
router.post('/getTreatmentPlanById/:tpid', getTreatmentPlanById)
router.post('/gettreatmentbyid/:id', getTreatmentById)

export default router