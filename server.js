//ALL THE FUNCTIONS THAT WE USED IN THE SERVER ARE DELCARED HERE
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const bcrypt = require ( 'bcryptjs' );
const jsonwebtoken = require( 'jsonwebtoken' );
let uuid = require( 'uuid' );

//THE CONFIGURATION OF THE SERVER TO GET THE DATA BASE INFORMATION
const { DATABASE_URL, PORT, SECRET_TOKEN } = require( './config' );


//THE MODELS THAT THE SERVERS IS GOING TO NEED IN ORDER TO MODIFY THE DATABASE
const { Users } = require( './models/user-model' );
let { donutList } = require( './models/donut-model' );
let { payList } = require( './models/pay-model' );

//SOME OTHER VARIABLES THAT ARE NEED FOR THE SERVER TO WORK

const app = express();
const jsonParser = bodyParser.json();
const cors = require( './middleware/cors' );

app.use( cors );
app.use( express.static( "public" ) );
app.use( morgan( 'dev' ) );

//FIRST WE DECLARE OUR PAYMENT FUNCTIONS----------------------------

//GET ALL THE PAYS FROM THE PAST
app.get( '/api/all-pays', ( req, res ) => {
    
    payList.getAll()
        .then( payList => {
            console.log(payList);
            return res.status( 200 ).json(payList);
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
    

});

//POST A NEW PAYMENT THAT HAS BEEN DONE BY THE USER
app.post('/api/new-pay', jsonParser ,(req,res) =>{

    let name = req.body.name;
    let price = req.body.price;
    let total = req.body.total;


    if( name == undefined || price == undefined || total == undefined ){

        res.statusMessage = "It is missing a parameter";
        return res.status( 406 ).send();
    }

    let newPay = {

        name : name,
        price : price,
        total : total
    }

    payList.create( newPay )
                .then( payList => {
                return res.status( 200 ).json( payList );
            })
                .catch( error => {
                console.log(error);
                res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
                return res.status( 500 ).send();
            });
        
});

//USERS FUNCTIONS------------------------------------------------------

//THE FIRST ONE TO DO A LOGIN TO VALIDATE THE USER THAT HAS LOGIN IN THE PAGE

app.get( '/api/validate-user', ( req, res ) => {
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        return res.status( 200 ).json( decoded );
    });
});

//THIS FUNCTIONS IS FOR OUR INDEX PAGE, WHERE IS THE LOG IN, I CHANGE THE SESSION TIME
//FOR 15 MIN, AND CHANGE THE VALUES OF THE ERROR MESSAGES DEPENDINDG ON THE ERROR.

