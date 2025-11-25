import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Modal,
  Fade,
} from "@mui/material";
import React from "react";
import {
  useNavigate,
  useSearchParams,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/handleToken";

function ChehreOstaniPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // برای modal route
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const finalParams = Object.fromEntries(searchParams.entries());
      const response = await api.get("/profiles/", { params: finalParams });
      return response.data;
    },
    retry: 50000,
  });


 
  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return <Typography color="error">خطا در دریافت اطلاعات</Typography>;

  return (
    <div dir="rtl">
      {/* صفحه اصلی کارت‌ها */}
      <Grid container className="mx-20">
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
              {data?.map((item, index) => (
                <Grid
                  key={index}
                  item
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  className="bg-[#f9f9fb] p-4 rounded-lg"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={7}>
                      <div className="text-[16px] flex flex-col">
                        <div>{item.name}</div>
                        <div>{item.position}</div>
                        <div>{item.category}</div>
                      </div>
                      <div className="flex gap-x-3 pt-3">
                        <button
                          onClick={() => {
                            navigate("chehreDetails", {
                              state: {
                                backgroundLocation: location,
                                profileData: item,
                              },
                            });
                          }}
                          className="bg-[#fb7979] text-white px-3 py-2 rounded-md text-[13px]"
                        >
                          مشاهده
                        </button>
                        <div className="bg-orange-200 text-white px-3 py-2 rounded-md text-[13px]">
                          آمار
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      className="flex justify-end items-center"
                    >
                      <img
                        className="w-24 h-24 object-cover rounded-md"
                        src={item.photo}
                        alt={item.name}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* وقتی modal باید باز بشه */}
      <Modal
        open={!!backgroundLocation}
        onClose={() => navigate(-1)}
        closeAfterTransition
      >
        <Fade in={!!backgroundLocation}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              width: 400,
            }}
          >
            <Outlet />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ChehreOstaniPage;
