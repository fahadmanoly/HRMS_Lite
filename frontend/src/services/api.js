// // import axios from 'axios';

// // const API = axios.create({
// //     baseURL: 'http://127.0.0.1:8000/api/',
// // });

// // export const getEmployees = () => API.get('employees/');


// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'https://hrms-lite-lf5q.onrender.com/api/',
// });

// export const getEmployees = () => API.get('employees/');

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/';

const API = axios.create({
    baseURL: BASE_URL,
});

export const getEmployees = () => API.get('employees/');