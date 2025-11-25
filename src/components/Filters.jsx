import  { useState } from 'react';
import {  MenuItem, Select } from '@mui/material';
import DatePickerMemo from './DatePickerMemo';
import CancelIcon from '@mui/icons-material/Cancel';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { api } from '../service/handleToken';




function Filters() {
    const [searchParams, setSearchParams] = useSearchParams({})
    const [platform, setPlatform] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState('')
    const [provincesList, setProvincesList] = useState([]);
    const [channelsList, setChannelsList] = useState([]);

    const [PoliticalCategories, setPoliticalCategories] = useState([]);

    const [date, setDate] = useState({ start: null, end: null });

    const handleClearFilters = () => {
        setUser([]);
        setChannelsList([]);
        setPoliticalCategories([]);
        setPlatform([]);
        setSearch('')
        setDate({ start: null, end: null });
        searchParams.delete('user_category')
        searchParams.delete('political_category')
        searchParams.delete('channel')
        searchParams.delete('search')
        searchParams.delete('provinces')
        searchParams.delete('start_date')
        searchParams.delete('end_date')
        searchParams.delete('platform')
        setSearchParams(searchParams)
    };


    const handleSubmit = () => {
        searchParams.set('user_category', user)
        searchParams.set('political_category', PoliticalCategories)
        searchParams.set('channel', channelsList)
        searchParams.set('provinces', provincesList)
        searchParams.set('search', search)
        searchParams.set('platform', platform)
        if (date.start !== null && date.end !== null) {
            searchParams.set('start_date', date.start)
            searchParams.set('end_date', date.end)
        }
        setSearchParams(searchParams)
    }
    const { data: channels, isLoading } = useQuery({
        queryKey: [searchParams.toString(), 'channelsFilter'],
        queryFn: async () => {
            const response = await api.get('/channels/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });
    const { data: platforms, isLoading: loadingPlatforms } = useQuery({
        queryKey: [searchParams.toString(), 'platformsFilter'],
        queryFn: async () => {
            const response = await api.get('/platforms/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });
    const { data: userCategories, isLoading: loadingUser } = useQuery({
        queryKey: [searchParams.toString(), 'user-categories'],
        queryFn: async () => {
            const response = await api.get('/user-categories/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });
    const { data: Political, isLoading: loadingPolitical } = useQuery({
        queryKey: [searchParams.toString(), 'political-categories'],
        queryFn: async () => {
            const response = await api.get('/political-categories/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });

    const { data: provinces, isLoading: loadingProvinces } = useQuery({
        queryKey: [searchParams.toString(), 'provinces'],
        queryFn: async () => {
            const response = await api.get('/provinces/', { params: Object.fromEntries(searchParams) });
            return response.data;
        },
        refetchOnWindowFocus: false,
        retryDelay: 50,
    });



    const handleStartDateChange = (value) =>
        setDate((prev) => ({ ...prev, start: value }));
    const handleEndDateChange = (value) =>
        setDate((prev) => ({ ...prev, end: value }));


    // داده‌های استاتیک

    return (

        <>

            <div>
                <div dir='rtl' className="flex justify-center   flex-wrap gap-2 items-end   py-2 bg-white  rounded-md">

                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">گروه کاربری</label>
                        <Select
                            multiple
                            value={user}
                            onChange={(e) => setUser(e.target.value)}

                            sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                            className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
                        >
                            {userCategories?.map((p) => (
                                <MenuItem key={p} value={p.id} sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}>
                                    {p.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>


                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">جریان سیاسی</label>
                        <Select
                            multiple
                            value={PoliticalCategories}
                            onChange={(e) => setPoliticalCategories(e.target.value)}

                            sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                            className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
                        >
                            {Political?.map((p) => (
                                <MenuItem key={p} value={p.id} sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}>
                                    {p.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">کانال</label>
                        <Select
                            multiple
                            value={channelsList}
                            onChange={(e) => setChannelsList(e.target.value)}

                            sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                            className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
                        >
                            {channels?.map((p) => (
                                <MenuItem key={p} value={p.id} sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}>
                                    {p.name_fa}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">استان</label>
                        <Select
                            multiple
                            value={channelsList}
                            onChange={(e) => setChannelsList(e.target.value)}

                            sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                            className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
                        >
                            {provinces?.map((p) => (
                                <MenuItem key={p} value={p.id} sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}>
                                    {p.name_fa}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* پلتفرم */}
                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">پلتفرم</label>
                        <Select
                            multiple
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}

                            sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                            className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
                        >
                            {platforms?.map((p) => (
                                <MenuItem key={p} value={p.id} sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}>
                                    {p.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>



                    {/* تاریخ شروع */}
                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">تاریخ شروع</label>
                        <DatePickerMemo label="" value={date.start} onChange={handleStartDateChange} />
                    </div>

                    {/* تاریخ پایان */}
                    <div className="flex flex-col">
                        <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">تاریخ پایان</label>
                        <DatePickerMemo label="" value={date.end} onChange={handleEndDateChange} />
                    </div>


                    <div className='w-full flex justify-center '>
                        <div className="flex flex-col  ">
                            <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">جستجو</label>
                            <input
                                dir='rtl'
                                multiple
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}

                                sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                                className="!h-[32px] text-[13px] px-2 w-[400px] border rounded-md border-gray-400 bg-white font-YekanBakh_Regular"
                            />
                        </div>
                        <button

                            onClick={handleSubmit}

                            className="flex items-center text-purple-400 gap-1 text-[12px]   transition-all rounded-md px-2 py-1 h-[32px] mt-[22px]"
                        >
                            جستجو
                        </button>
                        {/* دکمه حذف فیلتر */}
                        <button
                            onClick={handleClearFilters}
                            className="flex items-center gap-1 text-[12px] text-purple-400   transition-all rounded-md px-2 py-1 h-[32px] mt-[22px]"
                        >
                            <CancelIcon sx={{ fontSize: '14px' }} />
                            حذف فیلترها
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Filters;
