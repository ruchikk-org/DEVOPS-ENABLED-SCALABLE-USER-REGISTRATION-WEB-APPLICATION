import axios from "axios";


const api = axios.create({

    baseURL:"https://backendd-ezczetc0emgjd5bg.centralus-01.azurewebsites.net"

});


api.interceptors.request.use(
(config)=>{

const token = localStorage.getItem("token");

if(token){

config.headers.Authorization=`Bearer ${token}`;

}

return config;

});


export default api;