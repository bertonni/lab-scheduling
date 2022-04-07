import * as React from "react";
import brLocale from "date-fns/locale/pt-BR";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";

const options = [7, 8, 9, 10, 11, 13, 14, 15, 16, 17];

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState(Temporal.Now.instant().toString());
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [unavailableDates, setUnavailableDates] = React.useState([]);
  const [today] = React.useState(Temporal.Now.plainDateISO());
  const [minDate, setMinDate] = React.useState(Temporal.Now.plainDateISO());
  const [maxDate, setMaxDate] = React.useState(
    Temporal.Now.plainDateISO().add({ days: 14 })
  );

  const isNotAvailable = (date) => {
    const formatted = new Temporal.PlainDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    if (Temporal.PlainDate.compare(formatted, maxDate) === 1) return true;
    if (Temporal.PlainDate.compare(formatted, minDate) === -1) return true;
    if (date.getDay() === 0) return true;
    return false;
  };

  const handleSchedule = () => {
    console.log(value, startTime, endTime);
    // setUnavailableDates([...unavailableDates, getFormattedDate(value)])
  };

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
          minDate={minDate}
          openTo="day"
          value={value}
          shouldDisableDate={isNotAvailable}
          toolbarTitle="Selecione a data"
          toolbarFormat="dd 'de' MMMM"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, width: "65%" }}
        >
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
          <FormControl fullWidth disabled={startTime === ""}>
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
                <MenuItem disabled={option <= startTime} key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          disabled={startTime === "" || endTime === ""}
          variant="contained"
          sx={{ mt: 4 }}
          color="info"
          onClick={handleSchedule}
        >
          Reservar
        </Button>
      </LocalizationProvider>
    </Box>
  );
}
