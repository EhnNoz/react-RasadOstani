
import { Box, Typography, Chip, Paper } from '@mui/material';

export default function TopHashtags({ top_hashtags = [] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height  :350,
        borderRadius: 2,
        bgcolor: '#f9f9fb',
        direction: 'rtl',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // فاصله بین هر بلوک
        }}
      >
        {top_hashtags.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              
              bgcolor: '#fff',
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              p: 2,
            }}
          >
            {/* هشتگ اصلی */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color=""
              sx={{ mb: 1 ,  fontFamily : 'YekanBakh_Regular', }}
            >
              {item.hashtag}
            </Typography>

            {/* دسته‌بندی‌ها */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {item.channel_categories.map((cat, i) => (
                <Chip
                  key={i}
                  label={cat}
                  sx={{
                    fontFamily : 'YekanBakh_Regular',
                    bgcolor: '#f9f9fb',
                    color: '',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
