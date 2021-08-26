
class APIError{
    constructor(statusCode, message){
        this.statusCode = statusCode,
        this.message = message
    }

    static badRequest(message){
        return new APIError(400, message);
    }

    static notFound(message){
        return new APIError(404, message);
    }

    static internalError(message){
        return new APIError(500, message);
    }
}


module.exports = {
    APIError
}
