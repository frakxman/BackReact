const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub  } =  require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');


describe("service - movies", () => {
    const MoviesServices = proxyquire('../service/movies', {
        '../lib/mongo': MongoLibMock
    });

    const moviesService = new MoviesServices();

    describe("when getMovies method is called", async () => {
        it('should call the getall MongoLib method', async () => {
            await moviesService.getMovies({});
            assert.strictEqual( getAllStub.called, true );
        });

        it('should return an array of movies', async () => {
            const result =  await moviesService.getMovies({});
            const actual = moviesMock;
            assert.deepStrictEqual( result, actual );
        });
    });
})
