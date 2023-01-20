import crypto from 'crypto'
import Poll from '../models/poll'
import { type RequestHandler, Router } from 'express'

export const createPoll: RequestHandler = async (req, res) => {
    const newTokenCodePair = async () => {
        let code
        let token
        do {
            const tokenRaw = crypto.randomBytes(48)
            token = tokenRaw.toString('hex')
            code = crypto
                .createHash('sha256')
                .update(tokenRaw)
                .digest('hex')
                .slice(0, 6)
        } while (await Poll.findOne({ code }))
        return { token, code }
    }

    const { token, code } = await newTokenCodePair()

    const poll = new Poll({
        question: req.body.question,
        closed: false,
        public: false,
        token,
        code,
        options: req.body.options.map((content: string) => ({
            votesCount: 0,
            content,
        })),
    })

    await poll.save()

    res.json({
        token: poll.token,
        code: poll.code,
    })
}

export const getPoll: RequestHandler = async (req, res) => {
    const poll = await Poll.findOne({
        code: req.query.code,
    })

    if (poll) {
        const votesCount = poll.options.reduce(
            (acc, opt) => acc + opt.votesCount,
            0
        )

        const options = poll.options
            .map((opt) =>
                poll.public || poll.token === req.query.token
                    ? {
                          content: opt.content,
                          votesCount: opt.votesCount,
                          votesDate: opt.votesDate,
                          votesPercentage: votesCount
                              ? (opt.votesCount / votesCount * 100).toFixed(2) + '%'
                              : '0%',
                      }
                    : {
                          content: opt.content,
                      }
            )

        res.json({
            question: poll.question,
            code: poll.code,
            closed: poll.closed,
            public: poll.public,
            votesCount,
            options,
        })
    } else {
        res.status(400).end()
    }
}

export const publishPoll: RequestHandler = async (req, res) => {
    const poll = await Poll.findOne({
        code: req.query.code,
        token: req.query.token,
        public: false,
    })

    if (poll) {
        poll.public = true
        await poll.save()
        res.status(200).end()
    } else {
        res.status(400).end()
    }
}

export const closePoll: RequestHandler = async (req, res) => {
    const poll = await Poll.findOne({
        code: req.query.code,
        token: req.query.token,
        closed: false,
    })

    if (poll) {
        poll.closed = true
        await poll.save()
        res.status(200).end()
    } else {
        res.status(400).end()
    }
}

export default Router()
    .post('/create', createPoll)
    .get('/get', getPoll)
    .patch('/publish', publishPoll)
    .patch('/close', closePoll)
