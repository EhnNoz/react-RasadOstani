import StateCard from '../components/StateCard'
import MapChart from '../components/charts/MapChart'
import LineCharts from '../components/charts/LineCharts'
import { Box } from '@mui/material'
import { Grid } from '@mui/system'  // یا از @mui/material بسته به نسخه‌ات
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../service/handleToken'
import TopHashtags from '../components/TopHashtags'

function MainPage() {
  const [searchParams] = useSearchParams()

  const { data } = useQuery({
    queryKey: [searchParams.toString(), 'dataChartTopMember'],
    queryFn: async () => {
      const response = await api.get('/posts/statistics', { params: Object.fromEntries(searchParams) });
      return response.data;
    },
    refetchOnWindowFocus: false,
    retryDelay: 50,
  });

  return (
    <Box
      sx={{
        direction: "rtl",
        width: "100%",
        px: { xs: 1, sm: 2, md: 4, lg: 8, xl: 14 },
        mt: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <StateCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <MapChart />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <TopHashtags top_hashtags={data?.top_hashtags || []} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <LineCharts
            type="areaspline"
            data={data?.daily_trend}
            height={360}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainPage
