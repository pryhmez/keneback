var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},

	lastName: {
		type: String,
		required: true,
		trim: true
	},

	email: {
		type: String,
		required: true,
		lowercase: true,
		// index: {unique: true, dropDups: true},
		unique: true
	},

	cardNo: {
		type: String,
		required: true,
		lowercase: true,
		// index: {unique: true, dropDups: true},
		unique: true
	},

	gender: {
		type: String,
		required: true,
		trim: true
	},

	age: {
		type: String,
		required: true,
		trim: true
	},


	regNo: {
		type: String,
		required: true,
		trim: true
	},

	pix: {
		type: String,
		trim: true
	},

	createdDate: { type: Date, default: new Date() },

});

module.exports = mongoose.model('Student', StudentSchema);
