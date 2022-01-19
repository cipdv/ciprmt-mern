import express from 'express'

import MaintenanceLog from '../models/maintenanceLog.js'

//maintenance log entry 
export const maintenanceLogEntry = async (req, res) => {
    const log = req.body
    const newLog = new MaintenanceLog({...log, dateAndTime: new Date().toISOString()})

    try {
        await newLog.save()
        res.status(200).json(newLog)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}