export const LoadBasicInfo = async (userId) => {
    

    let loadInfoUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/load-profile.php';
    let userInfo;

    await fetch(loadInfoUrl, {
            method: 'POST',
            body: JSON.stringify(userId)

        }).then(response => response.json())
            .then (response => {
                      userInfo = response;    
                                 
            })
                .catch(error => console.log(error));

            if (userInfo !== null) {
               
                return userInfo;
            }

            return false;

            

    // return an object of a succesful response
}

export const LoadFitnessInfo = async (userId) => {


    let loadFitnessUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/load-fitness.php';
    let userInfo;

    await fetch(loadFitnessUrl, {
            method: 'POST',
            body: JSON.stringify(userId)

        }).then(response => response.json())
            .then (response => {
                      userInfo = response;    
                                 
            })
                .catch(error => console.log(error));

            if (userInfo !== null) {
               
                return userInfo;
            }

            return false;


}