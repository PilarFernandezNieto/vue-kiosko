import clienteAxios from "@/config/axios";

export default {
  registro(data) {
    return clienteAxios.post("/api/registro", data);
  },

  login(data) {
    return clienteAxios.post("/api/login", data);
  },
  logout(){
    return clienteAxios.post("/api/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
     }
    })
  },

  auth(){
    return clienteAxios.get('/api/user', {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    })
  },

};
