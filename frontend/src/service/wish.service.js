import axios from 'axios';
import { WISH_ENDPOINT, IMAGE_ENDPOINT } from './apiConfig';
import { getAuthHeaders } from '../constants/getAuthHeaders';

export const getUploadData = async ({
  page = 1,
  limit = 10,
  search = '',
  startDate,
  endDate }) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      search,
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {})
    });

    const response = await axios.get(`${WISH_ENDPOINT}?${params.toString()}`, {
      headers: getAuthHeaders()
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
