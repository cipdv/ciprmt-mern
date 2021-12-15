import express from 'express'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

import User from '../models/user.js'

const router = express.Router()
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
  const { findings, remex, treatmentPlan, price, paymentType, date, duration, time } = req.body
  const { generalTreatment, specificTreatment } = req.body.treatment
  const { subjectiveResults, objectiveResults } = req.body.results

  const user = await User.findById(userid)
  const appointment = user.appointments.id(appointmentid)
  const receiptNumber = appointmentid.toUpperCase()

  try {
    if (appointment?.paymentType === undefined && paymentType !== undefined && paymentType !== 'unpaid' 
    // && user?.emailReceiptOptIn === true
    ) {
      const msg = {
        to: `${user?.email}`, // Change to your recipient
        from: 'cip@cip.gay', // Change to your verified sender
        subject: `Cip de Vries, RMT Receipt for ${date}`,
        text: `Official Receipt`,
        html: `
          <h4>Cip de Vries, RMT</h4>
          <p>
            268 Shuter Street, Toronto ON, M5A 1W3
            <br>416-258-1230
          </p> 
          <p>
            Registration Number: U035
            <br>HST number: 845 918 200 RT0001
          </p>
          <h4>Official Receipt</h4>
          <p>
            Date of treatment: ${date}
            <br>Time of treatment: ${time}
            <br>Duration: ${duration} minutes
            <br>Payment amount: $${price}
            <br>Payment received from: ${user.firstName} ${user.lastName}
            <br>Receipt number: ${receiptNumber}
          </p>
        `,
      }

    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    }) 
    } else if (appointment?.paymentType === 'unpaid' && paymentType !== undefined && paymentType !== 'unpaid' ) {
      const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'cip@cip.gay', // Change to your verified sender
        subject: `Cip de Vries, RMT Receipt for ${date}`,
        text: `Official Receipt`,
        html: `
          <h4>Cip de Vries, RMT</h4>
          <p>
            268 Shuter Street, Toronto ON, M5A 1W3
            <br>416-258-1230
          </p> 
          <p>
            Registration Number: U035
            <br>HST number: 845 918 200 RT0001
          </p>
          <h4>Official Receipt</h4>
          <p>
            Date of treatment: ${date}
            <br>Time of treatment: ${time}
            <br>Duration: ${duration} minutes
            <br>Payment amount: $${price}
            <br>Payment received from: ${user?.firstName} ${user?.lastName}
            <br>Receipt number: ${appointmentid}
          </p>
        `,
      }

    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
    }
  } catch (error) {
    console.log(error.message)
  }

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

        //send email confirmation to patient
        const msg = {
          to: `${result.email}`, // Change to your recipient
          from: 'cip@cip.gay', // Change to your verified sender
          subject: `Please confirm your appointment with Cip de Vries, RMT`,
          text: `Please login to your account at www.ciprmt.com to confirm your appointment`,
          html: `
            <p>
              Please <a href="http://localhost:3000/auth">login to your account</a> to provide some details and to confirm your appointment on ${req.body.date} at ${req.body.time}.
            </p>
          `,
        }
  
      sgMail
      .send(msg)
      .then(() => {
          console.log('Email sent')
      })
      .catch((error) => {
          console.error(error)
      }) 

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
  const { reasonForMassage, name, apptDate, apptTime } = req.body
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

      const msg = {
        to: 'cip@cip.gay', // Change to your recipient
        from: 'cip@cip.gay', // Change to your verified sender
        subject: `Confirmed: ${name} on ${apptDate} at ${apptTime} `,
        text: `${name} has confirmed their appointment on ${apptDate} at ${apptTime}`,
        html: `
          <p>${name} has confirmed their appointment on ${apptDate} at ${apptTime}</p>
          <p>Their reason for massage is: ${reasonForMassage}</p> 
          <p>Consents given:</p>
          <ul>
            <li>Glutes: ${glutes}</li>
            <li>Chest: ${chest}</li>
            <li>Abdomen: ${abdomen}</li>
            <li>Inner Thighs: ${innerThighs}</li>
            <li><strong>Treatment: ${treatmentConsent}</strong></li>
          </ul>
          <p>Areas to avoid: ${areasToAvoid}</p>
        `,
      }

    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    }) 

    res.status(200).json(updatedAppointment)
  } catch (error) {
    console.log(error.message)
  }
}
  
export default router
