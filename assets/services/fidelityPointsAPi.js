import axios from "axios";

function findAll() {
  return axios
    .get("https://127.0.0.1:8000/api/fidelity_points")
    .then((response) => response.data["hydra:member"]);
}

function find(id) {
  return axios
    .get("https://127.0.0.1:8000/api/fidelity_points/" + id)
    .then((response) => response.data);
}

function create(fidelityPoint) {
  return axios.post("https://127.0.0.1:8000/api/fidelity_points", {
    ...fidelityPoint,
    customer: `/api/customers/${fidelityPoint.customer}`,
  });
}

function update(id, fidelityPoint) {
  return axios.put("https://127.0.0.1:8000/api/fidelity_points/" + id, {
    ...fidelityPoint,
    customer: `/api/customers/${fidelityPoint.customer}`,
  });
}

function deleteFidelityPoint(id) {
  return axios.delete("https://127.0.0.1:8000/api/fidelity_points/" + id);
}

export default {
  findAll,
  find,
  create,
  update,
  delete: deleteFidelityPoint,
};
