import mongoose, { Schema } from 'mongoose'

const DataSchema = new Schema({
    sensorId: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    value: Number
})

export const index = [
    { sensorId: 1, time: 1 }, { unique: true }
]

export default mongoose.model('data', DataSchema)
