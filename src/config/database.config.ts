import { Sequelize } from 'sequelize'
import logger from '@utils/logger.js'

export const sequelize = new Sequelize({
    logging: (msg) => logger.info(msg),
    dialect: 'sqlite',
    storage: './database/database.db'
})
