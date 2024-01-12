import axios from "axios";



const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});



axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`,
      req.headers.Accept = 'application/json'
  }
  return req;
});


export async function get(url) {
  return await axiosApi.get(url).then(response => response.data);
}

export async function post(url, data) {
  return axiosApi
    .post(url, { ...data })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}


export async function update(url,config = {}) {
  return axiosApi
          .put(url, {...config })
          .then(response => response);
}



export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}

