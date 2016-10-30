var tape = require('tape');
var tapes = require('tapes');
var test = tapes(tape);
var app = require('../app');
var request = require('supertest');
var sampleMovieId,sampleReviewId;


//testing for the review endpoints

test('a suite of tests to test the Review Endpoints', function (t) {
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
	
	var sampleReview = 
	{
		stars: 5,
		review: "This is a classic"
	};
	var editedReview = 
	{
		stars: 4,
		review: "Saw it again and I think it's actually overrated!"
	}

	t.comment('Posting sample film to review later');
	request(app)
	.post('/films')
	.send(sampleMovie)
	.set('Accept', 'application/json')
	.expect('Content-Type', /json/)
	.expect(200, function(err, res) {
		sampleMovieId = res.body.id;
	}).then(_=>{

		t.test('testing posting new review', function (newTest) {
			request(app)
			.post('/films/' + sampleMovieId + '/reviews' )
			.send(sampleReview)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				newTest.same(res.body.success, true,  'film successfully posted'); 
				sampleReviewId = res.body.id;
				newTest.end();
			});


		});
		t.test('testing getting sample review', function (newTest) {
			request(app)
			.get('/films/' + sampleMovieId + '/reviews/' + sampleReviewId )
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				newTest.same(res.body.stars, sampleReview.stars,  'returned stars is correct'); 
				newTest.same(res.body.review, sampleReview.review,  'returned review is correct'); 
				newTest.end();
			});


		});
		t.test('testing updating sample review', function (newTest) {
			request(app)
			.put('/films/' + sampleMovieId + '/reviews/' + sampleReviewId)
			.send(editedReview)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				newTest.same(res.body.stars, editedReview.stars,  'returned stars is correct'); 
				newTest.same(res.body.review, editedReview.review,  'returned review is correct'); 
				newTest.end();
			});


		});
		t.test('testing deleting the sample review', function (newTest) {
			request(app)
			.delete('/films/' + sampleMovieId + '/reviews/' + sampleReviewId)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, function(err, res) {
				newTest.same(res.body.success, true,  'review was deleted'); 
				newTest.same(res.body.message, 'Review Deleted',  'message was correct'); 
				newTest.end();
			});


		});
		t.test('testing getting review that does not exist', function (newTest) {
			request(app)
			.post('/films/' + sampleMovieId + '/reviews/0')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404, function(err, res) {
				newTest //no error
				newTest.end();
			});


		});
	}).then(_=>
	{
		t.comment('testing deleting the sample film');
		request(app)
		.delete('/films/' + sampleMovieId)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, function(err, res) {
			t.end();
		});
	});
	
});