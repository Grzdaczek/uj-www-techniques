import { Schema, model } from 'mongoose'

export const pollOptionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    votesCount: {
        type: Number,
        required: true,
        default: 0,
    },
    votesDate: {
        type: Date,
    },
})

export const pollSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        index: true,
    },
    token: {
        type: String,
        required: true,
    },
    closed: {
        type: Boolean,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
    },
    options: {
        type: [pollOptionSchema],
        required: true,
    },
})

export default model('poll', pollSchema)
