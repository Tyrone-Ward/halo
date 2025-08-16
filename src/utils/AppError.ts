export class AppError extends Error {
    public readonly errorCode: string
    public readonly statusCode: number

    constructor(errorCode: string, message: string, statusCode: number) {
        super(message)
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}
