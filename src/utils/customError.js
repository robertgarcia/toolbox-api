class CustomError extends Error {
    constructor(message, statusCode, data){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.cause = data;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
