export const isEmailExist = async (emailInput) => {

    let emailsListing = 'http://fitness-homie.com/php-endpoints/Register/check-email-exist.php';
    let matcher = '';
    // code goes here for api fetch
    await fetch (emailsListing,{
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    }).then (response => response.json())
        .then(response =>{response.forEach(email => {
            // console.log(email);
            if(email === emailInput) {matcher = emailInput;}
        })}).catch(err => console.log(err))
        return (matcher === '') ? false : true;
}

export const getUsernameFromId  = async (userId) => {

    let userNameListing = 'http://fitness-homie.com/php-endpoints/Login/get-username-from-id.php';
    let buffer;
    
    await fetch(userNameListing, {
        method: 'POST',
        headers:{
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: userId
    }).then(response => response.json())
        .then(response => {if (response !== null){
            buffer = response.username;
        }} )
            .catch(err => console.log(err));

    return buffer;
}


