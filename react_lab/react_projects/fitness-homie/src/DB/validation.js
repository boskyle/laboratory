export const isUsernameExist = async (userNameInput) => {
    let userNameListingApi = 'https://fitness-homie.com/php-endpoints/Login/check-username-exist.php';
    let matcher = '';

    try {
        
        
        await fetch(userNameListingApi, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            }
            }).then(response => response.json())
                .then(response => {
                    response.forEach(username => {
                        if(username === userNameInput) {
                            matcher = userNameInput;
                        }
                    })
                })
                .catch(err => console.log(err))
    
                // console.log(matcher);
          return (userNameInput === matcher) ? false : true;

    } catch (err) {console.log("Something went wrong with email fetch:"+err)}

}


export const isUsernameExistWithCheck = async (userNameInput,currentUsername) => {
    let userNameListingApi = 'https://fitness-homie.com/php-endpoints/Login/check-username-exist.php';
    let matcher = '';

    try {
        
        
        await fetch(userNameListingApi, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            }
            }).then(response => response.json())
                .then(response => {
                    response.forEach(username => {
                        if(username === userNameInput) {
                            matcher = username;
                        }
                    })
                })
                .catch(err => console.log(err))
    
                // console.log(matcher);
          return (userNameInput === matcher && currentUsername !== matcher) ? false : true;

    } catch (err) {console.log("Something went wrong with email fetch:"+err)}

}