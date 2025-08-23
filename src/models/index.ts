import { sequelize } from '@config/database.config'
import { initAutomationModel } from './automation.model'
import { initDeviceModel } from './device.models'
import logger from '@utils/logger'

initAutomationModel(sequelize)
initDeviceModel(sequelize)

export const initDatabase = async () => {
    try {
        await sequelize.sync()
        logger.info('[DB] All models were synchronized successfully.')
    } catch (error) {
        logger.error(error)
    }
}
