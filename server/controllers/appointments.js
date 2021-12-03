import express from 'express'

import User from '../models/user.js'

const router = express.Router()

export const createAppointment = async (req, res)=> {
    User.findById(req.userId, function(err, result) {
    if (!err) {
      if (!result){
        res.sendStatus(404).send('User was not found').end();
      }
      else{
        result.appointments.unshift(req.body);
        result.markModified('appointment'); 
        result.save(function(saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
}

export const getAppointments = async (req, res) => {
    
    try {
        const currentUser = await User.findById(req.params.userid)
        res.status(200).json(currentUser.appointments)
    } catch (error) {
        console.log(error)
    }
}

//get a single appointment
export const getAppointment = async (req, res) => {
  const {id: _id} = req.params
  try {
    const appointment = await User.findOne({'appointments._id': `${_id}`})
    res.status(200).json(appointment)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

//update appointment form
export const updateAppointment = async (req, res) => {
  const { userid, appointmentid } = req.params
  const { findings, remex, treatmentPlan, price, paymentType } = req.body
  const { generalTreatment, specificTreatment } = req.body.treatment
  const { subjectiveResults, objectiveResults } = req.body.results

  try {
    const updatedAppointment = await User.findByIdAndUpdate(userid,
      {$set:
        {
          "appointments.$[i].findings": findings,
          "appointments.$[i].treatment.generalTreatment": generalTreatment,
          "appointments.$[i].treatment.specificTreatment": specificTreatment,
          "appointments.$[i].results.subjectiveResults": subjectiveResults,
          "appointments.$[i].results.objectiveResults": objectiveResults,
          "appointments.$[i].remex": remex,
          "appointments.$[i].treatmentPlan": treatmentPlan,
          "appointments.$[i].price": price,
          "appointments.$[i].paymentType": paymentType,
        }
      },{
          new:true,
          arrayFilters: [{ 'i._id': appointmentid }],
        })
        res.status(200).json(updatedAppointment)
      } catch (error) {
        console.log(error.message)
      }
}

export const addAppointment = async (req, res) => {
  User.findById(req.params.id, function(err, result) {
    if (!err) {
      if (!result){
        res.sendStatus(404).send('User was not found').end();
      }
      else{
        result.appointments.unshift(req.body);
        result.markModified('appointment'); 
        result.save(function(saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
}

export const confirmAppointment = async (req, res) => {

  const { userid, appointmentid } = req.params
  const { reasonForMassage } = req.body
  const { treatmentConsent, glutes, chest, abdomen, innerThighs, areasToAvoid } = req.body.consents

  try {
    const updatedAppointment = await User.findByIdAndUpdate(userid, 
      {$set:
        {
          "appointments.$[i].reasonForMassage": reasonForMassage,
          "appointments.$[i].consents.glutes": glutes,
          "appointments.$[i].consents.chest": chest,
          "appointments.$[i].consents.abdomen": abdomen,
          "appointments.$[i].consents.innerThighs": innerThighs,
          "appointments.$[i].consents.areasToAvoid": areasToAvoid,
          "appointments.$[i].consents.treatmentConsent": treatmentConsent,
        }
      },{
        new:true,
        arrayFilters: [{ 'i._id': appointmentid }],
      })
    res.status(200).json(updatedAppointment)
  } catch (error) {
    console.log(error.message)
  }
}
  
export default router
