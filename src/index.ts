import { expressServer, SERVER_PORT } from '@config/server.config'
import { connectMqtt, getMqttClient } from '@services/mqttService'
import { app } from '@config/app.config'
import logger from '@utils/logger.js'
import { sequelize } from '@config/database.config'
import { initDatabase } from 'models'

// Gracefully shutdown ?
let SHUTDOWN = false

process.on('SIGINT', async () => {
    if (!SHUTDOWN) {
        logger.info('Closing connections')
        await sequelize.close()
        const mqttClient = getMqttClient()
        mqttClient.end(false, {}, () => {
            logger.info('Client has been disconnected')
        })
        expressServer.close()
        SHUTDOWN = true

        setTimeout(() => {
            console.log('Exiting process.')
        }, 3_000)
    }
})

const startServer = async () => {
    try {
        await initDatabase() // Sync database
        const mqttClient = await connectMqtt() // Create MQTT connection
        mqttClient.subscribe('home/HALO/devices/+/state')
        mqttClient.subscribe('home/HALO/devices/register')
        mqttClient.publish('home/HALO/status', JSON.stringify({ status: 'online' }))

        expressServer.listen(SERVER_PORT, () => {
            logger.info(`Listening on http://localhost:${SERVER_PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
    }
}

startServer()
