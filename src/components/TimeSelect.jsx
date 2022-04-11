import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";

const options = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function TimeSelect({
  date,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  const { schedules } = useSchedule();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const data = schedules.filter((value) => value.date === date);
    if (data.length === 0) return;
    const unavailableStartTimes = data.map(({ start }) => start);
    const unavailableEndTimes = data.map(({ end }) => end);

    setMinValue(Math.min(...unavailableStartTimes));
    setMaxValue(Math.max(...unavailableEndTimes));
  }, [date, startTime, endTime]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="start-time">Início *</InputLabel>
        <Select
          required
          labelId="start-time"
          id="start-time-select"
          value={startTime}
          label="Início"
          onChange={(e) => setStartTime(e.target.value)}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              disabled={
                (option >= endTime && endTime != "") ||
                (option >= minValue &&
                  option <= maxValue &&
                  minValue !== 0 &&
                  maxValue !== 0)
              }
              value={option}
            >
              {option < 10 ? `0${option}` : option}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={startTime === ""}>
        <InputLabel id="end-time">Término *</InputLabel>
        <Select
          required
          labelId="end-time"
          id="end-time-select"
          value={endTime}
          label="Término"
          onChange={(e) => setEndTime(e.target.value)}
        >
          {options.map((option, index) => (
            <MenuItem disabled={option <= startTime} key={index} value={option}>
              {option < 10 ? `0${option}` : option}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
