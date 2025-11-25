import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import DialogSetting from '../components/DialogSetting';
import { useState } from 'react';
const colors = {
    blue: "#4f77ff",
    purple: "#9b59b6",
    pink: "#e76c90",
    green: "#54b882",
};

function Topbar() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login')
    };
    const handleOpenSetting = () => {
        setOpen(true)
    }
    const handleAmar = () => { navigate('/analysis') }
    const handleMain = () => { navigate('/') }
    const handleChehre = () => { navigate('/chehreostani') }
    return (
        <>
            <DialogSetting open={open} setOpen={setOpen} />
            <AppBar
                position="static"
                sx={{
                    justifyContent: 'space-between',
                    bgcolor: "#fff",
                    height: '51px',
                    boxShadow: "none",
                    borderBottom: "1px solid #eee",
                    fontFamily: 'YekanBakh_Regular, Arial, sans-serif', // فونت اینجا ست شده
                }}
            >
                <Toolbar
                    sx={{
                        maxWidth: 1850,
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: 'YekanBakh_Regular, Arial, sans-serif', // فونت اینجا هم اضافه کن برای اطمینان
                    }}
                >
                    {/* منو سمت چپ */}
                    <div>
                        <Box sx={{ display: "flex", gap: 1, ml: 15, fontFamily: 'YekanBakh_Regular, Arial, sans-serif' }}>
                            {[

                                { label: "خروج", icon: <ExitToAppIcon sx={{ fontSize: 17, fontFamily: 'YekanBakh_Regular' }} />, onClick: handleLogout, },
                                { label: "تنظیمات", icon: <AccountCircleOutlinedIcon sx={{ fontSize: 17, fontFamily: 'YekanBakh_Regular' }} />, onClick: handleOpenSetting, },
                                { label: "آمار و نمودار", icon: <BarChartIcon sx={{ fontSize: 17, fontFamily: 'YekanBakh_Regular' }} />, onClick: handleAmar, },
                                { label: "چهره ها", icon: <PersonIcon sx={{ fontSize: 17, fontFamily: 'YekanBakh_Regular' }} />, onClick: handleChehre, },
                                { label: "صفحه اصلی", icon: <HomeIcon sx={{ fontSize: 17, fontFamily: 'YekanBakh_Regular' }} />, onClick: handleMain, },
                            ].map((item) => (
                                <Button
                                    onClick={item.onClick}
                                    key={item.label}
                                    sx={{
                                        color: "#555",
                                        fontWeight: 500,
                                        fontSize: "0.9rem",
                                        textTransform: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        fontFamily: 'YekanBakh_Regular, Arial, sans-serif',
                                        "&:hover": { bgcolor: "transparent", color: colors.blue },
                                    }}
                                >
                                    {item.icon}
                                    <Box component="span" sx={{ ml: 0.7 }}>
                                        {item.label}
                                    </Box>
                                </Button>
                            ))}
                        </Box>
                    </div>

                    {/* لوگو سمت راست */}
                    <div>
                        <Typography
                            sx={{
                                mr: 2,
                                fontWeight: "bold",
                                color: "#333",
                                fontFamily: 'YekanBakh_Regular, Arial, sans-serif',
                            }}
                            variant="h6"
                        >
                            LOGO
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Topbar
