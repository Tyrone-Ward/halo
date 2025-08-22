import { sequelize } from '@config/database.config'
import { initAutomationModel } from './automation.model'
import logger from '@utils/logger'

initAutomationModel(sequelize)

export const initDatabase = async () => {
    try {
        await sequelize.sync()
        logger.info('[DB] All models were synchronized successfully.')
    } catch (error) {
        logger.error(error)
    }
}
