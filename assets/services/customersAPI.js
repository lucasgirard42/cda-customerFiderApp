import axios from "axios";


function findAll(){
     return axios
     .get("https://127.0.0.1:8000/api/customers")
     .then((response) => response.data["hydra:member"])
}

function create(customer){
    return axios
    .post("https://127.0.0.1:8000/api/customers",customer)
}

function find(id){
    return axios
    .get("https://127.0.0.1:8000/api/customers/"+id)
    .then((response) => response.data);
}

function update(id, customer){
    return axios
    .put("https://127.0.0.1:8000/api/customers/"+id,customer);
}

function deleteCustomer(id){
    return axios.delete("https://127.0.0.1:8000/api/customers/"+id+"/fidelity_points") ; 
}

export default {
    findAll,
    create,
    find,
    update,
    delete: deleteCustomer
}