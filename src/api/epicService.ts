import axios from 'axios';
import type { EpicGame } from '../types/epic';

export const fetchFreeGames = async (): Promise<EpicGame[]> => {
  try {
    const response = await axios.get('/api/get-games');
    return response.data.data.Catalog.searchStore.elements;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};