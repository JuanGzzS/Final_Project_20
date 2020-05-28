const mongoose = require( 'mongoose' );

//USER MODEL THAT WE DID IN CLASS, IT HAS THE METHODS FOR CREATE USER
//AND GET USER BY EMAIL

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required: true
    },
    donutId : {

        type : mongoose.Schema.Types.ObjectId,
        ref: 'donuts'
    }
});

const userModel = mongoose.model( 'users', userSchema );

const Users = {
    createUser : function( newUser ){
        return userModel
                .create( newUser )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getUserByEmail: function( email ){
        return userModel
                .findOne( { email } )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    update : function (idOld, donutNew){
        return userModel.update(idOld, donutNew)
            then( users => {
                return users;
            })
            .catch( error => {
                throw Error( error );
            });
    }
}

module.exports = {
    Users
};