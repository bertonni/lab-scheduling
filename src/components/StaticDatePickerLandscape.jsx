import * as React from "react";
import isWeekend from "date-fns/isWeekend";
import brLocale from "date-fns/locale/pt-BR";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const options = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          toolbarTitle="Selecione a data"
          toolbarFormat="dd 'de' MMMM"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '65%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Hora de início
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={startTime}
              label="Selecione os Horários"
              onChange={(e) => setStartTime(e.target.value)}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Hora de término
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={endTime}
              label="Selecione os Horários"
              onChange={(e) => setEndTime(e.target.value)}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" sx={{ mt: 4 }} color="info">Reservar</Button>
      </LocalizationProvider>
    </Box>
  );
}
