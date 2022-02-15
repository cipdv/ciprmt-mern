import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
import crypto from 'crypto'

import User from '../models/user.js'
import PasswordReset from '../models/passwordReset.js'

//configs
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//REGISTER a user
export const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, userType } = req.body
    const jwtSecret = process.env.jwtSecret
    try {
        //check if user exists
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(404).json({message: `user already exist`})
        }
        //check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: `passwords don't match` })
        }
        //if passwords match, hash data
        const hashPassword = await bcrypt.hash(password, 12)
        //create user model
        const result = await User.create({firstName, lastName, email, password: hashPassword, userType: 'patient'})
        //assign token
        const token = jwt.sign({email: result.email, id: result._id, userType: result.userType}, jwtSecret, {expiresIn: '1h'})
        //return user with token

        //send email to RMT to let them know a new user has registered
        const msg = {
            to: 'cipdevries@ciprmt.com', // Change to your recipient
            from: 'cipdevries@ciprmt.com', // Change to your verified sender
            subject: `A new patient has registered`,
            text: `${firstName} ${lastName} has registered as a new user.`,
            html: `
              <p>${firstName} ${lastName} has registered as a new user.</p>
              <p>Email: ${email}</p>
              <a href="https://www.ciprmt.com/rmt/auth">Login to see their profile</a>
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

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: `something went wrong`})
        console.log(error)
    }
}

//LOGIN a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const jwtSecret = process.env.jwtSecret

        try {
            const existingUser = await User.findOne({email}) 
            if (!existingUser) {
                return res.status(404).json({message: `user doesn't exist`})
            }

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({message: `invalid password`})
            }

            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, jwtSecret, {expiresIn: '1h'})

            res.status(200).json({ result: existingUser, token })

        } catch (error) {
            res.status(500).json({ message: `login failed` })
            console.log(error)
        }

    } catch (error) {
        res.status(500).json({ message: `something went wrong`})
    }
}

//sends the userType to verifiy if it's a RMT or patient
export const userTypeVerification = async (req, res) => {
    try {
        res.json(req.userType)
    } catch (error) {
      console.error(error.message)
    }
  }

//reset user password
export const sendPasswordResetLink = async (req, res) => {

    const {email} = req.body

    try {
        const user = await User.find({email: email})
        if (!user) {
            return res.status(404).json({message: `user doesn't exist`})
        } else {
            const passwordResetToken = crypto.randomBytes(20).toString('hex')
            await PasswordReset.create({email: email, token: passwordResetToken})

            const msg = {
                to: `${email}`, // Change to your recipient
                from: 'cipdevries@ciprmt.com', // Change to your verified sender
                subject: `Your password reset link for ciprmt.com`,
                text: `Copy and paste this link to reset your password: https://www.ciprmt.com/passwordreset/${passwordResetToken}`,
                html: `
                    <p><a href="https://www.ciprmt.com/passwordreset/${passwordResetToken}">Click here</a> to reset your password for www.ciprmt.com.</p>    
                    <p>If you did not request your password to be reset, please <a href="LINK TO SEND ME AN EMAIL TO LET ME KNOW THIS HAS HAPPENED">click here.</a></p>
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

            return res.status(200).json({message: 'email sent'})
        }
    } catch (error) {
        console.error(error.message)
    }
}

export const verifyResetToken = async (req, res) => {
    
}

export const resetPassword = async (req, res) => {

}