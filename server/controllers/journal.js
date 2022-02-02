import express from 'express'
import Journal from '../models/journal.js'

const router = express.Router()

export const addJournalEntry = async (req, res) => {

    console.log(req.body)
    const entry = req.body
    const newEntry = new Journal({...entry, dateCreated: new Date().toISOString()})

    try {
        await newEntry.save()
        res.status(200).json(newEntry)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}