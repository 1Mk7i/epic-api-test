import apiClient from './apiClient';
import type { EpicGame } from '../types/epic';

const PROXY = 'https://corsproxy.io/?';
const EPIC_URL = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=uk-UA&country=UA&allowCountries=UA';

export const fetchFreeGames = async (): Promise<EpicGame[]> => {
  try {
    const response = await apiClient.get(`${PROXY}${encodeURIComponent(EPIC_URL)}`);
    
    return response.data.data.Catalog.searchStore.elements;
  } catch (error) {
    console.error("Помилка при отриманні ігор:", error);
    throw error;
  }
};