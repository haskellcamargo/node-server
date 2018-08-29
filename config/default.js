module.exports = {
    port: 3666,
    mongo: {
        host: process.env.MONGO_HOST || '127.0.0.1',
        debug: false,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port: 27017,
        database: 'demo'
    }
}
