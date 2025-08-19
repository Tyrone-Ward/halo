import { expressServer, SERVER_PORT, mqttClient } from '@config/server.config'
import { app } from '@config/app.config'
import logger from '@utils/logger.js'
import { sequelize } from '@config/database.config'
// import { initDatabase } from 'models'

// Gracefully shutdown ?
let SHUTDOWN = false

process.on('SIGINT', async () => {
    if (!SHUTDOWN) {
        logger.info('Closing connections')
        mqttClient.end()
        await sequelize.close()
        expressServer.close()
    }
})

const startServer = async () => {
    try {
        // await initDatabase()
        // Create MQTT connection
        expressServer.listen(SERVER_PORT, () => {
            logger.info(`Listening on http://localhost:${SERVER_PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
    }
}

startServer()
