import mongoose from 'mongoose'

const treatmentPlanSchema = mongoose.Schema({
    id: String,
    clientId: String,
    startDate: Date,
    clientGoals: String,
    objectivesOfTreatmentPlan: String,
    conclusionOfTreatmentPlan: String,
    endDate: Date,
})

export default mongoose.model('TreatmentPlan', treatmentPlanSchema)