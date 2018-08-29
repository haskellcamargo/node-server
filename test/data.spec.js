import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

import Data from '../src/model/data'
import server, { disconnect } from '../src'

describe('Data', () => {
    before(() => Data.deleteMany({}))

    describe('PUT /data', () => {
        it('requires [sensorId]', () => {
            return chai.request(server)
                .put('/data')
                .send({ time: 1, value: 1 })
                .then(result => {
                    expect(result).to.have.status(400)
                    expect(result.body.reason).to.be.equal('data validation failed: sensorId: Path `sensorId` is required.')
                })
        })

        it('requires [time]', () => {
            return chai.request(server)
                .put('/data')
                .send({ sensorId: '1', value: 1 })
                .then(result => {
                    expect(result).to.have.status(400)
                    expect(result.body.reason).to.be.equal('data validation failed: time: Path `time` is required.')
                })
        })

        it('should have unique index on sensorId + time', () => {
            return chai.request(server)
                .put('/data')
                .send({ sensorId: '1', time: 1, value: 1 })
                .then(result => {
                    expect(result).to.have.status(204)
                    return chai.request(server)
                        .put('/data')
                        .send({ sensorId: '1', time: 1, value: 1 })
                })
                .then((result) => {
                    expect(result).to.have.status(409)
                    expect(result.body.reason).to.be.equal('duplicate sensor data')
                    return chai.request(server)
                        .put('/data')
                        .send({ sensorId: '1', time: 10, value: 1 })
                })
                .then(result => {
                    expect(result).to.have.status(204)
                })
        })
    })

    describe('GET /data', () => {
        it('should return 404 on missing sensor', () => {
            return chai.request(server)
                .get('/data')
                .query({ sensorId: '2', since: 0, until: 0 })
                .then(result => {
                    expect(result).to.have.status(404)
                    expect(result.body.reason).to.be.equal('sensor not found')
                })
        })

        it('should return the list of sensors given respecting ranges', () => {
            return chai.request(server)
                .get('/data')
                .query({ sensorId: '1', since: 0, until: 3 })
                .then(result => {
                    expect(result).to.have.status(200)
                    expect(result.body).to.deep.equal([
                        { sensorId: '1', time: 1, value: 1 }
                    ])
                    return chai.request(server)
                        .get('/data')
                        .query({ sensorId: '1', since: 0, until: 20 })
                })
                .then(result => {
                    expect(result).to.have.status(200)
                    expect(result.body).to.deep.equal([
                        { sensorId: '1', time: 1, value: 1 },
                        { sensorId: '1', time: 10, value: 1 }
                    ])
                })
        })
    })

    after(() => disconnect())
})