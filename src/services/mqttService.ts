import logger from '@utils/logger'
import mqtt, { MqttClient } from 'mqtt'

const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost:1883'

let client: MqttClient

export function getMqttClient(): MqttClient {
    if (!client) {
        throw new Error('MQTT client not initialized yet. Call connectMqtt() first.')
    }
    return client
}

export async function connectMqtt(): Promise<MqttClient> {
    return new Promise((resolve, reject) => {
        client = mqtt.connect(MQTT_URL, {
            clientId: 'HALO',
            will: {
                topic: 'home/HALO/status', // Topic for the will message
                payload: JSON.stringify({ status: 'offline' }), // Payload to be published
                qos: 0, // Quality of Service level
                retain: true // Retain the message on the broker
            }
        })

        client.on('connect', () => {
            logger.info(`[MQTT] Connected to broker at ${MQTT_URL}`)
            resolve(client)
        })

        client.on('error', (err) => {
            logger.error(`[MQTT] Connection error: ${err}`)
            reject(err)
        })
    })
}
