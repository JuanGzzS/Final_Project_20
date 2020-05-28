
/*THIS FUNCTION GIVES YOU ALL THE DONUTS AVAILABLES IN THE MENU*/

function allDonuts(){

    let url = '/api/getalldonuts';

    let settings = {
        method : "GET"
    }
    fetch(url, settings)
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(responseJSON => {
            displayResults(responseJSON);
        });

}

//FUNCTION TO SELECT YOUR SEARCH OPTION

function searchOption(){

//RESET BUTTON

let reset = document.getElementById('resetSearch');
        reset.addEventListener('click', (event) =>{

            event.preventDefault();
            $("#errorMes").empty();

            allDonuts();

            
            }); 




//SEARCH SECTION BY NAME, INGREDIENTS, TAG AND PRICE DEPENDS ON WHAT THE USER 
//CHOOSE IN THE SELECTOR

let search = document.getElementById('submitSearch');
        search.addEventListener('click', (event) =>{

            event.preventDefault();
            $("#errorMes").empty();

            let valorS = document.getElementById('infoS').value;

            //VERIFY THE SEARCH OPTION

            let optionS = document.getElementById('myselect').value;

            //SEARCH BY NAME

            if ( optionS == 1){

                let url = '/api/getbyname?name='+valorS;
                let settings = {
                    method : "GET"
                }
                fetch(url, settings)
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }else{

                            let donuts = document.getElementById('errorMes');
                            donuts.innerHTML= "";

                            let err = document.createElement("h2");
                            err.append("Donut does not exists, try again!");

                            donuts.append(err);
                        }
                    })
                    .then(responseJSON => {
                        displayResults(responseJSON);
                    });
            
            }else if ( optionS == 2){

                //SEARCH BY INGREDIENTS

                let url = '/api/getbying?ingredients='+valorS;
                let settings = {
                    method : "GET"
                }
                fetch(url, settings)
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }else{
                            
                            let donuts = document.getElementById('errorMes');
                            donuts.innerHTML= "";

                            let err = document.createElement("h2");
                            err.append("There is not donuts with those ingredients, try again!");

                            donuts.append(err);
                        }
                    })
                    .then(responseJSON => {
                        displayResults(responseJSON);
                    });
            
            }else if ( optionS == 3){

                //SEARCH BY TAG

                let url = '/api/getbytag?tag='+valorS;
                let settings = {
                    method : "GET"
                }
                fetch(url, settings)
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }else{
                            
                            console.log("error");
                            let donuts = document.getElementById('errorMes');
                            donuts.innerHTML= "";

                            let err = document.createElement("h2");
                            err.append("This tag does not exists, try again!");

                            donuts.append(err);
                        }
                    })
                    .then(responseJSON => {
                        displayResults(responseJSON);
                    });
            
            }else if ( optionS == 4){

                //SEARCH BY PRICE

                let url = '/api/getbyprice?price='+valorS;
                let settings = {
                    method : "GET"
                }
                fetch(url, settings)
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }else{
                            
                            let donuts = document.getElementById('errorMes');
                            donuts.innerHTML= "";

                            let err = document.createElement("h2");
                            err.append("There are not donuts with this price, try again!");

                            donuts.append(err);
                        }
                    })
                    .then(responseJSON => {
                        displayResults(responseJSON);
                    });
            }

            
        });
}

//DISPLAY RESULTS AGAIN IN THE MENU IN CASE YOU SEARCH FOR SOMETHING OR TO GET ALL DONUTS

function displayResults(responseJSON){

    let donuts = document.getElementById('donuts');
    donuts.innerHTML= "";

    //THIS IF'S IS USED WHEN THE RESPONSEJSON IS ONLY ONE OBJECT AND NOT AN ARRAY

    if (responseJSON.length == undefined ){

            //Variables from responseJSON

            let name = responseJSON.name;
            let ingredients = responseJSON.ingredients;
            let tag = responseJSON.tag;
            let price = responseJSON.price;
            let image = responseJSON.image;


            //Create elements to display values in html

            let nameH = document.createElement("h3");
            nameH.className = "nameDonuts";
            let ingH = document.createElement("h4");
            let tagH = document.createElement("h4"); 
            let priX = document.createElement("h4");  
            let imgH = document.createElement("img");


            //Adapt variable for image 

            imgH.src = image;
            imgH.className = "imgD";

            donuts.append(imgH);

            //append the values to the created elements

            nameH.append(name);
            ingH.append(ingredients);
            tagH.append("Tag : ");
            tagH.append(tag);
            priX.append(price);

            //append to the HTML div

            donuts.append(nameH);
            donuts.append(ingH);
            donuts.append(tagH);
            donuts.append(priX);



    }else{

        for(let i=0; i<responseJSON.length; i++){

            //Variables from responseJSON

            let name = responseJSON[i].name;
            let ingredients = responseJSON[i].ingredients;
            let tag = responseJSON[i].tag;
            let price = responseJSON[i].price;
            let image = responseJSON[i].image;

            //Create elements to display values in html

            let nameH = document.createElement("h3");
            nameH.className = "nameDonuts";
            let ingH = document.createElement("h4");
            let tagH = document.createElement("h4"); 
            let priX = document.createElement("h4");  
            let imgH = document.createElement("img");

            //Adapt variable for image 

            imgH.src = image;
            imgH.className = "imgD";

            donuts.append(imgH)

            //append the values to the created elements

            nameH.append(name);
            ingH.append(ingredients);
            tagH.append("Tag : ");
            tagH.append(tag);
            priX.append(price);


            //append to the HTML div

            donuts.append(nameH);
            donuts.append(ingH);
            donuts.append(tagH);
            donuts.append(priX);
        
        }

        
    }

}

