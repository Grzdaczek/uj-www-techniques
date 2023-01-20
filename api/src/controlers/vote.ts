import { type RequestHandler, Router } from 'express'
import Poll from '../models/poll'
import Vote from '../models/vote'

export const submitVote: RequestHandler = async (req, res) => {
    const optionIndex = Number(req.query.option)
    const poll = await Poll.findOne({
        code: req.query.code,
        closed: false,
    })

    if (!poll || Number.isNaN(optionIndex)) return res.status(400).end()

    const option = poll.options[optionIndex]

    if (!option) return res.status(400).end()

    const now = new Date()
    const vote = new Vote({
        poll: poll,
        option: optionIndex,
        createdAt: now,
        ip: req.socket.remoteAddress,
        userAgent: req.get('User-Agent'),
    })

    option.votesCount += 1
    option.votesDate = now

    await vote.save()
    await poll.save()
    res.status(200).end()
}

export default Router().post('/submit', submitVote)
