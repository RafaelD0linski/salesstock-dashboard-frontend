import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // mesmo endereço que aparece no terminal do .NET
});

export default api;
