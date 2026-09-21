const mqttConfig = {
    host: process.env.MQTT_HOST ?? 'localhost',
    port: Number(process.env.MQTT_PORT ?? 1883),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}

export default mqttConfig
