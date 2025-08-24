import { sequelize } from '@config/database.config'
import { initAutomationModel, Automation } from './automation.model'
import { initDeviceModel } from './device.models'
import logger from '@utils/logger'
import { getEnabledAutomations } from '@services/automationEngine'

initAutomationModel(sequelize)
initDeviceModel(sequelize)

export const initDatabase = async () => {
    try {
        await sequelize.sync()
        logger.info('[DB] All models were synchronized successfully.')
        // await Automation.create({
        //     name: 'Nighttime Motion',
        //     trigger: { device: 'motion_sensor_1', state: 'active' },
        //     condition: { time_after: '21:00' },
        //     action: [
        //         { device: 'light_living_room', brightness: 50 },
        //         { notify: 'phone', message: 'Motion detected after 9pm' }
        //     ],
        //     enabled: true
        // })

        // // Fetch enabled automations
        // const automations = await getEnabledAutomations()
        // console.log('Enabled automations:', automations)
    } catch (error) {
        logger.error(error)
    }
}
