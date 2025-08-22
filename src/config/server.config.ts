import 'dotenv/config'
import { createServer } from 'node:http'
import { app } from '@config/app.config'
import mqtt from 'mqtt'
import logger from '@utils/logger'

type ServerHostname = string
type ServerPort = number

// const mqttClient = mqtt.connect('mqtt://192.168.1.188:1883')

// mqttClient.on('connect', () => {
//     logger.info('✅ Connected to MQTT broker')
// })

const expressServer = createServer(app)

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const TEST = process.env.NODE_ENV === 'test'

const SERVER_HOSTNAME: ServerHostname = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT: ServerPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000

export { SERVER_HOSTNAME, SERVER_PORT, expressServer }
