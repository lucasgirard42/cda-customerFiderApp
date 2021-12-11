import axios from "axios";
import { FIDELITY_POINTS_API } from "../config";


function findAll() {
  return axios
    .get( FIDELITY_POINTS_API )
    .then((response) => response.data["hydra:member"]);
}

function find(id) {
  return axios
    .get( FIDELITY_POINTS_API + "/" + id)
    .then((response) => response.data);
}

function create(fidelityPoint) {
  return axios.post( FIDELITY_POINTS_API , {
    ...fidelityPoint,
    customer: `/api/customers/${fidelityPoint.customer}`,
  });
}
 
function update(id, fidelityPoint) {
  // console.log(fidelityPoint.customer,'ddd');
  return axios.put( FIDELITY_POINTS_API + "/" + id,
  {
    ...fidelityPoint,
    customer: `/api/customers/${fidelityPoint.customer}`,
  }
  );
}

function deleteFidelityPoint(id) {
  return axios.delete( FIDELITY_POINTS_API + "/" + id);
}

export default {
  findAll,
  find,
  create,
  update,
  delete: deleteFidelityPoint,
};