//IN THIS FUNCTION WE ADD TO THE CART BY USING THE VARIABLE DONUT LIST
//WE CREATE EVERYSINGLE ELEMENT THAT WE NEED TO DISPLAY WHAT THE LIST THAT THE USER
//HAS CREATE

function addtoCart(){


    let cart = document.getElementById('check');
    cart.innerHTML= "";


        for(let i=0; i<donutList.length; i++){

            //NAME AND PRICE VARIABLES

        	let outName = donutList[i].name;
        	let outPrice = donutList[i].price;
    	
            //ELEMENTS TO DISPLAY IN HTML

        	let h2 = document.createElement("h2");
            h2.className = "orderD";
        	let h3 = document.createElement("h3");
            h3.className = "orderP";
        	let div = document.createElement("div");

        	let erase = document.createElement("BUTTON");
            erase.className = "bttnDel";
    
        	erase.innerHTML = "Delete Item";

            //APEND EVERY SINGLE VALUE IN THE CART INNERHTML

        	h2.append(outName);
        	h3.append(outPrice);


        	cart.append(h2);
        	cart.append(div);
        	cart.append(h3);
        	cart.append(erase);
   
        }  
     
}

//HERE WE CHECK IF THE USER CLICKS IN THE DELETE BUTTON AND WE GET THE NAME OF THE DONUT
//BY EVENT TARGET AND WE SEND THAT VALUE TO A FUNCTION delCart

let parent = document.getElementById('check');
        parent.addEventListener('click', (event) =>{

                let nameDonut = event.target.previousSibling.previousSibling.previousSibling.innerHTML;
                delCart(nameDonut);
            
}); 

//HERE WE SEARCH FOR THE NAME OF THE DONUT THAT HAS BEEN ERASED, AND WE TAKE OF THE LIST
//THAT DONUT, WE USED A BREAK BECAUSE IF THE USER HAS MORE THAN ONE DONUT IN THE LIST WITH
//THE SAME NAME THE FUNCTION WILL ERASE ALL OF THEM, SO WITH THIS IT ONLY EARSED ONE

function delCart(nameDonut){


	for(let i=0; i < donutList.length; i++){

			if (nameDonut == donutList[i].name){

				donutList.splice(i,1);
                addtoCart();
                break;
			}
   
        }
}

//IF THE USERS CLICKS ON "CHECKOUT" IT WILL SEND YOU TO THIS FUNCTION THAT 
//ERASE EVERYTHING FROM THE SCREEN AND SHOWS YOU THE INFORMATION OF YOUR ORDER
//AND ALSO THE PAYMENT METHOD

function payD(){

    let cart = document.getElementById('check');
    cart.innerHTML="";

    let pay = document.getElementById('submitPay');
    pay.value = "PAY";

    let totalPay = 0;

    let paycc = document.createElement("SELECT");

    let credit = document.createElement("option");

    let x = document.createTextNode("Credit Card");

    let cash = document.createElement("option");

    let y = document.createTextNode("Cash");

    credit.appendChild(x);
    cash.appendChild(y);

    paycc.append(credit);
    paycc.append(cash);

    paycc.className = "payMet";

    let space = document.createElement("div");

    for(let i = 0; i < donutList.length; i++){

        let donut = donutList[i].name;
        let price = donutList[i].price;

        let space = document.createElement("div");


        cart.append(donut);
        cart.append(" ");
        cart.append(price);
        cart.append(space);
        totalPay = totalPay + Number(price); 

    }

    cart.append("TOTAL = ");
    cart.append(totalPay);

    cart.append(space);

    cart.append(paycc);


     let button = document.getElementById('submitPay');
        button.addEventListener('click', (event) =>{

            addPayInfo();
            resetValues();

            }); 
}

//THIS FUNCTION FETCH THE NEW PAY FUNCTION TO ADD A NEW ELEMENT TO THE DATABASE

function addPayInfo(){

    let payDonuts = " ";

    let payPrice = " ";

    let total = 0;

     for(let i = 0; i < donutList.length; i++){

        let donut = donutList[i].name;
        let price = donutList[i].price;

        payDonuts = payDonuts + " " + donut;
        payPrice = payPrice + " " + price
        total = total + Number(price); 

    }
    
    let url = '/api/new-pay';
                
                let bodyJSON = {
                    "name" : payDonuts,
                    "price" : payPrice,
                    "total" : total
                }

                let settings = {
                    method : "POST",
                    body : JSON.stringify(bodyJSON),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, settings)
                    .then((response)=>{
                        if(response.ok){
                            return response.json();
                    }

                    throw new Error(response.statusText);
                })
                .then((responseJSON)=>{
                    allDonuts();
                });
}

