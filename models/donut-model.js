
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let uuid = require("uuid");

let idN = uuid.v4();

//THE DONUT COLLECTION THAT STORES ALL THE INFORMATION 

let donutCollection = mongoose.Schema({ 

	id : { type : String, data : idN },

	name : { type: String },

	tag : { type: String },

	ingredients : { type: String},

	price : { type: Number },

	image : { type : String}

});

let Donut = mongoose.model('donuts',donutCollection);

//IT HAS ALL THE FUNCTIONS TO GET ALL DONUTS, GET BY EACH SEARCH TYPE, CREATE A NEW ONE, REMOVE
//AND ALSO DELETE A DONUT FROM YOUR DATABASE

let donutList = {

	getAll : function(){

		return Donut.find()
		.then( donuts =>{
			return donuts;
		})

		.catch(error => {
			throw Error( error );
		});
	},
	findOne : function( name ){
	
	return Donut.findOne( name )
		.then( donuts =>{
			return donuts;
		})

		.catch(error => {
			throw Error( error );
		});
	},
	findPrice : function( name ){
	
	return Donut.find( name )
		.then( donuts =>{
			return donuts;
		})

		.catch(error => {
			throw Error( error );
		});
	},
	create : function( newDonut ){

		return Donut.create( newDonut )
				.then( donuts => {
					return donuts;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	remove : function( removeDonut ){

        return Donut.remove(removeDonut)
            then( donuts => {
                return donuts;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    update : function (idOld, donutNew){
        return Donut.update(idOld, donutNew)
            then( donuts => {
                return donuts;
            })
            .catch( error => {
                throw Error( error );
            });
    }

};

module.exports = {

	donutList
};