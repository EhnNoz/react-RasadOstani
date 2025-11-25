import { Button, CircularProgress, Grid } from '@mui/material'
import PieChart from '../components/charts/PieChart'
import BarCharts from '../components/charts/BarCharts'
import AbrEbarat from '../components/charts/AbrEbarat'
import HeatChart from '../components/charts/HeatChart'
import { api } from '../service/handleToken'
import { useQuery } from '@tanstack/react-query'
import {  useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import Stats from '../components/Stats'
import PaperCharts from '../components/charts/PaperCharts'
import ChartLoader from '../components/charts/ChartLoader'
import LineCharts from '../components/charts/LineCharts'
import NewsTabs from '../components/NewsTabs'
import EmblaCarousel from '../components/Slider/EmblaCarousel'

function AbalysisPage() {

 
  const [searchParams] = useSearchParams()
  const [showContent, setShowContent] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [searchParams.toString(), 'advanced_analytics'],
    queryFn: async () => {
      const params = Object.fromEntries(searchParams.entries())
      const res = await api.get('/advanced-analytics/', { params })
      return res.data
    },
    refetchOnWindowFocus: false,
    retryDelay: 50
  })

  const { data: statisticsData } = useQuery({
    queryKey: [searchParams.toString(), 'statisticsData'],
    queryFn: async () => {
      const params = Object.fromEntries(searchParams.entries())
      const res = await api.get('/posts/statistics/', { params })
      return res.data
    }
  })

  useEffect(() => {
    if (isLoading) setShowContent(false)
    else {
      const timer = setTimeout(() => setShowContent(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!showContent)
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <CircularProgress />
      </div>
    )

  return (
    <Grid container spacing={2} sx={{ px: { xs: 1, sm: 2, md: 4, lg: 8 }, mt: 2 }}>

      {/* Filters */}
      <Grid item size={{ xs: 12 }}>
        <Filters />
      </Grid>

      {/* Stats */}
      <Grid item size={{ xs: 12 }}>
        <Stats data={data?.overall_stats} />
      </Grid>

      {/* Charts Section */}
      <Grid container item size={{ xs: 12 }} spacing={2}>

        {/* BarCharts + LineCharts */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="صفحات فعال" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <BarCharts height={350} data={data?.active_users} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="روند انتشار روزانه" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <LineCharts height={350} data={statisticsData?.daily_trend} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* 3 Pie Charts */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <PaperCharts title="احساسات" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <PieChart height={200} center={['55%', '30%']} data={data?.sentiment_distribution} />
              </ChartLoader>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <PaperCharts title="گروه‌های فعال" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <PieChart height={200} center={['55%', '30%']} data={data?.user_groups_distribution} />
              </ChartLoader>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <PaperCharts title="جریان سیاسی" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <PieChart height={200} center={['55%', '30%']} data={data?.political_currents_distribution} />
              </ChartLoader>
            }
          />
        </Grid>

        {/* View Trend */}
        <Grid item size={{ xs: 12 }}>
          <PaperCharts title="روند بازدید" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <LineCharts height={350} type="areaspline" data={statisticsData?.view_trend} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Keyword Cloud + Heatmap */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="ابر واژگان" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <AbrEbarat height={350} data={data?.top_hashtags} />
              </ChartLoader>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="فراوانی موضوعات" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <HeatChart height={350} data={data?.topics_heatmap} />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Like Trend */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="روند لایک" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <LineCharts height={350} data={statisticsData?.like_trend} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Top liked */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="صفحات با بیشترین لایک" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <BarCharts height={350} data={data?.top_users_by_likes} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Top viewed */}
        <Grid item size={{ xs: 12 }}>
          <PaperCharts title="صفحات با بیشترین بازدید" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <BarCharts height={350} data={data?.top_users_by_views} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Programs */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="پرنشرترین برنامه" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <BarCharts height={350} data={data?.active_tv_programs} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <PaperCharts title="پربازدیدترین برنامه" backgroundTitle="#b182e3"
            chart={
              <ChartLoader loading={isLoading}>
                <BarCharts height={350} data={data?.top_viewed_tv_programs} color="#b182e3" />
              </ChartLoader>
            }
          />
        </Grid>

        {/* Slider */}
        <Grid item size={{ xs: 12 }}>
          <EmblaCarousel />
        </Grid>

        {/* News */}
        <Grid item size={{ xs: 12 }}>
          <NewsTabs />
        </Grid>

      </Grid>
    </Grid>
  )
}

export default AbalysisPage
