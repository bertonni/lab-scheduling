import {
  LocalizationProvider,
  PickersDay,
  pickersDayClasses,
  StaticDatePicker,
} from "@mui/lab";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";
import { motion } from "framer-motion";

const variants = {
  initial: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function ViewReservations() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();

  const isNotAvailable = (date) => {
    if (date.getDay() === 0) return true;
    return false;
  };

  const getFormattedDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const AnimatedChip = motion(Chip);

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
      <Box mb={4}> </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={selectedDate}
          showDaysOutsideCurrentMonth
          displayStaticWrapperAs="desktop"
          renderDay={renderWeekPickerDay}
          shouldDisableDate={isNotAvailable}
          toolbarTitle="Selecione a data"
          onChange={(newValue) => {
            setSelectedDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" },
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          },
        }}
      >
        <Typography variant="h4" component="h4">
          Reservas do dia
        </Typography>
        <AnimatedChip
          variants={variants}
          initial={"initial"}
          animate={"visible"}
          sx={{
            width: "max-content",
            [theme.breakpoints.down('sm')]: { alignSelf: "flex-end" },
            backgroundColor: "#29b6f6",
            color: "white",
          }}
          label={getFormattedDate(
            Temporal.PlainDate.from({
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            }).toString()
          )}
        />
      </Box>
    </>
  );
}
