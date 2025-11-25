import { Button, Grid } from '@mui/material'

import PieChart from '../components/charts/PieChart'
import BarCharts from '../components/charts/BarCharts'
import AbrEbarat from '../components/charts/AbrEbarat'
import HeatChart from '../components/charts/HeatChart'
import { api } from '../service/handleToken';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Filters from './Filters';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stats from './Stats';
import PaperCharts from './charts/PaperCharts'
import ChartLoader from './charts/ChartLoader'
import { useEffect, useState } from 'react';
import NewsTabs from './NewsTabs'
import { useLocation } from 'react-router-dom';
import LineCharts from './charts/LineCharts'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ChartAnalysis() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [ready, setReady] = useState(false);

    // فقط وقتی state اومد، پارامتر رو اضافه کن
    useEffect(() => {
        if (state && state.province) {
            const params = new URLSearchParams(searchParams);
            if (!params.has('province')) {
                params.set('province', state.province);
                setSearchParams(params);
                setReady(false);  // وقتی پارامتر رو ست کردی، آماده نیستی هنوز
            } else {
                setReady(true);
            }
        } else {
            setReady(true);
        }
    }, [state, searchParams]);

    
    // useQuery فقط وقتی اجرا بشه که پارامتر ست شده
    const { data, isLoading } = useQuery({

        queryKey: [searchParams.toString(), 'advanced_analytics'],
        queryFn: async () => {
            const finalParams = Object.fromEntries(searchParams.entries());
            const response = await api.get('/advanced-analytics/', { params: finalParams });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });

    const { data: statisticsData, isLoading: loadingStatistics } = useQuery({

        queryKey: [searchParams.toString(), 'statisticsData'],
        queryFn: async () => {
            const finalParams = Object.fromEntries(searchParams.entries());
            const response = await api.get('/posts/statistics/', { params: finalParams });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });




    return (
        <Grid container className='mx-20'>
            <Grid item size={12} xs={12}  >
                <div className='flex  justify-between'>

                    <div>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/')}
                            sx={{ mb: 2, fontFamily: 'yekanBakh_Regular', color: '#b182e3' }}
                        >
                            بازگشت به صفحه ی اصلی  
                        </Button>
                    </div>
                    <div>
                        <Button
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => navigate('/ChehreOstani')}
                            sx={{ mb: 2, fontFamily: 'yekanBakh_Regular', color: '#b182e3' }}
                        >
                            چهره های استانی
                        </Button>

                    </div>
                </div>
            </Grid>
            <Grid size={12} >
                <Filters />
            </Grid>
            <Grid size={12} className='pt-4'>
                <Stats data={data?.overall_stats} />
            </Grid>
            {isLoading ?
                (
                    <>
                        <div className=''>

                        </div>
                    </>
                )
                :
                (
                    <>
                        <Grid container size={12}>
                            <Grid className='p-2' size={6}>
                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"کنشگران فعال"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <BarCharts height={350} data={data?.active_users} color={'#b182e3'} />
                                            </ChartLoader>
                                        </>
                                    }
                                />


                            </Grid>
                            <Grid className='p-2' size={6}>

                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"روند انتشار روزانه"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <LineCharts height={350} data={statisticsData?.daily_trend} color={'#b182e3'} />
                                            </ChartLoader>
                                        </>
                                    }
                                />
                            </Grid>

                            <Grid className='p-2' size={4}>
                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"احساسات"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <PieChart center={['55%', '30%']} height={200} data={data?.sentiment_distribution} />
                                            </ChartLoader>
                                        </>
                                    }
                                />
                            </Grid>

                            <Grid className='p-2' size={4}>
                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"گروهای فعال"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <PieChart center={['55%', '30%']} height={200} data={data?.user_groups_distribution} />
                                            </ChartLoader>
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid className='p-2 flex-col' size={4}>
                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"جریان سیاسی"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <PieChart center={['55%', '30%']} height={200} data={data?.political_currents_distribution} />
                                            </ChartLoader>
                                        </>
                                    }
                                />


                            </Grid>
                            <Grid className='p-2' size={12}>
                                <PaperCharts
                                    backgroundTitle={"#b182e3"}

                                    title={"روند بازدید"}
                                    chart={
                                        <>
                                            <ChartLoader loading={isLoading}>
                                                <LineCharts type={'areaspline'} height={350} data={statisticsData?.view_trend} color={'#b182e3'} />
                                            </ChartLoader>
                                        </>
                                    }
                                />

                            </Grid>
                            <Grid size={12} container>
                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"ابر واژگان"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <AbrEbarat height={350} data={data?.top_hashtags} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />




                                </Grid>
                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"فراوانی موضوعات"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <HeatChart height={350} data={data?.topics_heatmap} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />
                                </Grid>
                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"روند لایک"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <LineCharts height={350} data={statisticsData?.like_trend} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />



                                </Grid>
                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"کنشگران با بیشترین لایک"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <BarCharts height={350} data={data?.top_users_by_likes} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />



                                </Grid>
                                <Grid className='p-2' size={12}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"کنشگران با بیشترین بازدید"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <BarCharts height={350} data={data?.top_users_by_views} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />



                                </Grid>

                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"پرنشرترین برنامه"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <BarCharts height={350} data={data?.active_tv_programs} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />


                                </Grid>

                                <Grid className='p-2' size={6}>
                                    <PaperCharts
                                        backgroundTitle={"#b182e3"}

                                        title={"پربازدیدترین برنامه"}
                                        chart={
                                            <>
                                                <ChartLoader loading={isLoading}>
                                                    <BarCharts height={350} data={data?.top_viewed_tv_programs} color={'#b182e3'} />
                                                </ChartLoader>
                                            </>
                                        }
                                    />



                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid size={12}>
                            <NewsTabs />
                        </Grid>
                    </>
                )
            }

        </Grid>
    )
}

export default ChartAnalysis
