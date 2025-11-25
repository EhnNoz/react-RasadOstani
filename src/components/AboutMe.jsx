import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../service/handleToken';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CircularProgress from '@mui/material/CircularProgress';

function AboutMe() {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['aboutUs'],
    queryFn: async () => {
      const res = await api.get('/about-us/');
      return res.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryDelay: 10,
  });

  return (
    <div className="flex justify-center items-center m font-YekanBakh_Regular bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {loading ? (
        <div className="flex flex-col items-center space-y-3 text-gray-500">
          <CircularProgress size={30} />
          <p className="text-sm">در حال بارگذاری اطلاعات...</p>
        </div>
      ) : data ? (
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 text-blue-500 p-3 rounded-full">
              <InfoOutlinedIcon />
            </div>
            <h2 className="text-xl font-YekanBakh_Bold text-gray-800 mr-3">درباره ما</h2>
          </div>

          <div className="space-y-6">
            <div  dir='' className="flex flex-col sm:flex-row   pb-3">
           
              <span className="text-gray-800 flex justify-center w-full pr-3 text-[15px]">{data.title}</span>
            </div>

            <div className="flex flex-col  pb-3">
              <span className="font-YekanBakh_Bold text-gray-600 mb-1">توضیحات:</span>
              <p className="text-gray-700 text-[15px] leading-relaxed text-justify">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">اطلاعاتی یافت نشد.</div>
      )}
    </div>
  );
}

export default AboutMe;
