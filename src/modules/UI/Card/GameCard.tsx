import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  dateText: string;
  isUpcoming: boolean;
}

export default function GameCard({ title, description, image, url, dateText, isUpcoming }: GameCardProps) {
  const date = new Date(dateText).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component="a" href={url} target="_blank" sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="160"
            image={image || 'https://via.placeholder.com/400x225?text=Epic+Games'}
            alt={title}
          />
          <Chip 
            label={isUpcoming ? "Скоро" : "Безкоштовно"}
            color={isUpcoming ? "secondary" : "success"}
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              fontWeight: 'bold' 
            }} 
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 1 }}>
            📅 {isUpcoming ? `Доступно з: ${date}` : `Діє до: ${date}`}
          </Typography>
          
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              lineHeight: 1.2, 
              minHeight: '2.4em',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: '4.2em',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}