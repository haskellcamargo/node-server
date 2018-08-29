import Data from '../model/data'
import { reject, resolve } from 'bluebird'

export function DuplicateData() {
    this.message = 'duplicate sensor data'
}
DuplicateData.prototype = Object.create(Error.prototype)

export function SensorNotFound() {
    this.message = 'sensor not found'
}
SensorNotFound.prototype = Object.create(Error.prototype)

/**
 * Adds a sensor entry to the database
 *
 * @param {string} sensorId
 * @param {number} time
 * @param {number} value
 */
export const addData = (sensorId, time, value) => {
    const data = new Data({ sensorId, time, value })
    return data.save()
        .catch(error => error.message.startsWith('E11000')
            ? reject(new DuplicateData())
            : reject(error))
}

/**
 * Returns a data collection between a time interval
 *
 * @param {string} sensorId
 * @param {number} since
 * @param {number} until
 */
export const getData = (sensorId, since, until) => {
    return Data.find({
        sensorId,
        time: { $gte: since, $lt: until } }, { _id: 0 })
        .select('sensorId time value')
        .then(data => data.length === 0
            ? reject(new SensorNotFound())
            : resolve(data))
}
