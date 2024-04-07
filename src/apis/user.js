import axios from 'axios';
import { toast } from 'react-toastify';

let url = 'https://dataneuron-backend-byla.onrender.com';

export const createUser = async (body) => {
  try {
    return await axios.post(`${url}/user`, body);
  } catch (error) {
    console.log('error in create user api');
    toast.error("Something Wents Wrong!")
  }
};

export const getUser = async (email) => {
    try {
      return await axios.post(`${url}/user`, {        
        params: { email: email },
    });
    } catch (error) {
      console.log('error in fetch user api');
      toast.error("Something Wents Wrong!")
    }
};