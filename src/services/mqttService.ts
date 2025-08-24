import mqtt from 'mqtt'
import logger from '../utils/logger'
import { Automation } from 'models/automation.model'

const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost:1883'
export const mqttClient = mqtt.connect(MQTT_URL, { manualConnect: true })

const automations = async () => {
    await Automation.findAll({ where: { enabled: true } })
}

mqttClient.on('connect', () => {
    logger.info(`[MQTT] Connected to broker at ${MQTT_URL}`)

    // Subscribe to base topics
    mqttClient.subscribe('devices/+/state', (err) => {
        if (err) logger.error('[MQTT] Failed to subscribe to device state topics')
    })

    mqttClient.subscribe('devices/register', (err) => {
        if (err) logger.error('[MQTT] Failed to subscribe to device registry topic')
    })

    // 🔥 Start the server *after* MQTT is ready
})

mqttClient.on('message', async (topic, message) => {
    const automations = await Automation.findAll({ where: { enabled: true } })

    // const receivedData = JSON.parse(message.toString())?.state
    // logger.info(`message state: ${receivedData}`)
    try {
        for (const automation of automations) {
            if (
                topic === `home/HALO/devices/${automation.dataValues.trigger.device}/state` &&
                JSON.parse(message.toString())?.state === automation.dataValues.trigger.value
            ) {
                logger.info(`${topic} automation triggered`)
                mqttClient.publish('cmnd/tasmota_0AA064/Power', 'TOGGLE')
            }
        }
    } catch (err) {
        logger.error(`[MQTT] Failed to parse message on ${topic}: ${err}`)
    }
})
