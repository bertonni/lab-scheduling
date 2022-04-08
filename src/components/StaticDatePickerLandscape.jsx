import * as React from "react";
import brLocale from "date-fns/locale/pt-BR";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Box, Button } from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";
import TimeSelect from "./TimeSelect";
import LabSelect from "./LabSelect";
import { PickersDay, pickersDayClasses } from "@mui/lab";
import { useTheme } from '@mui/material/styles';

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState(Temporal.Now.instant().toString());
  const [startTime, setStartTime] = React.useState("");
  const [selectedLab, setSelectedLab] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [unavailableDates, setUnavailableDates] = React.useState([]);
  const [minDate, setMinDate] = React.useState(Temporal.Now.plainDateISO());
  const [maxDate] = React.useState(
    Temporal.Now.plainDateISO().add({ days: 14 })
  );
  const [selectLabError, setSelectLabError] = React.useState(false);
  const theme = useTheme();

  const isNotAvailable = (date) => {
    const formatted = new Temporal.PlainDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    if (Temporal.PlainDate.compare(formatted, maxDate) === 1) return true;
    if (Temporal.PlainDate.compare(formatted, minDate) === -1) return true;
    if (date.getDay() === 0) return true;
    return false;
  };

  const handleSchedule = () => {
    console.log(selectedLab, value, startTime, endTime);
    // setUnavailableDates([...unavailableDates, getFormattedDate(value)])
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    return (
      <PickersDay {...pickersDayProps} sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: '#349A46'
        },
        [`&&.${pickersDayClasses.today}`]: {
          borderColor: '#349A46'
        }
      }} />
    )
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LabSelect
        selectedLab={selectedLab}
        setSelectedLab={setSelectedLab}
        error={selectLabError}
        setError={setSelectLabError}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          showDaysOutsideCurrentMonth
          renderDay={renderWeekPickerDay}
          shouldDisableDate={isNotAvailable}
          toolbarTitle="Selecione a data"
          toolbarFormat="dd 'de' MMMM"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <TimeSelect
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        <Button
          disabled={startTime === "" || endTime === "" || selectedLab === ""}
          variant="contained"
          sx={{ mt: 4 }}
          color="ifgreen"
          onClick={handleSchedule}
        >
          Reservar
        </Button>
      </LocalizationProvider>
    </Box>
  );
}
