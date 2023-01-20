import express, { RequestHandler } from 'express'
import http from 'http'
import pollControler from '../controlers/poll'
import voteControler from '../controlers/vote'
import { SERVER_PORT } from '../config/config'

export const createServer = () => {
    const logger: RequestHandler = (req, res, next) => {
        res.on('finish', () => {
            console.log(
                `${req.method} ${req.url} - [${res.statusCode}:${res.statusMessage}]`
            )
        })

        next()
    }

    const headers: RequestHandler = (_, res, next) => {
        res.setHeader('Cache-Control', 'no-store')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        )
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,content-type,Access-Control-Allow-Origin'
        )
        res.setHeader('Access-Control-Allow-Credentials', 'true')

        next()
    }

    const health: RequestHandler = (_, res) => res.status(200).end()

    const requestListener = express()
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(logger)
        .use(headers)
        .get('/health', health)
        .use('/poll', pollControler)
        .use('/vote', voteControler)

    http.createServer(requestListener).listen(SERVER_PORT, () =>
        console.log(`listening on port ${SERVER_PORT}`)
    )
}
