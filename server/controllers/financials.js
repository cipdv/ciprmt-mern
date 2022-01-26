import express from "express"
import mongoose from "mongoose"

//models
import FinancialStatement from '../models/financials.js'

const router = express.Router()

export const createNewFinancialStatement = async (req, res) => {
    const { rmtid } = req.params
    const { year } = req.body
    const newFinancialStatement = new FinancialStatement({year: year, RMTid: rmtid})
    try {
        const result = await newFinancialStatement.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addTransaction = async (req, res) => {

    const income = req.body.income[0]
    const expenses = req.body.expenses[0]
    const thisreceiptNumber = req.body.income[0].receiptNumber
    const year = req.body.year
    
    try {
        const financialStatement = await FinancialStatement.findOne({year: 2022})
        
        const alreadyAddded = financialStatement.income.find(({ receiptNumber }) => receiptNumber === thisreceiptNumber )
    
        if (alreadyAddded === undefined) {
            financialStatement?.income?.push(income)
            financialStatement?.expenses?.push(expenses)

            const updatedFinancialStatement = await FinancialStatement.findOneAndUpdate({year: 2022}, financialStatement, {new: true})
            res.status(200).json(updatedFinancialStatement)
        } else {
            res.status(200).json(financialStatement)
        }     
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getFinancialData = async (req, res) => {
    try {
        const financialData = await FinancialStatement.find({year: req.body.year})
        res.status(200).json(financialData)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const addFinancials = async (req, res) => {
    const {type} = req.body
    console.log(req.body)
    if (type === 'Expense') {
        const financialData = await FinancialStatement.findOne({year: 2022})
        financialData?.expenses?.push(req.body)
        const updatedFinancialStatement = await FinancialStatement.findOneAndUpdate({year: 2022}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'Income') {
        const financialData = await FinancialStatement.findOne({year: 2022})
        financialData?.income?.push(req.body)
        const updatedFinancialStatement = await FinancialStatement.findOneAndUpdate({year: 2022}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'RRSP Contribution') {
        const financialData = await FinancialStatement.findOne({year: 2022})
        financialData?.RRSPContributions?.push(req.body)
        const updatedFinancialStatement = await FinancialStatement.findOneAndUpdate({year: 2022}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'Donation') {
        const financialData = await FinancialStatement.findOne({year: 2022})
        financialData?.donations?.push(req.body)
        const updatedFinancialStatement = await FinancialStatement.findOneAndUpdate({year: 2022}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    }
}

export const getFinancialStatementsByRMTId = async (req, res) => {
    const {rmtid} = req.params
    try {
        const result = await FinancialStatement.find({RMTid: rmtid})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}