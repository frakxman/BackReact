const boom = require('@hapi/boom');
const joi =  require('@hapi/joi');

function validate( data, schema ) {
    const { err } = joi.object( schema ).validate( data );
    return err;
};

function validationHandler( schema, check = 'body' ) {
    return( req, res, next ) => {
        const err = validate( req[ check ], schema );
        err ? next( boom.badRequest( err ) ) : next();
    };
};

module.exports = validationHandler;