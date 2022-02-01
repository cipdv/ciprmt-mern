import express from 'express'

const router = express.Router()

import auth from '../middleware/auth.js'

import { getTreatmentPlans, createNewTreatmentPlan, addTreatment, getTreatmentPlanById, getTreatmentById, updateTreatmentPlan, getTreatmentsByClientId, getTreatmentsByTreatmentPlanId, updateTreatment, sendConfirmEmail, clientConfirmedTreatment, sendReceipt } from '../controllers/treatmentPlan.js'

router.post('/getallforthisuser/:userid', getTreatmentPlans)
router.post('/createnewforthisuser/:userid', createNewTreatmentPlan)
router.post('/:tpid/addTreatment/:clientid', addTreatment)
router.post('/getTreatmentPlanById/:tpid', getTreatmentPlanById)
router.post('/gettreatmentbyid/:tid', getTreatmentById)
router.put('/:tpid/treatment/:tid/update', updateTreatmentPlan)
router.post('/getTreatmentsByClientId/:clientId', getTreatmentsByClientId)
router.post('/:tpid/gettreatments', getTreatmentsByTreatmentPlanId)
router.post('/addtreatment', addTreatment)
router.put('/treatment/:tid/updatetreatment', updateTreatment)
router.post('/sendconfirmemail/:clientid', sendConfirmEmail)
router.post('/sendemailtormtforconfirmedappt', clientConfirmedTreatment)
router.post('/sendreceipt', sendReceipt)

export default router