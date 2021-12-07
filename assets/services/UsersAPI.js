import axios from "axios";


function findAll(){
     return axios
     .get("https://127.0.0.1:8000/api/users")
     .then((response) => response.data["hydra:member"])
    
}

function find(id){
    return axios
    .get("https://127.0.0.1:8000/api/users/"+id)
    .then((response) => response.data);
}

function update(id, customer) {
    return axios
    .put("https://127.0.0.1:8000/api/users/"+id,customer);
}

function deleteUser(id){
    return axios.delete("https://127.0.0.1:8000/api/users/"+id) ; 
}


export default {
    findAll,
    find,
    update,
    delete: deleteUser,
  
}