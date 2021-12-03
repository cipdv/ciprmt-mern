import express from 'express'

//controllers
import { createHealthHistory, getAllUsers, getHH, getUserBySearch } from '../controllers/healthHistory.js'

//middleware
import auth from '../middleware/auth.js'

const router = express.Router()

//USER ----------------

//CREATE the HH 
router.put('/', auth, createHealthHistory)

//ADMIN ---------------
//READ all HHs
router.get('/', getAllUsers)
//READ a single HH
router.post('/:id', getHH)
//SEARCH for a user
router.get('/search', getUserBySearch)
//DELETE the HH (admin only)
// router.delete('/:id', deleteHH)

export default router