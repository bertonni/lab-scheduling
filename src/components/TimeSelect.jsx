import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const options = [7, 8, 9, 10, 11, 13, 14, 15, 16, 17];

export default function TimeSelect({ startTime, setStartTime, endTime, setEndTime }) {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", gap: 2, width: '100%', maxWidth: '500px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Início *</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={startTime}
          label="Início"
          onChange={(e) => setStartTime(e.target.value)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option < 10 ? `0${option}` : option}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={startTime === ""}>
        <InputLabel id="demo-simple-select-label">Término *</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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