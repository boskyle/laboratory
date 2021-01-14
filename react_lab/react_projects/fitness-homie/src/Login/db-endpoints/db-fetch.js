export const isEmailExist = async (emailInput) => {

    let emailsListing = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Register/check-email-exist.php';
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


