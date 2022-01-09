import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

import User from '../models/user.js'

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
            to: 'cip.devries@gmail.com', // Change to your recipient
            from: 'cip@cip.gay', // Change to your verified sender
            subject: `A new patient has registered`,
            text: `${firstName} ${lastName} has registered as a new user.`,
            html: `
              <p>${firstName} ${lastName} has registered as a new user.</p>
              <p>Email: ${email}</p>
              <a href="http://localhost:3000/rmt/auth">Login to see their profile</a>
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
        console.log(result)
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
    try 
    {
        res.json(req.userType)
    } catch (error) {
      console.error(error.message)
    }
  }