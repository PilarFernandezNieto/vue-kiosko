import clienteAxios from "@/config/axios";

export default {
  registro(data) {
    return clienteAxios.post("/api/registro", data);
  },

  login(data) {
    return clienteAxios.post("/api/login", data);
  },

  auth(){
    return clienteAxios.get('/api/user', {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    })
  }
};
