var express = require('express');
var requestify = require('requestify');
var router = express.Router({mergeParams: true});
var Films = require('../models/films');


//will include standard CRUD operations for reviews
router.get('/', (req, res, next)=> {
	console.log('Return all reviews for film:', req.params.id);
	//return all reviews for film :id
	Films.findOne({_id:req.params.id})
	.then(film=>{
		return res.json(film.reviews);
	}).catch(err =>{
		return next(err);
	});
});
router.post('/', (req, res, next)=> {
	console.log('Adding review for film:', req.params.id);
	//return all reviews for film :id
	Films.findOne({_id:req.params.id})
	.then(film=>{
		film.reviews.push({
			stars: parseInt(req.body.stars),
			review: req.body.review
		});
		return film.save();
	})
	.then(film=>{
		return res.json({success:true, message: 'Review Saved', id: film.reviews.length - 1});
	})
	.catch(err =>{
		console.log(err);
		return next(err);
	});
});
router.put('/:revId', (req, res, next)=> {
	console.log('Updating review for film:', req.params.id);
	//return all reviews for film :id
	Films.findOne({_id:req.params.id})
	.then(film=>{
		film.reviews[req.params.revId] = {
			stars: parseInt(req.body.stars),
			review: req.body.review
		};
		return film.save();
	}).then(film=>{
		return res.json({success:true, message: 'Review Saved'});
	}).catch(err =>{
		return next(err);
	});
});
router.delete('/:revId', (req, res, next)=> {
	//return all reviews for film :id
	Films.findOne({_id:req.params.id})
	.then(film=>{
		film.reviews.splice(req.params.revId, 1);
		return film.save();
	}).then(film=>{
		return res.json({success:true, message: 'Review Deleted'});
	}).catch(err =>{
		return next(err);
	});
});
module.exports = router;
