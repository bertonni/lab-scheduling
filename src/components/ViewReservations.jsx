import {
  LocalizationProvider,
  PickersDay,
  pickersDayClasses,
  StaticDatePicker,
} from "@mui/lab";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";
import { Box } from "@mui/material";

export default function ViewReservations() {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const isNotAvailable = (date) => {
    if (date.getDay() === 0) return true;
    return false;
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "#29b6f6",
          },
          [`&&.${pickersDayClasses.today}`]: {
            borderColor: "#29b6f6",
          },
        }}
      />
    );
  };

  return (
    <>
      <Box mb={4}></Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={selectedDay}
          showDaysOutsideCurrentMonth
          displayStaticWrapperAs="desktop"
          renderDay={renderWeekPickerDay}
          shouldDisableDate={isNotAvailable}
          toolbarTitle="Selecione a data"
          onChange={(newValue) => {
            setSelectedDay(newValue);
            console.log(newValue);
          }}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
    </>
  );
}
