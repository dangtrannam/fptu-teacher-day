import axios from 'axios';
import { WISH_ENDPOINT, IMAGE_ENDPOINT } from './apiConfig';

export const getUploadData = async () => {
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

export const postWishData = async (wishData) => {
  try {

    const formData = new FormData();
    formData.append('image', wishData.image);
    formData.append('name', wishData.name);
    formData.append('schoolName', wishData.schoolName);
    formData.append('userInput', wishData.userInput);

    const response = await axios.post(WISH_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
  catch (error) {
    console.error('Error posting wish data:', error);
    throw error;
  }
}

export const getImageData = async (imageUrl) => {
  try {
    const response = await axios.get(`${IMAGE_ENDPOINT}/${imageUrl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
};
