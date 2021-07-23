const express = require('express');
const MoviesService = require('../service/movies');

const { 
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi( app ) {
    const router =  express.Router();
    app.use("/api/movies", router );

    const movieServ = new MoviesService();

    // GET all movies
    router.get("/", async function( req, res, next ) {
        const { tags } = req.query;
        try {
            const movies = await movieServ.getMovies({ tags });

            res.status( 200 ).json({
                data: movies,
                msg: 'movies listed'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // GET One movie
    router.get("/:id", validationHandler({ id: movieIdSchema }, 'params' ), async function( req, res, next ) {
        const { id } = req.params;
        try {
            const movie = await movieServ.getMovie({ id });

            res.status( 200 ).json({
                data: movie,
                msg: 'movie retieved'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // POST Create movie
    router.post("/", validationHandler( createMovieSchema ), async function( req, res, next ) {
        const { body: movie } = req;
        try {
            const createMovie = await movieServ.createMovie({ movie });

            res.status( 201 ).json({
                data: createMovie,
                msg: 'movie created'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // PUT Update movie
    router.put("/:id", validationHandler({ id: movieIdSchema }, 'params' ), validationHandler( updateMovieSchema ), async function( req, res, next ) {
        const { id } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovie = await movieServ.updatedMovie({ id, movie });

            res.status( 200 ).json({
                data: updatedMovie,
                msg: 'movie updated'
            })
        } catch ( err ) {
            next( err );
        }
    });

    // DELETE movie
    router.delete("/:id", validationHandler({ id: movieIdSchema }, 'params' ), async function( req, res, next ) {
        const { id } = req.params;
        try {
            const deleteMovie = await movieServ.deletedMovie({ id });

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