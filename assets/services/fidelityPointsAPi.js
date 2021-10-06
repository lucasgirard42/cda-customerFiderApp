import axios from "axios";


function findAll(){
     return axios
     .get("https://127.0.0.1:8000/api/fidelity_points")
     .then((response) => response.data["hydra:member"])
}

function deleteFidelityPoint(id){
    return axios.delete("https://127.0.0.1:8000/api/fidelity_points/"+id) ; 
}

export default {
    findAll,
    delete: deleteFidelityPoint
}