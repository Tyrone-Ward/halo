import { Request, Response, NextFunction } from 'express'
import { AppError } from '@utils/AppError'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError('Not found', 'Resource not found', 404)
    next(err)
}
