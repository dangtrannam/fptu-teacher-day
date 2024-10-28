import axios from 'axios';
import { WISH_ENDPOINT } from './apiConfig';

const getUploadData = async () => {
  try {
    const token = localStorage.getItem('fptuTeacherDayToken');
    const response = await axios.get(WISH_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upload data:', error);
    throw error;
  }
};

export default getUploadData;