app.post( '/api/users/login', jsonParser, ( req, res ) => {
    let { email, password } = req.body;

    if( !email || !password ){
        res.statusMessage = "You forgot something, try again!";
        return res.status( 406 ).end();
    }

    Users
        .getUserByEmail( email )
        .then( user => {

            if( user ){
                bcrypt.compare( password, user.password )
                    .then( result => {
                        if( result ){
                            let userData = {
                                firstName : user.firstName,
                                lastName : user.lastName,
                                email : user.email
                            };

                            jsonwebtoken.sign( userData, SECRET_TOKEN, { expiresIn : '15m' }, ( err, token ) => {
                                if( err ){
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status( 400 ).end();
                                }
                                return res.status( 200 ).json( { token } );
                            });
                        }
                        else{
                            throw new Error( "Password does not match, try again!" );
                        }
                    })
                    .catch( err => {
                        res.statusMessage = err.message;
                        return res.status( 400 ).end();
                    });
            }
            else{
                throw new Error( "This email does not exists, try again!" );
            }
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

//THIS ONE IS FOR REGISTER A USER, I ONLY USED ONCE THIS BECAUSE I CREATED THE USER BY USING POSTMAN

app.post( '/api/users/register', jsonParser, ( req, res ) => {
    let {firstName, lastName, email, password} = req.body;

    if( !firstName || !lastName || !email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    bcrypt.hash( password, 10 )
        .then( hashedPassword => {
            let newUser = { 
                firstName, 
                lastName, 
                password : hashedPassword, 
                email 
            };

            Users
                .createUser( newUser )
                .then( result => {
                    return res.status( 201 ).json( result ); 
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

//DONUTS FUNCTIONS------------------------------------------------------

// GET THE ALL DONUTS

app.get('/api/getalldonuts',(req,res) =>{

     donutList.getAll()
        .then( donutList => {
            return res.status( 200 ).json(donutList);
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
    
});

// GET DONUT BY NAME

app.get('/api/getbyname',(req,res) =>{


    let name = req.query.name;

    if ( name === undefined){

        res.statusMessage = "Missing donut NAME"
        return res.status( 406 ).end();
    }

    let findName = { name : name};

    let result = donutList.findOne( findName )
        .then( donutList => {

                if(donutList == null){

                    res.statusMessage = "This donut does not exists"
                    return res.status( 404 ).end();

                }else {

                    return res.status( 200 ).json(donutList);
                }

            
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });

});

// GET DONUT BY INGREDIENTS

app.get('/api/getbying',(req,res) =>{


    let ingredients = req.query.ingredients;

    if ( ingredients === undefined){

        res.statusMessage = "Missing the donut INGREDIENTS";
        return res.status( 406 ).end();
    }

    let findIngredients = { ingredients : ingredients};

    let result = donutList.findOne( findIngredients )
        .then( donutList => {

                if(donutList == null){

                    res.statusMessage = "There is not donuts with this ingredients"
                    return res.status( 404 ).end();

                }else {

                    return res.status( 200 ).json(donutList);
                }

            
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
});

// GET DONUT BY PRICE 

app.get('/api/getbyprice',(req,res) =>{


    let price = req.query.price;

    if ( price === undefined){

        res.statusMessage = "Missing the donut PRICE";
        return res.status( 406 ).end();
    }

    let findPrice = { price : price};

    let result = donutList.findPrice( findPrice )
        .then( donutList => {

                if(donutList == null){

                    res.statusMessage = "There is not donuts with this price"
                    return res.status( 404 ).end();

                }else {

                    return res.status( 200 ).json(donutList);
                }

            
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
});

// GET DONUT BY TAG 

app.get('/api/getbytag',(req,res) =>{


    let tag = req.query.tag;

    if ( tag === undefined){

        res.statusMessage = "Missing the donut TAG";
        return res.status( 406 ).end();
    }

    let findTag = { tag : tag};

    let result = donutList.findPrice( findTag )
        .then( donutList => {

                if(donutList == null){

                    res.statusMessage = "There is not donuts with this tag"
                    return res.status( 404 ).end();

                }else {

                    return res.status( 200 ).json(donutList);
                }

            
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
});

// ADD A NEW DONUT 

app.post('/api/newdonut', jsonParser ,(req,res) =>{

    let name = req.body.name;
    let ingredients = req.body.ingredients;
    let tag = req.body.tag;
    let price = req.body.price;
    let image = req.body.image;


    if ( name == undefined || ingredients == undefined || tag == undefined || price == undefined){

        res.statusMessage = "It is missing a parameter";
        return res.status( 406 ).send();
    }

    let id = uuid.v4();

    let newDonut = {

        id : id,
        name : name,
        ingredients : ingredients,
        tag : tag,
        price : price,
        image : image
    }

    donutList.create( newDonut )
                .then( donutList => {
                return res.status( 200 ).json( donutList );
            })
                .catch( error => {
                console.log(error);
                res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
                return res.status( 500 ).send();
            });
        
});

// DELETE A DONUT 

app.delete('/api/deletedonut',(req,res) =>{

    
    let idDelete = req.query.id;

    let objRemove = { id : idDelete };

    if ( idDelete === undefined){

        res.statusMessage = "Missing the donut ID"
        return res.status( 406 ).end();
    }

    //WE USE THIS METHOD TO VERIFY IF THE ID EXIST

    let result = donutList.findOne( objRemove )
        .then( donutList => {

                if(donutList == null){

                    console.log(objRemove);

                    res.statusMessage = "The ID does not exists"
                    return res.status( 404 ).end();
                }else {

                //IF IT EXIST WE USE THE METHOD REMOVE

                    donutList.remove(objRemove) 
                    .then( donutList => {

                return res.status( 201 ).json( donutList );
                })
                .catch( error => {
                     res.statusMessage = "ERROR CONNECTING WITH DATA BASE";
                     return res.status( 500 ).json( error );
                });

                }

            
        })

        .catch( error => {
            console.log(error);
            res.statusMessage = "ERROR CONNECTING WITH DATA BASE"
            return res.status( 500 ).send();
        });
    
});

// EDIT A DONUT

app.patch('/api/editdonut/',jsonParser,(req,res) =>{

    
    let idBody = req.body.id;
    let idParam = req.query.id;

    if ( idBody == undefined ){

        res.statusMessage = "MISSING ID TO UPDATE";
        return res.status( 406 ).send();
    }

    if (idBody != idParam){

        
        res.statusMessage = "THE ID IN THE PARAMETERS DOES NOT MATCH THE BODY ID";
        return res.status( 409 ).send();
    }
    
    let donutNew = req.body;
    let idOld = { id : idParam };

    donutList.update(idOld, donutNew)
    .then(donutList =>{
        return res.status( 201 ).json( donutNew );
    })
    .catch( error => {
        res.statusMessage = "ERROR CONNECTING WITH DATA BASE";
        return res.status( 500 ).json( error );
    });
    
});


//THE APP LISTEN TO VERIFY THE CONNECTION WITH THE DATA BASE

app.listen( PORT, () =>{
    console.log( "This server is running on port 8080" );

    new Promise( ( resolve, reject ) => {

        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});