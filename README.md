<p align="center">
    <img height="370px" src="./logo.png" />
</p>

<h1 align="center">HALO</h1>

## Intro

A modular **Node.js home automation core** that uses **MQTT** for device communication, an **Event Bus** for real-time events, and **SQLite (via
Sequelize)** for persistence.  
Supports **multi-process plugins**, a **device registry**, and a **rule-based automation engine** with an API for web-based automation management.

---

## 🚀 Features

- **MQTT integration**: Devices register and publish state over MQTT topics.
- **Device registry**: Stores device metadata, capabilities, and status in SQLite.
- **Event Bus**: Real-time event system (`EventEmitter`) used internally to broadcast device and automation events.
- **Automation engine**: Rules are stored in the database and executed dynamically.
- **Plugin system**: Extensions can run as separate processes managed by the core.
- **REST API**: Manage devices and automations via HTTP endpoints (for a future web UI).

## 📡 MQTT Topics

### Device Registration

- **Topic:** `device/online`
- **Payload (JSON):**

```json
{
    "id": "presence_living_room",
    "name": "Living Room Presence",
    "type": "presence_sensor",
    "capabilities": [{ "name": "presence", "values": ["active", "inactive"] }],
    "location": "living_room",
    "model": "PR-1",
    "sw_version": "1.0.0",
    "ip": "192.168.1.42"
}
```

### Device State

- **Topic:** `device/<device_id>/state`
- **Payload (JSON):**

```json
{
    "attribute": "presence",
    "value": "active",
    "timestamp": "2025-08-15T22:10:00Z"
}
```

## ⚡ Event Bus

The Event Bus is a central message hub (Node.js EventEmitter). Examples of events:

`device_registered` → Fired when a new device comes online.

`device_updated` → Fired when a device’s state changes.

`automation_triggered` → Fired when an automation rule executes.

Usage:

```js

```
