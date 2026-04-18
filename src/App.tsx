import { useEffect, useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  ThemeProvider, 
  CssBaseline, 
  useMediaQuery,
  Grid
} from '@mui/material';
import GameCard from './modules/UI/Card/GameCard';
import { fetchFreeGames } from './services/epicService';
import { getAppTheme } from './theme';
import type { EpicGame } from './types/epic';

function App() {
  const [games, setGames] = useState<EpicGame[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => getAppTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFreeGames();
        const filtered = data.filter(game => game.promotions);
        const sorted = filtered.sort((a, b) => {
          const now = new Date().getTime();
          const getInfo = (game: EpicGame) => {
            const active = game.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0];
            const upcoming = game.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0];
            const isActive = active && new Date(active.startDate).getTime() <= now;
            const date = isActive ? new Date(active.endDate).getTime() : (upcoming ? new Date(upcoming.startDate).getTime() : Infinity);
            
            return { isActive, date };
          };
          const infoA = getInfo(a);
          const infoB = getInfo(b);
          if (infoA.isActive && !infoB.isActive) return -1;
          if (!infoA.isActive && infoB.isActive) return 1;
          return infoA.date - infoB.date;
        });
        setGames(sorted);
      } catch (e) {
        console.error("Помилка:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 6 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          Epic Free Games
        </Typography>

       <Grid container spacing={3}>
          {games.map((game) => {
            const activeOffer = game.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0];
            const upcomingOffer = game.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0];
            const isUpcoming = !activeOffer;
            const dateStr = activeOffer ? activeOffer.endDate : upcomingOffer?.startDate;
            if (!dateStr) return null;
            const image = game.keyImages.find(img => img.type === 'OfferImageWide')?.url || '';
            const slug = game.catalogNs.mappings?.[0]?.pageSlug || game.productSlug || game.urlSlug;
            const url = `https://store.epicgames.com/p/${slug}`;
            return (
              <Grid key={game.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <GameCard 
                  title={game.title}
                  description={game.description}
                  image={image}
                  url={url}
                  dateText={dateStr}
                  isUpcoming={isUpcoming}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;