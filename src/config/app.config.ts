import express from 'express'
import cors from 'cors'
import morganMiddleware from '@middleware/httpLpgger'
import { errorHandler } from '@middleware/errorHandler'
import appRouter from '@routes/app.routes'
import { notFound } from '@middleware/notFound'
import { version } from '../../package.json'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(morganMiddleware)

// Routes
app.use('/', appRouter)

// Global error handlers
app.use(notFound)
app.use(errorHandler)
