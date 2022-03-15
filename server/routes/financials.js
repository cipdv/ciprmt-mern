import express from 'express'

//controllers
import { addTransaction, createNewFinancialStatement, getFinancialData, addFinancials, getFinancialStatementsByRMTId, addIncome, addExpense, getAllIncomes, getAllExpenses } from '../controllers/financials.js'

//middleware
import auth from '../middleware/auth.js'

const router = express.Router()

//USER ----------------

//CREATE the HH 
router.put('/:id', auth, addTransaction)
//add a new year
router.post('/addnewfinancialstatement/:rmtid', createNewFinancialStatement)
//retrieve financial data per year
router.post('/getfinancialdata', auth, getFinancialData)
router.post('/addfinancials', auth, addFinancials)
router.get('/getfinancialstatementsbyrmtid/:rmtid', getFinancialStatementsByRMTId)

//new financial routes
router.post('/:rmtid/addincome', addIncome)
router.post('/:rmtid/addexpense', addExpense)
router.post('/getincomes', getAllIncomes)
router.post('/getexpenses', getAllExpenses)
router.post('/addTransaction', addTransaction)

export default router