const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrStack( err, stack ) {
    if ( config.dev ) {
        return { ...err,  stack };
    }
    return err;
};

function logErrs( err, req, res, next ) {
    console.log( err );
    next( err );
};

function wrapErrs( err, req, res, next ) {
    if ( !err.isBoom ) {
        next( boom.badImplementation( err ));
    };
    next( err );
}

function errHandler( err, req, res, next ) {// eslint-disable-line
    const { 
        output: { statusCode, payload } 
    } = err;    
    res.status( statusCode );
    res.json( withErrStack( payload, err.stack ));
};

module.exports = { logErrs, wrapErrs, errHandler };