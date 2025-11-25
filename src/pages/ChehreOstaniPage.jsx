import { Box, CircularProgress, Grid, Typography, MenuItem, Select } from '@mui/material'
import { useNavigate, useSearchParams, Outlet, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../service/handleToken'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from 'react'

function ChehreOstaniPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [search, setSearch] = useState(searchParams.get('name') || '')
  const [provincesList, setProvincesList] = useState(
    searchParams.get('province') ? [searchParams.get('province')] : []
  )

  // گرفتن لیست استان‌ها از API
  const { data: provinces, isLoading: loadingProvinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await api.get('/provinces/')
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profiles', Object.fromEntries(searchParams)],
    queryFn: async () => {
      const finalParams = Object.fromEntries(searchParams.entries())
      const response = await api.get('/profiles/', { params: finalParams })
      return response.data
    },
    retry: 50000,
  })

  const handleSubmit = () => {
    // جستجو
    if (search) searchParams.set('name', search)
    else searchParams.delete('name')

    // استان
    if (provincesList.length > 0) searchParams.set('province', provincesList.join(','))
    else searchParams.delete('province')

    setSearchParams(searchParams)
  }

  const handleClear = () => {
    setSearch('')
    setProvincesList([])
    searchParams.delete('name')
    searchParams.delete('province')
    setSearchParams(searchParams)
  }

  const isDetailsPage = location.pathname.includes('chehreDetails')

  if (isLoading || loadingProvinces)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    )

  if (isError) return <Typography color="error">خطا در دریافت اطلاعات</Typography>

  return (
    <div dir="rtl">
      {!isDetailsPage && (
        <Grid container className="mx-20">
          {/* ------------ فیلترها ------------ */}
          <Grid item xs={12} className="w-full flex flex-wrap gap-3 justify-center mt-4">
            {/* جستجو */}
            <div className="flex flex-col">
              <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">جستجو</label>
              <input
                dir="rtl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!h-[32px] text-[13px] px-2 w-[300px] sm:w-[350px] md:w-[400px] border rounded-md border-gray-400 bg-white font-YekanBakh_Regular"
              />
            </div>

            {/* استان */}
            <div className="flex flex-col">
              <label className="text-[13px] font-YekanBakh_Regular text-right mb-1">استان</label>
              <Select
                multiple
                value={provincesList}
                onChange={(e) => setProvincesList(e.target.value)}
                sx={{ borderRadius: '6px', height: '32px', fontSize: 13 }}
                className="!h-[32px] w-[180px] bg-white font-YekanBakh_Regular"
              >
                {provinces?.map((p) => (
                  <MenuItem
                    key={p.id}
                    value={p.id}
                    sx={{ fontFamily: 'YekanBakh_regular', fontSize: 13 }}
                  >
                    {p.name_fa}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* دکمه‌ها */}
            <button
              onClick={handleSubmit}
              className="flex items-center text-purple-400 gap-1 text-[12px] transition-all rounded-md px-2 py-1 h-[32px] mt-[22px]"
            >
              جستجو
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-[12px] text-purple-400 transition-all rounded-md px-2 py-1 h-[32px] mt-[22px]"
            >
              <CancelIcon sx={{ fontSize: '14px' }} />
              حذف فیلترها
            </button>
          </Grid>

          {/* ------------ کارت‌ها ------------ */}
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1, p: 2 }}>
              <Grid container spacing={3}>
                {data?.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    className="bg-[#f9f9fb] p-2 px-5 rounded-lg"
                  >
                    <Grid container size={12}>
                      <Grid item size={{ xs: 12, sm: 7 }}>
                        <div className="flex flex-col text-[16px]">
                          <div>{item.name}</div>
                          <div>{item.position}</div>
                          <div>{item.category}</div>
                        </div>
                        <div className="flex gap-x-3 pt-3">
                          <button
                            onClick={() =>
                              navigate('chehreDetails', {
                                state: {
                                  name: item.name,
                                  position: item.position,
                                  category: item.category,
                                  photo: item.photo,
                                },
                              })
                            }
                            className="bg-[#fb7979] text-white w-18 justify-center items-center cursor-point p-2 px-3 rounded-md text-[13px]"
                          >
                            مشاهده
                          </button>
                          <div className="bg-orange-200 text-white w-18 flex justify-center items-center cursor-point p-2 px-3 rounded-md text-[13px]">
                            آمار
                          </div>
                        </div>
                      </Grid>

                      <Grid item size={{ xs: 12, sm: 5 }} className="flex justify-end mt-3 sm:mt-0">
                        <img className="bg-sky-900 w-40 rounded-md h-30" src={item.photo} alt="" />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}

      {isDetailsPage && <Outlet />}
    </div>
  )
}

export default ChehreOstaniPage
