import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { useSearchParams } from 'react-router-dom';
import { api } from '../service/handleToken';
import { useQuery } from '@tanstack/react-query';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

import useNum from '../customhooks/useNum';

const SCard = ({ title, value, icon: Icon, color }) => (
    <div className=''>
        <Card
    className=''
        sx={{
            boxShadow: 1,
            borderRadius: 3,
            height: 204,
            p: 2.5,
            textAlign: "right",
            direction: "rtl",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor : '#f9f9fb'
        }}
    >
        <CardContent sx={{ p: 0 }}>
            <Box sx={{fontFamily : "YekanBakh_Regular"}} display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                fontFamily='YekanBakh_Regular'
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="bold"
                    sx={{ fontSize: "1rem" }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        fontFamily: 'YekanBakh_Regular',
                        p: 1.2,
                        borderRadius: "50%",
                        color: color,
                        bgcolor: `${color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon sx={{ fontSize: 22 }} />
                </Box>
            </Box>

            <Typography
                variant="h4"
                component="div"
                sx={{
                    fontFamily : 'YekanBakh_Regular',
                    mt: 0.5,
                    fontWeight: "bold",
                    color: "#333",
                    lineHeight: 1.3,
                    fontSize: "1.9rem",
                }}
            >
                {value}
            </Typography>

            <Box
                sx={{
                    height: 4,
                    width: "70%",
                    bgcolor: color,
                    borderRadius: 2,
                    mt: 1.5,
                    opacity: 0.85,
                }}
            />
        </CardContent>
    </Card>
    </div>
);
const colors = {
    blue: "#4f77ff",
    purple: "#9b59b6",
    pink: "#e76c90",
    green: "#54b882",
};
function StateCard() {

    const [searchParams, setSearchParams] = useSearchParams({})
    const { data, isLoading } = useQuery({
        queryKey: [searchParams.toString(), 'dataChartTopMember'],
        queryFn: async () => {
            const response = await api.get('/posts/statistics/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },

        refetchOnWindowFocus: false,
        retryDelay: 50,
    });
    return (
        <Grid size={12}  container spacing={3}>
            <Grid item size={6}>
                <SCard
                    title="کاربران آنلاین"
                    value={useNum(data?.unique_users)}
                    icon={PersonOutlineIcon}
                    color={colors.blue}
                />
            </Grid>
            <Grid item size={6}>
                <SCard
                    title="بیشترین بازدید"
                   value={useNum(data?.total_views)}
                    icon={RemoveRedEyeOutlinedIcon}
                    color={colors.purple}
                />
            </Grid>
            <Grid item size={6}>
                <SCard
                    title="بیشترین لایک"
                   value={useNum(data?.total_likes)}
                    icon={FavoriteBorderOutlinedIcon}
                    color={colors.pink}
                />
            </Grid>
            <Grid item size={6}>
                <SCard
                    title="بیشترین دنبال‌کننده"
                    value={useNum(data?.total_posts)}
                    icon={SpaOutlinedIcon}
                    color={colors.green}
                />
            </Grid>
        </Grid>
    )
}

export default StateCard
