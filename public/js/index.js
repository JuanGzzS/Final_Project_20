
//VERIFY THE USER AND CHECK IF IT IS A ADMIN OR A NORMAL USER
function userLoginFetch( email, password ){
    let url = '/api/users/login';

    let data = {
        email,
        password
    }

    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {

            if ( data.email == "admin@gmail.com"){

                localStorage.setItem( 'token', responseJSON.token );
                window.location.href = "pages/homeadmin.html";

            }else {
                    localStorage.setItem( 'token', responseJSON.token );
                    window.location.href = "pages/home.html";
            }
        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });


}

//WATCH FORM TO SEE IF SOMEONE IS TRYING TO LOGIN

function watchLoginForm(){
    let loginForm = document.querySelector( '.login-form' );

    loginForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let email = document.getElementById( 'userEmail' ).value;
        let password = document.getElementById( 'userPassword' ).value;

        userLoginFetch( email, password );
        loginForm.reset();
    
    })
}

function init(){
    watchLoginForm();
}

init();
