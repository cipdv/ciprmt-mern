import express from "express"
import mongoose from "mongoose"

//models
import Financials from '../models/financials.js'

const router = express.Router()

export const createNewFinancialStatement = async (req, res) => {
    const newFinancialStatement = Financials.create({year: 2021})
    res.status(201).json(newFinancialStatement)
}

export const addTransaction = async (req, res) => {

    const income = req.body.income[0]
    const expenses = req.body.expenses[0]
    const thisreceiptNumber = req.body.income[0].receiptNumber

    try {
        const financialStatement = await Financials.findOne({year: 2021})
        
        const alreadyAddded = financialStatement.income.find(({ receiptNumber }) => receiptNumber === thisreceiptNumber )
    
        if (alreadyAddded === undefined) {
            financialStatement?.income?.push(income)
            financialStatement?.expenses?.push(expenses)

            const updatedFinancialStatement = await Financials.findOneAndUpdate({year: 2021}, financialStatement, {new: true})
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
        const financialData = await Financials.find({year: req.body.year})
        res.status(200).json(financialData)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const addFinancials = async (req, res) => {
    const {type} = req.body
    if (type === 'Expense') {
        const financialData = await Financials.findOne({year: 2021})
        financialData?.expenses?.push(req.body)
        const updatedFinancialStatement = await Financials.findOneAndUpdate({year: 2021}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'Income') {
        const financialData = await Financials.findOne({year: 2021})
        financialData?.income?.push(req.body)
        const updatedFinancialStatement = await Financials.findOneAndUpdate({year: 2021}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'RRSP Contribution') {
        const financialData = await Financials.findOne({year: 2021})
        financialData?.RRSPContributions?.push(req.body)
        const updatedFinancialStatement = await Financials.findOneAndUpdate({year: 2021}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    } else if (type === 'Donation') {
        const financialData = await Financials.findOne({year: 2021})
        financialData?.donations?.push(req.body)
        const updatedFinancialStatement = await Financials.findOneAndUpdate({year: 2021}, financialData, {new: true})
        res.status(200).json(updatedFinancialStatement)
    }
}