//WHEN THE USER HAS PAYED FOR HIS ORDER THIS FUNCTION RESETS EVERY VALUE OF THE PAGE
//INCLUDING THE CART

function resetValues(){

    let cart = document.getElementById('check');
    cart.innerHTML="";

    let pay = document.getElementById('submitPay');
    pay.value = "Check Out";

    donutList = [];

    location.reload();


}

//THIS FUNCTION FETCH THE FUNCTION ALL-PAYS TO GET ALL HIS PAST ORDERS

function yourStory(){

    let url = '/api/all-pays';

    let settings = {
        method : "GET"
    }
    fetch(url, settings)
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(responseJSON => {
            displayPay(responseJSON);
        });
}

//THIS FUNCTION USES THE RESPONSEJSON OF THE ALL-PAYS FUNCTION TO DISPLAY THE PAST ORDERS
//IN THE INFORMATION OF THE USER

function displayPay(responseJSON){


    let pay = document.getElementById('lastPay');
    pay.innerHTML ="";


    for(let i=0; i<responseJSON.length; i++){

        let li = document.createElement("li")
        let space = document.createElement("div");
        let space1= document.createElement("div");
        let space2 = document.createElement("div");
        let space3 = document.createElement("br");

        let donuts = responseJSON[i].name;
        let prices = responseJSON[i].price;
        let total = responseJSON[i].total;


        li.append("DONUTS : ")
        li.append(donuts);
        li.append(space1);
        li.append("PRICE OF EACH ONE : ")
        li.append(prices);
        li.append(space);
        li.append("TOTAL OF YOUR ORDER : ")
        li.append(total);
        li.append(space2);
        li.append(space3);

        pay.append(li);
        
    }
    
}

//INIT FUNCTION 

function init(){

//THIS NEXT FUNCTIONS TOGGLES THE CLASS "offViss" TO HIDDEN THE REST OF THE PAGES
//THAT THE USERS IS NOT USING

 $('#createD').click(function(e){

         e.preventDefault();
         
         $('.mainpage').toggleClass("offVis");

         $('#createDonut').toggleClass("offVis");

         $("#donuts").empty();

         allDonuts();

         searchOption();


         
    }); 


 $('#aboutU').click(function(e){

         e.preventDefault();
         
         $('.mainpage').toggleClass("offVis");

         $('#aboutUs').toggleClass("offVis");


         
    }); 

 $('#userI').click(function(e){

         e.preventDefault();

         $("#lastPay").empty();
         
         $('.mainpage').toggleClass("offVis");

         $('#userInfo').toggleClass("offVis");

         yourStory();


         
    }); 

  $('#userC').click(function(e){

         e.preventDefault();
         
         $('.mainpage').toggleClass("offVis");

         $('#userCart').toggleClass("offVis");


         
    }); 

  //LOG OUT WHEN CLICKS IN THE BUTTON

  $('#logOut').click(function(e){
         
         window.history.back();
         
    }); 

  //THIS FUNCTION VALIDATES THE USER AND GIVES US BACK THE DATA OF THE USER SO WE CAN DISPLAY
  //IN "YOUR INFORMATION" SECTION

let url = "/api/validate-user";
let settings = {
    method : 'GET',
    headers : {
        sessiontoken : localStorage.getItem( 'token' )
    }
};

fetch( url, settings )
    .then( response => {
        if( response.ok ){
            return response.json();
        }

        throw new Error( response.statusText );
    })
    .then( responseJSON => {
        let greeting = document.querySelector( '.greeting' );
        greeting.innerHTML = `${responseJSON.firstName} ${responseJSON.lastName}`;
    })
    .catch( err => {
        console.log( err.message );
        window.location.href = "/index.html";
    });

//WITH THIS FUNCTIONWE ADD THE DONUT THAT THE USERS CHOOSE IN THE MENU TO THE DONUT LIST
//WHICH WE ADD TO THE CART USING THE FUNCTION addtoCart

let parent = document.getElementById('donuts');
        parent.addEventListener('click', (event) =>{

                let nameDonut = event.target.innerHTML;
                let price = event.target.nextSibling.nextSibling.nextSibling.innerHTML;
                let aux = { name: nameDonut, price : price};

                donutList.push(aux);

                addtoCart();

            }); 

//THIS FUNCTION TOGGLES THE PAYD FUNCTION EXPLAINED BEFORE

  let button = document.getElementById('submitPay');
        button.addEventListener('click', (event) =>{

            payD();

            }); 

   

}

//WE DELCARE THIS ARRAY SO WE CAN ADD THE OBJECTS OF THE LIST OF DONUTS THAT THE USER CREATES
let donutList = [];

init();

