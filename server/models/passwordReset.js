import mongoose from 'mongoose'

const passwordResetSchema = mongoose.Schema({
    createdAt: {type: Date, default: new Date(), expires: 3600},
    token: String,
    email: String
})

export default mongoose.model('PasswordReset', passwordResetSchema)