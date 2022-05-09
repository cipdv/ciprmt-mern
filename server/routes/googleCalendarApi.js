import express from 'express'

const router = express.Router()

import { insertGoogleCalendarEvent } from '../controllers/googleCalendarApi.js'

router.post('/auth/calendar', insertGoogleCalendarEvent)

export default router 