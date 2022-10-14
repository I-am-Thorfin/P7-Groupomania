import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { getItem, addItem, removeItem } from './LocaleStorage'




export function hasAuthenticated() {
    const token = getItem('key_token');
    const result = token ? tokenIsValid(token) : false;
    console.log ("//result from hasAthenticated //")
    console.log (result)
    console.log ("//result from hasAthenticated END//")
    return result;    
}

export function login(credentials) {
    return axios
    .post('http://localhost:8000/api/auth/login', credentials)
    
    .then(reponse => reponse.data.token
         )
    .then(token => { addItem('key_token', token);
    return true;
    }
  )
}

export function logout() {
    removeItem ('key_token')
   
}

function tokenIsValid (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
        return true;
    }

    return false;
}

export function createNewUser(credentials) {
    return axios
    .post('http://localhost:8000/api/auth/signup', credentials)
    .then( console.log("Compte Créé"))
}

export function getOneUser(userid) {
    const token = getItem('key_token');
   
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .get(`http://localhost:8000/api/auth/${userid}`, config)
    .then(response => { const getUserID = response.data
        console.log(getUserID)
        return getUserID
     })
    .then( console.log("check user")
    
    )
}

export function controlAdmin() {
    const token = getItem('key_token');
    const result = token ? tokenIsAdmin(token) : false;
    console.log ("//result from ControlAdmin//")
    console.log (result)
    console.log ("//result from ControlAdmin END //")
    return result;   
}

function tokenIsAdmin (token) {
    const { isAdmin } = jwtDecode(token);
    if (isAdmin === true) {
        return true;
    }
    return false;
}



export function userIdFromToken () {

    if (localStorage.getItem("key_token") !== null) {
    const token = getItem('key_token');
    const { userId } = jwtDecode(token)
    console.log ("//result from userIdfromtoken//")
    console.log(userId)
    console.log ("//result from userIdfromtoken END //")
    return userId   
    }
    return ""  
}


export function userLastNameFromToken () {

    if (localStorage.getItem("key_token") !== null) {
    const token = getItem('key_token');
    const { lastname } = jwtDecode(token)
    console.log ("//result from userlastnamefromtoken//")
    console.log(lastname)
    console.log ("//result from userlastnamefromtoken END //")
    return lastname   
    }
    return ""  
}

export function userFirstNameFromToken () {

    if (localStorage.getItem("key_token") !== null) {
    const token = getItem('key_token');
    const { firstname } = jwtDecode(token)
    console.log ("//result from userfirstnamefromtoken//")
    console.log(firstname)
    console.log ("//result from userfirstnamefromtoken END //")
    return firstname   
    }
    return ""  
}




export function createNewComment(Statedecreationdecommentaire) {
    const token = getItem('key_token');
    
    const config = {
        headers : { Authorization: `Bearer ${token}`}
    };

    return axios
    .post(`http://localhost:8000/api/comments`, Statedecreationdecommentaire, config)
    
    .then(response => console.log(response.data)
        )
    .then( console.log("Commentaire posté")
    )
    .catch(error => console.log(error));

}



