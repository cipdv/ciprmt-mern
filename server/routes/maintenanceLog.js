import express from 'express'

const router = express.Router()

import { maintenanceLogEntry, getMaintenanceLog } from '../controllers/maintenanceLog.js'
import auth from '../middleware/auth.js'

router.post('/', maintenanceLogEntry)
router.get('/', getMaintenanceLog)

export default router