import axios from 'axios';
import { toast } from 'react-toastify';

// handle unexpected error globally
  axios.interceptors.response.use(null, err => {
    const expectedError = 
      err.response &&
      err.response.status >= 400 &&
      err.response.status < 500;

      if (!expectedError) {
        console.log('Logging unexpected error ', err);
        toast.error('An unexpected error occured.');
      }

      return Promise.reject(err);
  });

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default http;