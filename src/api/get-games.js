import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=uk-UA&country=UA&allowCountries=UA');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch Epic Games data' });
  }
}