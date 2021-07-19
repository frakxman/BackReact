const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');

function moviesApi( app ) {
    const router =  express.Router();
    app.use("/api/movies", router );

    // GET all movies
    router.get("/", async function( req, res, next ) {
        try {
            const movies = await Promise.resolve( moviesMock );

            res.status( 200 ).json({
                data: movies,
                msg: 'movies listed'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // GET One movie
    router.get("/:id", async function( req, res, next ) {
        try {
            const movie = await Promise.resolve( moviesMock[0] );

            res.status( 200 ).json({
                data: movie,
                msg: 'movie retieved'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // POST Create movie
    router.post("/", async function( req, res, next ) {
        try {
            const createMovie = await Promise.resolve( moviesMock[0].id );

            res.status( 201 ).json({
                data: createMovie,
                msg: 'movie created'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // PUT Update movie
    router.put("/:id", async function( req, res, next ) {
        try {
            const updateMovie = await Promise.resolve( moviesMock[0].id );

            res.status( 200 ).json({
                data: updateMovie,
                msg: 'movie updated'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // DELETE movie
    router.delete("/:id", async function( req, res, next ) {
        try {
            const deleteMovie = await Promise.resolve( moviesMock[0].id );

            res.status( 200 ).json({
                data: deleteMovie,
                msg: 'movie deleted'
            })
        } catch ( err ) {
            next( err );
        }
    });
};

module.exports = moviesApi;