import {
  Grid,
  Box,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./layout/Topbar";



const App = () => {

  return (
    <Grid  size={12} sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {/* === نوار بالا === */}

      <Topbar />
      {/* === محتوای اصلی === */}

      <Grid size={12}  className='pt-4 font-YekanBakh_Regular'>

        <Outlet />

      </Grid>
    </Grid>
  );
};


export default App;
