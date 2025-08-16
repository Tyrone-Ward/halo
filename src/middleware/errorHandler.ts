import logger from '@utils/logger'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@utils/AppError'

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: 'ValidationError'
        })
        return
    }

    if (error instanceof AppError) {
        logger.error(error.message)
        res.status(error.statusCode).json({
            code: error.statusCode,
            status: error.errorCode,
            description: error.message
        })
        return
    }

    res.status(500).send('Something went wrong')
    return
}
