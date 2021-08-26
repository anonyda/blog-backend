const { APIError } = require("../models/errorModel");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if(err instanceof APIError){
        res.status(err.statusCode).json(err.message);
        return;
    }

    res.status(500).json({
        message: 'Something Went Wrong',
        err
    })
}

const successResponseHandler = ({res, statusCode, data}) => {
    res.status(statusCode).json(data)
}
module.exports = {
    errorHandler,
    successResponseHandler
};