
//GET ALL THE DONUTS TO DISPLAY SO THE ADMIN CAN SE WHAT IS IN THE MENU
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

//FUNCTION FOR THE ADMIN TO EDIT THE MENU OF THE DONUTS 

function menuEdit(){

    //ADD NEW DONUT

    let newDonut = document.getElementById('submitN');
        newDonut.addEventListener('click', (event) =>{

            event.preventDefault();

            let name = document.getElementById('newName').value;
            let ingredients = document.getElementById('newIng').value;
            let tag = document.getElementById('newTag').value;
            let price = document.getElementById('newPrice').value;
            let image = document.getElementById('newImg').value;

                let url = '/api/newdonut';
                
                let bodyJSON = {
                    "name" : name,
                    "ingredients" : ingredients,
                    "tag" : tag,
                    "price" : price,
                    "image" : image
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
            
            document.getElementById('newB').reset();
        });

    //DELETE A DONUT

    let deletedonut = document.getElementById('submitD');
        deletedonut.addEventListener('click', (event) =>{

                event.preventDefault();

                let url = '/api/deletedonut?id='+document.getElementById('deleteId').value;
                let settings = {
                    method : "DELETE",
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
            document.getElementById('deleteB').reset();
        });

    //EDIT A PRODUCT FROM MENU

    let updateB = document.getElementById('submitB');
        updateB.addEventListener('click', (event) =>{

            event.preventDefault();

            let url = '/api/editdonut?id='+document.getElementById('updateId').value;

            let id = document.getElementById('updateId').value;

            let bodyJSON = { "id" : id };


            if ( document.getElementById('updateN').value != ""){

                let name = document.getElementById('updateN').value;
                bodyJSON.name = name;
            }

            if ( document.getElementById('updateIng').value != ""){

                let ingredients = document.getElementById('updateIng').value;
                bodyJSON.ingredients = ingredients;
            }

            if ( document.getElementById('updateTag').value != ""){

                let tag = document.getElementById('updateTag').value;
                bodyJSON.tag = tag;
            }

            if ( document.getElementById('updatePrice').value != ""){

                let price = document.getElementById('updatePrice').value;
                bodyJSON.price = price;
            }

            if ( document.getElementById('updateImg').value != ""){

                let img = document.getElementById('updateImg').value;
                bodyJSON.image = img;
            }
            

            let settings = {
                method : "PATCH",
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

                document.getElementById('updateB').reset();
        });

}

//DISPLAY THE MENU THAT IS AVAILABLE

function displayResults(responseJSON){

    let donuts = document.getElementById('donuts');
    donuts.innerHTML= "";

    if (responseJSON.length == undefined ){

            //Variables from responseJSON

            let id = responseJSON.id;
            let name = responseJSON.name;
            let ingredients = responseJSON.ingredients;
            let tag = responseJSON.tag;
            let price = responseJSON.price;
            let image = responseJSON.image;


            //Create elements to display values in html

            let idH = document.createElement("h3");
            let nameH = document.createElement("h3");
            let ingH = document.createElement("h4");
            let tagH = document.createElement("h4"); 
            let priH = document.createElement("h4"); 
            let imgH = document.createElement("img");


            //Adapt variable for image 

            imgH.src = image;
            imgH.className = "imgD";

            donuts.append(imgH)

            //append the values to the created elements

            idH.append(id);
            nameH.append(name);
            ingH.append(ingredients);
            tagH.append("Tag : ");
            tagH.append(tag);
            priH.append("$ : ");
            priH.append(price);

            //append to the HTML div

            donuts.append(idH);
            donuts.append(nameH);
            donuts.append(ingH);
            donuts.append(tagH);
            donuts.append(priH);


    }else{

        for(let i=0; i<responseJSON.length; i++){

            //Variables from responseJSON

            let id = responseJSON[i].id;
            let name = responseJSON[i].name;
            let ingredients = responseJSON[i].ingredients;
            let tag = responseJSON[i].tag;
            let price = responseJSON[i].price;
            let image = responseJSON[i].image;

            //Create elements to display values in html

            let idH = document.createElement("h3");
            let nameH = document.createElement("h3");
            let ingH = document.createElement("h4");
            let tagH = document.createElement("h4"); 
            let priH = document.createElement("h4"); 
            let imgH = document.createElement("img");

            let spanD = document.createElement("div");

            spanD.id = "itemD"


            //Adapt variable for image 

            imgH.src = image;
            imgH.className = "imgD";

            spanD.append(imgH)

            //append the values to the created elements

            idH.append("ID : ");
            idH.append(id);
            nameH.append(name);
            ingH.append(ingredients);
            tagH.append("Tag : ");
            tagH.append(tag);
            priH.append("$ : ");
            priH.append(price);

            //append to the HTML div

            spanD.append(idH);
            spanD.append(nameH);
            spanD.append(ingH);
            spanD.append(tagH);
            spanD.append(priH);
            
            donuts.append(spanD);
        }
    }



    
}

function init(){

//VALIDATE THE USER AND GET THE INFORMATION OF THE ADMIN
    
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

    allDonuts();
    menuEdit();

    $('#lgBttn').click(function(e){
         
         window.history.back();
         
    });
}
init();