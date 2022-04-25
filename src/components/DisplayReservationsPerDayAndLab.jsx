import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function DisplayReservationsPerDayAndLab({
  reservations,
  date,
  lab,
}) {

  const [schedulesForSelectedLab, setSchedulesForSelectedLab] = useState([]);

  const getFormattedDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const schedulesForDate = reservations.filter(reserve => reserve.lab === lab && reserve.date === date);

    setSchedulesForSelectedLab(schedulesForDate);
  }, [date, lab, reservations])
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {schedulesForSelectedLab.length === 0 ? (
        <Typography mt={2}>Não há reservas para este dia =)</Typography>
      ) : (
        <Grid
          container
          spacing={1}
          mt={2}
          alignItems={"center"}
          justifyContent="center"
          sx={{
            width: { xs: "80vw", lg: "50vw" },
            borderBottom: "1px solid #777",
          }}
        >
          <Grid item xs={5} py={1}>
            <Typography fontWeight={600}>Solicitante</Typography>
          </Grid>
          <Grid item xs={3} py={1}>
            <Typography textAlign={"center"} fontWeight={600}>
              Laboratório
            </Typography>
          </Grid>
          <Grid item xs={4} py={1}>
            <Typography textAlign={"center"} fontWeight={600}>
              Data / Hora
            </Typography>
          </Grid>
        </Grid>
      )}
      {schedulesForSelectedLab.map((schedule, index) => (
        <Grid
          container
          key={index}
          spacing={1}
          alignItems={"center"}
          justifyContent="center"
          sx={{
            width: { xs: "80vw", lg: "50vw" },
            borderTop: "1px solid #777",

            "&:last-child": {
              borderBottom: "1px solid #777",
            },

            "&:hover": {
              backgroundColor: "#dcdcdc",
              // boxShadow: '5px 5px 5px #dcdcdc'
            },
          }}
        >
          <Grid item xs={5} py={1}>
            <Typography fontWeight={400}>{schedule.user.email}</Typography>
          </Grid>
          <Grid item xs={3} py={1}>
            <Typography textAlign={"center"} fontWeight={400}>
              {schedule.lab}
            </Typography>
          </Grid>
          <Grid item xs={4} py={1}>
            <Typography textAlign={"center"} fontWeight={400}>
              {getFormattedDate(schedule.date)} -{" "}
              {schedule.start < 10 ? "0" + schedule.start : schedule.start}h às{" "}
              {schedule.end < 10 ? "0" + schedule.end : schedule.end}h
            </Typography>
          </Grid>
        </Grid>
      ))}
      {/* <Pagination count={3} variant="outlined" shape="rounded" /> */}
    </Box>
  );
}
