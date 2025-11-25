// components/CircularProgressWithLabel.jsx
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AnalysisLoadingPage({ value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={80}
        thickness={4}
        sx={{
          color: "#b182e3", // رنگ برند شما
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
