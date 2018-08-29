import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import { addData } from './control/data'

/**
 * Application entry point. Initializes the server and logger.
 */
const start = () => {
    const app = express()
    app.use(morgan('dev'))
    app.use(bodyParser.json())
    app.put('/data', (req, res) => {
        addData().then(() => res.send('ok'))
    })
    app.listen(3666)
}

start()