import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.32.213.11:8000/api",
});

// اینستنس جداگانه برای رفرش بدون اینترسپتور
const refreshApi = axios.create({
    baseURL: "http://10.32.213.11:8000/api",


});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;
        // اگر وضعیت 401 و هنوز رفرش نشده
        if (err.response?.status === 401 && !originalRequest._retry) {
            // جلوگیری از تلاش مجدد برای خود رفرش
            if (originalRequest.url.includes("/sapi/token/refresh/")) {
                console.error("تلاش برای رفرش اما خودش با 401 برگشت. نیاز به لاگین مجدد");
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
                return Promise.reject(err);
            }

            originalRequest._retry = true;
            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
                console.error("Refresh token موجود نیست، نیاز به لاگین مجدد");
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
                return Promise.reject(err);
            }

            try {
                const { data } = await refreshApi.post("/sapi/token/refresh/", { refresh });
                localStorage.setItem("access", data.access);
                api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
                originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
                return api(originalRequest); // فقط درخواست اصلی را دوباره بفرست
            } catch (refreshError) {
                console.error("رفرش توکن ناموفق بود:", refreshError);
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                // window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err);
    }
);
