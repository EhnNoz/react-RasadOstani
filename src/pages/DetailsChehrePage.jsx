import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../service/handleToken'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'

function DetailsChehrePage() {
  const location = useLocation()

  // دریافت اطلاعات کارت از state
  const { name } = location.state || {}

  // در صورتی که اطلاعات کارت موجود نیست
  if (!name) return <Typography color="error">اطلاعات موجود نیست</Typography>

  // کال API برای جزئیات
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile-details', name],
    queryFn: async () => {
      const response = await api.get(`/profiles-with-posts/`, { params: { name } })
      return response.data
    }
  })

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    )

  if (isError)
    return <Typography color="error">خطا در دریافت اطلاعات</Typography>



  // چهار پلتفرم مورد نظر
  const platforms = ['بله', 'ایتا', 'توییتر', 'اینستاگرام']

  return (
    <>
      <Grid container spacing={2}>
        {platforms.map((platform) => {
          // پیدا کردن پست‌های هر پلتفرم از داده‌ها
          const posts = data[0]?.latest_posts?.[platform] || []

          return (
            <Grid className='p-4' item size={{xs : 12 , md : 3 , lg : 3}}  key={platform}>
              <div className="bg-gray-50 rounded-2xl shadow p-3 flex flex-col h-[830px]">
                <h2 className="text-center font-bold text-lg text-gray-800 mb-4 border-b">
                  {platform}
                </h2>

                {isLoading && (
                  <div className="text-center text-sm text-gray-500 mt-8">
                    در حال بارگذاری...
                  </div>
                )}
                {error && (
                  <div className="text-center text-red-500 mt-8">
                    خطا در دریافت داده‌ها
                  </div>
                )}

                <div className="flex no-scrollbar flex-col gap-4 flex-grow overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                  {posts.length > 0 ? (
                    posts.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 h-[180px] flex flex-col justify-between"
                      >
                        <div>
                          {/* عنوان کانال */}
                          <h3 className="font-semibold text-gray-800 mb-1 text-sm line-clamp-1">
                            {item.channel_name_fa || 'بدون عنوان'}
                          </h3>

                          {/* متن پست */}
                          <p className="text-gray-600 text-xs leading-5 overflow-y-auto max-h-[80px] pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                            {item.description && item.description.trim() !== ''
                              ? item.description
                              : 'بدون توضیحات'}
                          </p>
                        </div>

                        {/* اطلاعات پایین کارت */}
                        <div className="flex justify-between text-[11px] text-gray-400 border-t pt-2 mt-2">
                          <span>
                            {item.datetime_create
                              ? new Date(item.datetime_create).toLocaleDateString('fa-IR')
                              : ''}
                          </span>
                          <span>
                            ❤️ {item.like_count ?? 0} | 👁️ {item.view_count ?? 0}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 text-sm mt-4">
                      اطلاعاتی وجود ندارد
                    </p>
                  )}
                </div>

                <button className="mt-4 text-blue-600 text-sm font-medium hover:underline text-center">
                  موارد بیشتر
                </button>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default DetailsChehrePage
