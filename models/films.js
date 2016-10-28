var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var reviewSchema = Schema({
	stars: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	review: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required:true
	}
},
{
	timestamps: true
});

var filmSchema = Schema({
	name:{
		type:String,
		required: true,
		unique: true
	},
	year:{
		type:String,
		required: true
	},
	runtime:{
		type:String,
		required: true
	},
	genres:{
		type:String,
		default: ""
	},
	actors:{
		type:String,
		required: true		
	},
	poster:{
		type:String,
		required: false
	},
	imdbID:{
		//although not in spec this is a good way to 
		// reconcile our DB with OMDb API
		type:String,
		required: true		
	},
	reviews: [reviewSchema]
},
	{
		timestamps:true	});

var Films = mongoose.model('Film', filmSchema);

module.exports = Films;

