import express from 'express'

//controllers
import { addTransaction, createNewFinancialStatement, getFinancialData, addFinancials } from '../controllers/financials.js'

//middleware
import auth from '../middleware/auth.js'

const router = express.Router()

//USER ----------------

//CREATE the HH 
router.put('/:id', auth, addTransaction)
//add a new year
router.post('/addnewstatement', auth, createNewFinancialStatement)
//retrieve financial data per year
router.post('/getfinancialdata', auth, getFinancialData)
router.patch('/addfinancials', auth, addFinancials)

export default router