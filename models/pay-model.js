
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//THIS PAYMENT COLLECTION HAS THE NAME OF THE PRODUCT, THE PRICE AND THE TOTAL OF THE
//PURCHASED

let payCollection = mongoose.Schema({ 

	name : { type: String },

	price : { type: String },

	total : { type : Number}

});

let Payment = mongoose.model('pays',payCollection); 

let payList = {

	getAll : function(){

		return Payment.find()
		.then( pays =>{
			return pays;
		})

		.catch(error => {
			throw Error( error );
		});
	},
	create : function( newPay ){

		return Payment.create( newPay )
				.then( donuts => {
					return donuts;
				})
				.catch( error => {
					throw Error(error);
				});
	}

};

module.exports = {

	payList
};