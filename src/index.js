import bodyParser from 'body-parser'
import config from 'config'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { addData, getData, DuplicateData, SensorNotFound } from './control/data'
import { connect } from './db'

const app = express()
app.use(bodyParser.json())

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'))
}

app.put('/data', (req, res) => {
    addData(req.body.sensorId, req.body.time, req.body.value)
        .then(() => res.status(204).json())
        .catch(DuplicateData, error => res.status(409)
            .json({ reason: error.message }))
        .catch(error => res.status(400).json({ reason: error.message }))
})

app.get('/data', (req, res) => {
    getData(req.query.sensorId, req.query.since, req.query.until)
        .then(res.json.bind(res))
        .catch(SensorNotFound, error => res.status(404)
            .json({ reason: error.message }))
})

connect()

const server = app.listen(config.port)

export const disconnect = mongoose.disconnect.bind(mongoose)

export default server
