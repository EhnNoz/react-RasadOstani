// src/components/NewsColumns.jsx
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/handleToken";
import { useSearchParams } from "react-router-dom";

const API_URL = "/posts/";

const fetchPosts = async (params) => {
    const { data } = await api.get(API_URL, { params });
    return data;
};

export default function NewsColumns() {

    const [searchParams] = useSearchParams();
  
    const queryParams = Object.fromEntries(searchParams.entries());
    // یک تابع کمکی برای اضافه کردن province به queryParams هر ستون


    return (
        <div dir="rtl" className="  p-2">
            <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
                <NewsColumn
                    title="مثبت‌نما"
                    queryKey={["positive", queryParams]}
                    queryParams={{ ...queryParams, news_type: 1 }}
                />
                <NewsColumn
                    title="پست های پربازدید"
                    queryKey={["truthful", queryParams]}
                    queryParams={{ ...queryParams, sort_by: "views" }}
                />
                <NewsColumn
                    title="آخرین پست"
                    queryKey={["topPosts", queryParams]}
                    queryParams={{ ...queryParams, sort_by: "newest" }}
                />
                <NewsColumn
                    title="مرتبط با رسانه ملی"
                    queryKey={["sedaPost", queryParams]}
                    queryParams={{ ...queryParams, news_type: 3 }}
                />
            </div>
        </div>
    );
}

function NewsColumn({ title, queryKey, queryParams }) {
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: () => fetchPosts(queryParams),
    });

    return (
        <div className="  flex justify-center  flex flex-col h-[500px]">
            <h2 className="text-center font-bold text-lg text-gray-800 mb-4  ">
                {title}
            </h2>

            {isLoading && (
                <div className="text-center text-sm text-gray-500 mt-8">در حال بارگذاری...</div>
            )}
            {error && (
                <div className="text-center text-red-500 mt-8">خطا در دریافت داده‌ها</div>
            )}

            <div className="flex no-scrollbar  bg-gray-100 rounded-xl pt-1 flex-col gap-1 flex-grow overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                {data?.map((item) => (
                    <div
                        key={item.id}
                        className=" no-scrollbar rounded-xl p-1  transition-all duration-300 h-[180px] flex flex-col justify-between"
                    >
                        <div>
                            {/* عنوان کانال */}
                            <h3 className=" text-gray-800 mb-1 font-YekanBakh_Bold ">
                                {item.channel_name_fa || "بدون عنوان"}
                            </h3>

                            {/* متن پست با اسکرول داخلی */}
                            <p className="text-gray-600 no-scrollbar text-xs  leading-5 overflow-y-auto max-h-[80px] pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                                {item.description && item.description.trim() !== ""
                                    ? item.description
                                    : "بدون توضیحات"}
                            </p>
                        </div>

                        {/* اطلاعات پایین کارت */}
                        <div className="flex justify-between text-[11px] text-gray-400  pt-2 mt-2">
                            <span>
                                {item.datetime_create
                                    ? new Date(item.datetime_create).toLocaleDateString("fa-IR")
                                    : ""}
                            </span>
                            <span>
                                ❤️ {item.like_count ?? 0} | 👁️ {item.view_count ?? 0}
                            </span>
                        </div>
                    </div>
                ))}

                {/* اگر دیتا خالی بود */}
                {!isLoading && data?.results?.length === 0 && (
                    <p className="text-center text-gray-400 text-sm mt-4">
                        خبری یافت نشد
                    </p>
                )}
            </div>

  
        </div>
    );
}
