var test = require('tape');
var app = require('../app');
var request = require('supertest');
var mongoose = require('mongoose');	
var tapSpec = require('tap-spec');
test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

//testing for the films endpoints
test('a series of tests against the Film endpoint:', function (t) {
	var sampleMovie = 
	{
		"Title" : "Sunset Boulevard", 
		"Year" : "1950", 
		"Runtime" : "129 mins", 
		"Actors" : "William Holden, Gloria Swanson, Erich von Stroheim, Nancy Olson", 
		"imdbID" : "tt" + new Date().getTime(),
		"Poster" : "<poster>",
		"Genre" : "classic, drama",
		"randomField" :" this should not be ingested"

	};
	t.test('testing getting all films', function (newTest) {
		//this test is really just to check that the endpoint is up and running
		// and will not validate any of the return values
		request(app)
		.get('/films')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end( function(err, res) {
			newTest.end();
		});


	});
	t.test('testing posting sample film', function (newTest) {
		request(app)
		.post('/films')
		.send(sampleMovie)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end( function(err, res) {
			newTest.same(res.body.success, true,  'film successfully posted'); 
			sampleMovieId = res.body.id;
			newTest.end();
		});


	});
	t.test('testing getting sample film', function (newTest) {
		request(app)
		.get('/films/' + sampleMovieId)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end( function(err, res) {
			newTest.same(res.body.name, sampleMovie.Title,  'returned name is correct'); 
			newTest.same(res.body.runtime, sampleMovie.Runtime,  'returned runtime is correct'); 
			newTest.same(res.body.actors, sampleMovie.Actors,  'returned actors is correct'); 
			newTest.same(res.body.poster, sampleMovie.Poster,  'returned poster is correct'); 
			newTest.same(res.body.genres, sampleMovie.Genre,  'returned genres is correct'); 
			newTest.same(res.body.imdbID, sampleMovie.imdbID,  'returned imdbID is correct'); 
			newTest.same(res.body.randomField, undefined,  'random field is not ingested'); 
			newTest.end();
		});


	});

	t.test('testing deleting the sample film', function (newTest) {
		request(app)
		.delete('/films/' + sampleMovieId)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end( function(err, res) {
			newTest.same(res.body.success, true,  'film was deleted'); 
			newTest.same(res.body.message, 'Film removed',  'message was correct'); 
			newTest.end();
		});


	});
	t.test('testing getting film that does not exist', function (newTest) {
		request(app)
		.get('/films/' + 0)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(404)
		.end( function(err, res) {
			//newTest //no error
			newTest.end();

		});

		t.end();
		mongoose.disconnect();
	});

});