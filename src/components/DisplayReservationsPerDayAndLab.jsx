import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function DisplayReservationsPerDayAndLab({
  reservations,
  date,
  lab,
}) {
  const [schedulesForSelectedLab, setSchedulesForSelectedLab] = useState([]);

  useEffect(() => {
    const schedulesForDate = reservations.filter(
      (reserve) => reserve.lab === lab && reserve.date === date
      );
      schedulesForDate.sort((a, b) => a.start - b.start);
      
    setSchedulesForSelectedLab(schedulesForDate);
  }, [date, lab, reservations]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        marginBottom: "4rem",
      }}
    >
      {schedulesForSelectedLab.length === 0 ? (
        <Typography mt={2}>Não há reservas para este dia =)</Typography>
      ) : (
        <Grid
          container
          spacing={1}
          pr={1}
          mt={2}
          alignItems={"center"}
          justifyContent="center"
          sx={{
            width: { xs: "80vw", md: "55vw", lg: "40vw" },
            borderBottom: "1px solid #777",
          }}
        >
          <Grid item xs={8} py={1}>
            <Typography fontWeight={600}>Solicitante</Typography>
          </Grid>
          <Grid item xs={4} py={1}>
            <Typography textAlign={"right"} fontWeight={600}>
              Horário
            </Typography>
          </Grid>
        </Grid>
      )}
      {schedulesForSelectedLab.map((schedule, index) => {
        const splittedName = schedule.user.name.split(" ");
        const username = splittedName[0] + " " + splittedName[splittedName.length - 1]
        return (
          <Grid
            container
            key={index}
            spacing={1}
            pr={1}
            alignItems={"center"}
            justifyContent="center"
            sx={{
              width: { xs: "80vw", md: "55vw", lg: "40vw" },
              borderTop: "1px solid #777",

              "&:last-child": {
                borderBottom: "1px solid #777",
              },

              "&:hover": {
                backgroundColor: "#efefef",
                // boxShadow: '5px 5px 5px #dcdcdc'
              },
            }}
          >
            <Grid item xs={8} py={1}>
              <Typography fontWeight={400} fontSize={16}>
                {schedule.user.name.split(" ")[0]}{" "}
                {
                  schedule.user.name.split(" ")[
                    schedule.user.name.split(" ").length - 1
                  ]
                }
              </Typography>
              <Typography
                fontWeight={400}
                fontSize={12}
                sx={{ color: "#898989" }}
              >
                {schedule.user.email}
              </Typography>
            </Grid>
            <Grid item xs={4} py={1}>
              <Typography textAlign={"right"} fontWeight={400}>
                {schedule.start < 10 ? "0" + schedule.start : schedule.start}h -{" "}
                {schedule.end < 10 ? "0" + schedule.end : schedule.end}h
              </Typography>
            </Grid>
          </Grid>
        );
      })}
      {/* <Pagination count={3} variant="outlined" shape="rounded" /> */}
    </Box>
  );
}
