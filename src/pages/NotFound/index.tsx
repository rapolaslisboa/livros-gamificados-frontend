import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => (
  <Box
    style={{
      display: "flex",
      placeContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Typography variant="h1" component="h1">
      404
    </Typography>
    <Typography variant="h4" component="h1">
      Not Found
    </Typography>
  </Box>
);

export { NotFound };
