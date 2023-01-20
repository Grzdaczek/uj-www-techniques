import { Schema, Types, model } from 'mongoose'

export const voteSchema = new Schema({
    poll: {
        type: Types.ObjectId,
        required: true,
        ref: 'Poll',
    },
    option: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    userAgent: {
        type: String,
    },
    ip: {
        type: String,
    },
})

export default model('vote', voteSchema)
