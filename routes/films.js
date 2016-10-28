var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var Films = require('../models/films');

/* GET users listing. */
router.get('/', (req, res, next)=> {
	if(!req.query.search)
	{
		//if we are not searching go to the next route
		return next();
	}
	requestify.get('http://www.omdbapi.com/', 
		{params: {
			t:req.query.search,
			plot:'full', 	
			r:'json'
		}})
	.then(extResponse=> {
		var importedFilm = extResponse.getBody();
		if(extResponse.getBody().Response === 'False')
		{
			req.status= 404;
			req.message=  extResponse.getBody().Error;
			return null;
		}
		console.log('Searching for:', importedFilm.imdbID);
		//check if film exists in our database already
		return Films.findOne({imdbID: importedFilm.imdbID})
		.then(localCopy=>
		{
			if(!localCopy)
			{
					//create one
					var newFilm = new Films({
						name: importedFilm.Title,
						year: importedFilm.Year,
						runtime: importedFilm.Runtime,
						genres: importedFilm.Genre,
						actors: importedFilm.Actors,
						poster: importedFilm.Poster,
						imdbID: importedFilm.imdbID

					});
					req.message = 'Record successfully imported';
					return newFilm.save();
			}

			req.message = 'Film already imported';
			console.log(req.message);
			req.status = 200; //not modified
			return localCopy;
			});

	})
	.then(localCopy=>{
		return res.status(req.status || 200).json({success: !!(localCopy), message: req.message});
	})
	.catch(err =>{
		return next(err);
	});

	
});

router.post('/', (req, res, next)=> {
	var importedFilm = req.body.importedFilm;
	if(!importedFilm)
	{
		//no film passed
		return next();
	}
	
	console.log('Searching for:', importedFilm.imdbID);
		//check if film exists in our database already
		Films.findOne({imdbID: importedFilm.imdbID})
		.then(localCopy=>
		{
			if(!localCopy)
			{
					//create one
					var newFilm = new Films({
						name: importedFilm.Title,
						year: importedFilm.Year,
						runtime: importedFilm.Runtime,
						genres: importedFilm.Genre,
						actors: importedFilm.Actors,
						poster: importedFilm.Poster,
						imdbID: importedFilm.imdbID

					});
					req.message = 'Record successfully imported';
					return newFilm.save();
			}

			req.message = 'Film already imported';
			console.log(req.message);
			req.status = 200; //not modified
			return localCopy;
			});

	})
	.then(localCopy=>{
		return res.status(req.status || 200).json({success: !!(localCopy), message: req.message});
	})
	.catch(err =>{
		return next(err);
	});

	
});

router.get('/', (req, res, next)=> {
	//return all imported films
	Films.find({})
	.then(films=>{
		return res.json(films);
	}).catch(err =>{
		return next(err);
	});
});
router.get('/render', (req, res, next)=> {
	//return all imported films
	Films.find({})
	.then(films=>{

		res.render('list', { title: req.app.get('title'), films: films});
	}).catch(err =>{
		return next(err);
	});
});

router.get('/:id/render', (req, res, next)=> {
	//return detail page for film
	Films.findOne({_id: req.params.id})
	.then(film=>{
		res.render('detail', { title: req.app.get('title'), film: film});
	}).catch(err =>{
		return next(err);
	});
});

router.use('/:id/review', require('./review'));
module.exports = router;
