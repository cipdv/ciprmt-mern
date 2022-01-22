import mongoose from 'mongoose'

const treatmentSchema = mongoose.Schema({
    id: String,
    date: String,
    time: String,
    price: String,
    paymentType: String,
    duration: Number,
    receiptNumber: String,
    reasonForMassage: String,
    findings: String,
    treatment: {
        generalTreatment: String,
        specificTreatment: String
    },
    results: {
        subjectiveResults: String,
        objectiveResults: String,
    },
    remex: String,
    treatmentPlan: String,
    consents: {
        treatmentConsent: Boolean,
        glutes: String,
        chest: String,
        abdomen: String,
        innerThighs: String,
        areasToAvoid: String
    },
    notes: String,
    covid: {
        vaccinated: Boolean,
        noSymptoms: Boolean,
        notIsolating: Boolean
    },
    referToHCP: String,
    documentation: {
        file1: String,
        file2: String,
        file3: String,
        file4: String,
        file5: String, 
        file6: String
    }
})

const treatmentPlanSchema = mongoose.Schema({
    id: String,
    clientId: String,
    startDate: Date,
    clientGoals: String,
    objectivesOfTreatmentPlan: String,
    conclusionOfTreatmentPlan: String,
    endDate: Date,
    treatments: [treatmentSchema]
})

export default mongoose.model('TreatmentPlan', treatmentPlanSchema)