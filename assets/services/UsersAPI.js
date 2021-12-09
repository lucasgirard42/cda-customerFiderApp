import axios from "axios";
import { USERS_API } from "../config";


function findAll(){
     return axios
     .get( USERS_API )
     .then((response) => response.data["hydra:member"])
    
}

function find(id){
    return axios
    .get( USERS_API + "/" + id)
    .then((response) => response.data);
}

function update(id, customer) {
    return axios
    .put( USERS_API + "/" + id,customer);
}

function deleteUser(id){
    return axios.delete( USERS_API + "/" + id) ; 
}


export default {
    findAll,
    find,
    update,
    delete: deleteUser,
  
}