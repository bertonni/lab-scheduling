import {
  LocalizationProvider,
  PickersDay,
  pickersDayClasses,
  StaticDatePicker,
} from "@mui/lab";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  Grid,
  Stack,
  Pagination,
  ButtonGroup,
  Button,
} from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";
import { motion } from "framer-motion";
import { useSchedule } from "../contexts/ScheduleContext";

const variants = {
  initial: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function ViewReservations() {
  const { schedules } = useSchedule();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);
  const theme = useTheme();

  const isNotAvailable = (date) => {
    if (date.getDay() === 0) return true;
    return false;
  };

  const getFormattedDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const formattedDate = Temporal.PlainDate.from({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate(),
    }).toString();

    setReservations(
      schedules.filter((schedule) => schedule.date === formattedDate)
    );
  }, [selectedDate]);

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

  const handleSelectedTab = (newValue) => {
    setSelectedTab(newValue);
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
            [theme.breakpoints.down("sm")]: { alignSelf: "flex-end" },
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
      <Box my={2}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            size="small"
            onClick={() => handleSelectedTab(1)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 1 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
            }}
          >
            Lab g1
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(2)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 2 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
            }}
          >
            Lab g2
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(3)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 3 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
            }}
          >
            Lab g3
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(4)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 4 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
            }}
          >
            Lab g4
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {reservations.length === 0 ? (
          <Typography mt={2}>Não há reservas para este dia =)</Typography>
        ) : (
          <Grid
            container
            spacing={2}
            width="100vw"
            mt={2}
            alignItems={"center"}
            justifyContent="center"
          >
            <Grid item xs={4}>
              <Typography fontWeight={600}>Solicitante</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign={"center"} fontWeight={600}>
                Laboratório
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={"center"} fontWeight={600}>
                Data / Hora
              </Typography>
            </Grid>
          </Grid>
        )}
        {reservations.map((schedule, index) => (
          <Grid
            container
            key={index}
            spacing={1}
            width="100%"
            alignItems={"center"}
            justifyContent="center"
          >
            <Grid item xs={4}>
              <Typography fontWeight={400}>{schedule.user.email}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography textAlign={"center"} fontWeight={400}>
                {schedule.lab}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={"center"} fontWeight={400}>
                {getFormattedDate(schedule.date)} -{" "}
                {schedule.start < 10 ? "0" + schedule.start : schedule.start}h
                às {schedule.end < 10 ? "0" + schedule.end : schedule.end}h
              </Typography>
            </Grid>
          </Grid>
        ))}
        {/* <Pagination count={3} variant="outlined" shape="rounded" /> */}
      </Box>
    </>
  );
}
