
import mongoose from "mongoose";

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error)

}

const errorHandler = (err, req, res, next) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check for mongoose bad ObjectID
    if(err.name === `CastError`){
        message = `Resourse not found`;
        statusCode = 404;
    }
    if(mongoose.Types.ObjectId)

    res.status(statusCode).json({
        message
    });


}

export {notFound, errorHandler};