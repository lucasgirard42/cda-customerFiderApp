import axios from "axios";
import {CUSTOMERS_API} from "../config";


function findAll(){
     return axios
     .get(CUSTOMERS_API)
     .then((response) => response.data["hydra:member"])
}

function create(customer){
    return axios
    .post(CUSTOMERS_API,customer)
}

function find(id){
    return axios
    .get( CUSTOMERS_API+"/"+id)
    .then((response) => response.data);
}

function update(id, customer){
    return axios
    .put( CUSTOMERS_API+"/"+ id,customer);
}

function deleteCustomer(id){
    return axios.delete( CUSTOMERS_API+"/"+id+"/fidelity_points") ; 
}

export default {
    findAll,
    create,
    find,
    update,
    delete: deleteCustomer
}