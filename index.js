const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrs, errHandler, wrapErrs } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use( express.json() );

// Routes
moviesApi( app );

// Catch Error 404
app.use( notFoundHandler );

// Errors middleware
app.use( logErrs );
app.use( wrapErrs );
app.use( errHandler );

app.listen( config.port, function() {
    console.log(`Listening http://localhost:${ config.port }`);
});
