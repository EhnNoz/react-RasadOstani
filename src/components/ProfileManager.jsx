import { Grid } from '@mui/material';
import { api } from '../service/handleToken'
import { useQuery } from "@tanstack/react-query";
function ProfileManager() {



  const { data, isLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const res = await api.get('/current-user/');
      return res.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryDelay: 10,
  });

  return (
    <>
      <Grid  size={12}>
        {
          isLoading ? (
            <>

            </>
          ) : (
            <>
              {data ?
                (
                  <>
                    <div className='flex  justify-between w-50  font-YekanBakh_Regular text-[15px]'>
                      <div className='font-YekanBakh_Bold'>نام:</div>
                      <div>{data[0].first_name}</div>
                    </div>
                    <div className='flex justify-between w-50  font-YekanBakh_Regular text-[15px]'>
                      <div className='font-YekanBakh_Bold'>نام خانوادگی:</div>
                      <div>{data[0].last_name}</div>
                    </div>
                    <div className='flex justify-between w-50  font-YekanBakh_Regular text-[15px]'>
                      <div className='font-YekanBakh_Bold'>ایمیل:</div>
                      <div>{data[0].email}</div>
                    </div>
                    <div className='flex justify-between w-50  font-YekanBakh_Regular text-[15px]'>
                      <div className='font-YekanBakh_Bold'>نام کاربری:</div>
                      <div>{data[0].username}</div>
                    </div>
                  </>
                )
                :
                (<></>)
              }
            </>
          )
        }
      </Grid>

    </>

  )
}

export default ProfileManager






