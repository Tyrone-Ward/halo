import { Model, DataTypes, Optional, Sequelize } from 'sequelize'

export interface DeviceAttributes {
    id: number
    deviceId: string // Unique identifier sent by the device
    name: string
    type: string // e.g. "light", "motion_sensor", "thermostat"
    attributes: object // JSON: { brightness: 80, motion: "active", temperature: 22 }
    online: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface DeviceCreationAttributes extends Optional<DeviceAttributes, 'id' | 'attributes' | 'online'> {}

export class Device extends Model<DeviceAttributes, DeviceCreationAttributes> implements DeviceAttributes {
    public id!: number
    public deviceId!: string
    public name!: string
    public type!: string
    public attributes!: object
    public online!: boolean

    // timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

export function initDeviceModel(sequelize: Sequelize): typeof Device {
    Device.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            deviceId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            attributes: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: {}
            },
            online: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'Device',
            tableName: 'Devices',
            timestamps: true
        }
    )

    return Device
}
