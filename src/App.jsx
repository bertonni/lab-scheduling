import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import StaticDatePickerLandscape from "./components/StaticDatePickerLandscape";
import ViewReservations from "./components/ViewReservations";
import { styled } from "@mui/material/styles";

function App() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleSelectedTab = (newValue) => {
    setSelectedTab(newValue);
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    "&:hover": {
      
    }
  }))

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
          mb: 1,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleSelectedTab(1)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 1 ? "#00897b" : "#80cbc4",
              "&:hover": { opacity: "0.7 !important" },
            }}
          >
            Reservar Horário
          </Button>
          <Button
            onClick={() => handleSelectedTab(2)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 2 ? "#039be5" : "#81d4fa",
              "&:hover": { opacity: "0.7 !important" },
            }}
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
