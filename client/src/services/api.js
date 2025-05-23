import axios from 'axios';

   const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });

   // Add token to requests
   API.interceptors.request.use((req) => {
     const token = localStorage.getItem('token');
     if (token) {
       req.headers.Authorization = `Bearer ${token}`;
     }
     return req;
   });

   // Handle 401 errors
   API.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         localStorage.removeItem('token');
         window.location.href = '/';
       }
       return Promise.reject(error);
     }
   );

   export const signup = (data) => API.post('/signup', data);
   export const login = (data) => API.post('/login', data);
   export const getUsers = () => API.get('/');
   export const createUser = (data) => API.post('/', data);
   export const updateUser = (id, data) => API.put(`/${id}`, data);
   export const deleteUser = (id) => API.delete(`/${id}`);

   export default API;