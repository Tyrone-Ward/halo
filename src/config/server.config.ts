import 'dotenv/config'
import { createServer } from 'node:http'
import { app } from '@config/app.config'
import mqtt from 'mqtt'
import logger from '@utils/logger'
import { networkInterfaces } from 'node:os'

type ServerHostname = string
type ServerPort = number

const getLocalIpAddress = () => {
    const interfaces = networkInterfaces()

    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName]

        for (const ipInfo of networkInterface ?? []) {
            // Filter for IPv4 and skip loopback/internal addresses
            if (ipInfo.family === 'IPv4' && !ipInfo.internal) {
                return ipInfo.address
            }
        }
    }

    return '127.0.0.1' // Fallback if no network interface is found
}

const expressServer = createServer(app)

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const TEST = process.env.NODE_ENV === 'test'

const SERVER_HOSTNAME: ServerHostname = process.env.SERVER_HOSTNAME || getLocalIpAddress()
const SERVER_PORT: ServerPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000

export { SERVER_HOSTNAME, SERVER_PORT, expressServer }
