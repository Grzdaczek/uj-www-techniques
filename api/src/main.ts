import mongoose from 'mongoose'
import { createServer } from './server/server'
import { MONGO_URI, MONGO_CONNECT_OPTIONS } from './config/config'

console.log('connecting to database with config:', {
    MONGO_URI,
    MONGO_CONNECT_OPTIONS,
})

mongoose
    .connect(MONGO_URI, MONGO_CONNECT_OPTIONS)
    .then(() => {
        console.log('connected to database')
        createServer()
    })
    .catch((e) => {
        console.error('could not connect to database')
        throw e
    })
