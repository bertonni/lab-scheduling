import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import StaticDatePickerLandscape from "./components/StaticDatePickerLandscape";
import ViewReservations from "./components/ViewReservations";

function App() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectedTab = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      height={"100vh"}
      sx={{ px: { xs: "2rem", sm: "3rem", lg: "6rem" } }}
    >
      <Typography textAlign={"center"} mt={4} mb={2} variant="h4">
        Agendamento de Laboratório
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 1
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleSelectedTab(1)}
            color="success"
            sx={{ backgroundColor: selectedTab === 1 ? "#00897b" : "#80cbc4" }}
          >
            Reservar Horário
          </Button>
          <Button
            onClick={() => handleSelectedTab(2)}
            color="success"
            sx={{ backgroundColor: selectedTab === 2 ? "#00897b" : "#80cbc4" }}
          >
            Ver Reservas
          </Button>
        </ButtonGroup>
      </Box>
      {selectedTab === 1 ? <StaticDatePickerLandscape /> : <ViewReservations />}
    </Box>
  );
}

export default App;
