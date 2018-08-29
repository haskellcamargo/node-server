import mongoose from 'mongoose'
import Bluebird from 'bluebird'
import config from 'config'

import { index } from './model/data'

/**
 * Initializes the database connection with MongoDB.
 */
export function connect() {
    const { user, password, host, port, database, debug } = config.mongo
    const credentials = user ? `${user}:${password}@` : ''
    const url = `mongodb://${credentials}${host}:${port}/${database}`

    mongoose.Promise = Bluebird
    mongoose.set('debug', debug)
    return mongoose.connect(url, {
        useNewUrlParser: true,
        keepAlive: true,
        connectTimeoutMS: 30000 })
        .then(() => {
            mongoose.connection.collection('datas').createIndex(...index)
        })
}
