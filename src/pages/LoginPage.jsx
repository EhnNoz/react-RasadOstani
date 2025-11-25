import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../service/handleToken";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const LoginSchema = z.object({
    username: z.string().min(1, "نام کاربری الزامی است"),
    password: z.string().min(1, "رمز عبور الزامی است"),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const persianContent = {
        title: "سامانه جامع فراداده",
        description: "این سامانه، کلان داده شبکه‌های اجتماعی پیرامون استان‌ها را جمع‌آوری، پردازش و تحلیل کند. این سامانه با استفاده از روش‌های داده‌کاوی، یادگیری ماشین و پردازش زبان طبیعی آخرین اخبار و کنش‌ها،  اخبار جریان ساز، اخبار امید آفرین، چهره‌های جریان‌ساز استانی ، میزان انتشار و مصرف پیرامون استان، هیت مپ موضوعات مختلف استانی در طول هفته، ابر عبارات و فراوانی گروه‌ها و جریانات را در هر استان نشان می‌دهد.",
        explanation1: "با این سامانه می‌توان به تصویر کاملی از روند اخبار، وقایع و رویدادها، موضوعات مطرح شده، ترندها و رویکرد کاربران نسبت موضوعات مختلف در هر استان وکمک به برنامه سازی، طراحی نگاشت اقدام و طراحی عملیات  رسانه‌ای در صداوسیمای استان‌ها دست پیدا کرد.",
        explanation2: "شماره پشتیبانی: ۲۹۱۵۵۰۰۱-۰۲۱",
        username: "نام کاربری",
        password: "گذرواژه",
        login: "ورود",
        loggingIn: "در حال ورود...",
        loginError: "خطا در ورود",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            // کاربر توکن داره، پس مستقیم میریم صفحه اصلی
            navigate("/", { replace: true });
        }
    }, [navigate]);
    const loginMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axios.post("http://10.32.213.11:8000/api/token/", formData);
            return res.data;
        },
        onSuccess: async (data) => {
            try {
                api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                navigate("/");
            } catch {
                toastNotif("ورود نامعتبر: توکن صحیح نیست", "error");
            }
        },
        onError: (err) => {

            const status = err?.response?.status;
            if (status === 400 || status === 401) {
                toastNotif("نام کاربری یا رمز عبور اشتباه است", "error");
            } else {
                toastNotif("خطا در ارتباط با سرور", "error");
            }
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };
    console.log(loginMutation)
    if (isCheckingAuth) return null;

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                bgcolor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div dir="rtl" className="flex flex-col lg:flex-row-reverse w-full min-h-screen  overflow-hidden font-YekanBakh_Regular">

                {/* -------------------------------------------------------------------------------- */}
                {/* ستون اول: فرم ورود (سمت چپ تصویر) */}
                <div className="w-full lg:w-2/5 xl:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
                    <div className="w-full max-w-sm flex flex-col items-center justify-center">

                        {/* لوگوی برنامه: دقیقاً مطابق با تصویر */}
                        <div className="mb-10 p-6">
                            <div className="relative w-16 h-16">
                                <div className="absolute top-0 left-0 w-8 h-8 bg-[#b8a0f9] rotate-45 transform origin-top-left"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#8c67c5] rotate-45 transform origin-bottom-right"></div>
                                <div className="absolute top-2 right-2 w-8 h-8 bg-[#5c4091] rotate-45 transform origin-top-right"></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">

                            {/* فیلد نام کاربری */}
                            {/* فیلد نام کاربری */}
                            <div className="relative flex items-center rounded-sm">
                                <div className="absolute right-2 text-gray-400 text-xl">
                                    <span><PersonOutlineIcon /></span>
                                </div>

                                <input
                                    placeholder={persianContent.username}
                                    type="text"
                                    dir="rtl"
                                    {...register("username", { required: "نام کاربری الزامی است" })}
                                    className="w-full pr-10 pl-4 h-14 rounded-lg text-base text-gray-800 placeholder:text-gray-400 bg-[#f9f9fb] font-YekanBakh_Regular focus:outline-none focus:ring-1 focus:ring-[#8c67c5]"
                                />
                            </div>
                            {errors.username && (
                                <span className="text-red-400 text-xs font-YekanBakh_Regular mt-[-10px] text-right">
                                    {errors.username.message}
                                </span>
                            )}

                            {/* فیلد گذرواژه */}
                            <div className="relative flex items-center rounded-sm">
                                <div className="absolute text-gray-400 right-2 text-xl">
                                    <span><LockOutlinedIcon /></span>
                                </div>

                                <input
                                    placeholder={persianContent.password}
                                    type="password"
                                    dir="rtl"
                                    {...register("password", { required: "گذرواژه الزامی است" })}
                                    className="w-full pr-10 pl-4 h-14 text-base rounded-lg text-gray-800 placeholder:text-gray-400  bg-[#f9f9fb] font-YekanBakh_Regular focus:outline-none focus:ring-1 focus:ring-[#8c67c5]"
                                />
                            </div>
                            {errors.password && (
                                <span className="text-red-400 text-xs font-YekanBakh_Regular mt-[-10px] text-right">
                                    {errors.password.message}
                                </span>
                            )}


                            {/* دکمه ورود */}
                            <button
                                type="submit"
                                // رنگ بنفش دکمه
                                className="bg-blue-400  rounded-[200px] flex items-center gap-x-2 justify-center text-white text-lg font-YekanBakh_Bold py-2.5 ] mt-3 hover:bg-[#7a5bb9] transition disabled:opacity-50"
                                disabled={loginMutation?.isPending}
                            >
                                {loginMutation?.isPending && (
                                    <CircularProgress size={20} color="inherit" />
                                )}
                                {loginMutation?.isPending ? persianContent.loggingIn : persianContent.login}
                            </button>

                            {/* پیام خطا */}
                            {loginMutation?.isError && (
                                <Typography color="error" textAlign="center" className="text-sm mt-3 font-YekanBakh_Regular text-red-400">
                                    {persianContent.loginError}
                                </Typography>
                            )}
                        </form>
                    </div>
                </div>

                {/* -------------------------------------------------------------------------------- */}
                {/* ستون دوم: توضیحات برنامه (بخش بنفش، سمت راست تصویر) */}
                <div dir="rtl" className="relative w-full lg:w-3/5 xl:w-1/2 p-12 flex items-center justify-start text-white order-1 lg:order-2">

                    {/* شکل پس‌زمینه بنفش منحنی (تضمین نمایش در سمت چپ این ستون - سمت راست صفحه) */}
                    <div className="hidden md:block absolute inset-0 overflow-hidden">
                        <svg width="708" height="1024" viewBox="0 0 708 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M49.9011 42.9781C51.5546 45.4696 50.8932 40.362 35.0195 0H708V1024H35.0195C35.0195 1024 -9.02435 917.5 13.6077 830.5C58.4527 658.111 125.835 683.945 114.388 506.394C107.851 405.017 6.98315 381.657 0.295044 280.292C-5.32495 195.115 71.3691 154.755 56.5146 71.0073C54.5445 59.8997 49.9011 42.9781 49.9011 42.9781Z" fill="url(#paint0_linear_521_546)" />
                            <defs>
                                <linearGradient id="paint0_linear_521_546" x1="268.732" y1="0" x2="268.732" y2="1024" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#BCA5E6" />
                                    <stop offset="1" stop-color="#472383" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>


                    {/* محتوای متنی */}
                    <div className="relative z-10 max-w-lg">
                        <h1 className="text-3xl font-YekanBakh_Black mb-6">
                            {persianContent.title}
                        </h1>
                        <p className="text-lg mb-4 leading-8">
                            {persianContent.description}
                        </p>
                        <p className="text-lg mb-4 leading-7 text-gray-200">
                            {persianContent.explanation1}
                        </p>
                        <p className="text-sm leading-7 text-gray-200">
                            {persianContent.explanation2}
                        </p>
                    </div>
                </div>

            </div>
        </Box>
    );
};

export default LoginPage;
