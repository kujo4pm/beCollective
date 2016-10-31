var express = require('express');
var router = express.Router();
var Films = require('../models/films');

/* POST new film listing. */
router.post('/', (req, res, next)=> {
	var importedFilm = req.body;
	if(!importedFilm || !importedFilm.Title)
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
						poster: importedFilm.Poster !== 'N/A' ? importedFilm.Poster : null,
						imdbID: importedFilm.imdbID

					});
					req.message = 'Record successfully imported';
					return newFilm.save();
				}

				req.message = 'Film already imported';
			req.status = 200; //not modified
			return localCopy;
		})
		.then(localCopy=>{
			return res.status(req.status || 200).json({success: !!(localCopy), message: req.message, id: localCopy._id});
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
router.get('/:id', (req, res, next)=> {
	//return specified film
	Films.findOne({_id:req.params.id})
	.then(film=>{
		if(!film)
		{
			return res.status(404).json({success:false, message: "Film not found"});
		}
		return res.json(film);
	}).catch(err =>{
		return res.status(404).json({success:false, message: "Film not found"});
	});
});
router.delete('/:id', (req, res, next)=> {
	//return all imported films
	Films.remove({_id:req.params.id})
	.then(_=>{
		return res.json({success:true, message: 'Film removed'});
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

router.use('/:id/reviews', require('./reviews'));
module.exports = router;
