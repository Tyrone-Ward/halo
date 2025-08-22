import { Model, DataTypes, Optional, Sequelize } from 'sequelize'

export interface AutomationAttributes {
    id: number
    name: string
    description?: string
    trigger: object // JSON object (device, attribute, value)
    condition?: object // JSON object (time, device states, etc.)
    action: object // JSON object (device, attribute, value)
    enabled: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface AutomationCreationAttributes extends Optional<AutomationAttributes, 'id' | 'description' | 'condition' | 'enabled'> {}

export class Automation extends Model<AutomationAttributes, AutomationCreationAttributes> implements AutomationAttributes {
    public id!: number
    public name!: string
    public description?: string
    public trigger!: object
    public condition?: object
    public action!: object
    public enabled!: boolean

    // timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

export function initAutomationModel(sequelize: Sequelize): typeof Automation {
    Automation.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            trigger: {
                type: DataTypes.JSON,
                allowNull: false
            },
            condition: {
                type: DataTypes.JSON,
                allowNull: true
            },
            action: {
                type: DataTypes.JSON,
                allowNull: false
            },
            enabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            sequelize,
            modelName: 'Automation',
            tableName: 'Automations',
            timestamps: true
        }
    )

    return Automation
}
