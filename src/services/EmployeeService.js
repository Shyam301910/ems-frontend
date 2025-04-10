import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => axios.get(REST_API_URL);

export const createEmployee = (employee) => axios.post(REST_API_URL+"/create", employee);

export const updateEmployee = (employee) => axios.put(REST_API_URL+"/update", employee);

export const deleteEmployee = (id) => axios.delete(REST_API_URL+"/delete/"+id);