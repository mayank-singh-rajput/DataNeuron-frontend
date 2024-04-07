import axios from 'axios';
import { toast } from 'react-toastify';

let url = 'https://dataneuron-backend-byla.onrender.com';

export const createMark = async (body) => {
  try {
    return await axios.post(`${url}/marks`, body);
  } catch (error) {
    console.log('error in create mark api');
    toast.error("Something Wents Wrong!")
  }
};

export const getMark = async (email) => {
    try {
      return await axios.get(`${url}/marks`, {        
        params: { email: email },
    });
    } catch (error) {
      console.log('error in fetch mark api');
      toast.error("Something Wents Wrong!")
    }
};