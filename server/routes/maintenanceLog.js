import express from 'express'

const router = express.Router()

import { maintenanceLogEntry } from '../controllers/maintenanceLog.js'
import auth from '../middleware/auth.js'

router.post('/', maintenanceLogEntry)

export default router