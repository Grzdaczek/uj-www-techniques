import dotenv from "dotenv"
import { type ConnectOptions } from "mongoose"

dotenv.config()

export const MONGO_USERNAME = process.env.MONGO_USERNAME
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD
export const MONGO_DATABASE = process.env.MONGO_DATABASE
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/"

export const MONGO_CONNECT_OPTIONS: ConnectOptions  = {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    dbName: MONGO_DATABASE,
    // autoIndex: false,
}

export const SERVER_PORT = 80
