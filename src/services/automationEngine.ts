import { Automation } from 'models/automation.model'
import logger from '@utils/logger'

export async function getEnabledAutomations() {
    return Automation.findAll({ where: { enabled: true } })
}
