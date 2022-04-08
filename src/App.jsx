import { Box, Typography } from "@mui/material";
import { useState } from "react";
import StaticDatePickerLandscape from "./components/StaticDatePickerLandscape";

function App() {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      height={"100vh"}
      sx={{ px: { xs: "2rem", sm: "3rem", lg: "6rem" } }}
    >
      <Typography textAlign={"center"} mt={4} mb={2} variant="h4">
        Agendamento de Laboratório
      </Typography>
      <StaticDatePickerLandscape />
    </Box>
  );
}

export default App;
