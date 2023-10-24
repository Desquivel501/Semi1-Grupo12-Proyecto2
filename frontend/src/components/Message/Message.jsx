import * as React from "react";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function Message(props) {
  const { foto, message, date, left = true } = props;

  const align = left ? "left" : "right";
  const color = left ? "#737475" : "#0a1a42";
  const fecha = new Date(date);
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const año = fecha.getFullYear();

  const fechaFormateada = `${dia} de ${meses[mes]} ${año}`;

  return (
    <Grid
      container
      direction="row"
      justifyContent={align}
      alignItems="center"
      sx={{ border: 0, my: 1, borderRadius: 3, pt: 1 }}
    >
      <Grid
        container
        display="flex"
        justifyContent={align}
        alignItems={align}
        xs={12}
        sx={{ border: 0 }}
      >
        {!left &&
          (
            <Typography
              variant="p"
              sx={{ textAlign: "left", color: "#ffffff", border: 0, pt: 1 }}
            >
              {fechaFormateada}
            </Typography>
          )}

        <Grid
          item
          width="auto"
          sx={{
            border: 0,
            backgroundColor: color,
            borderRadius: 3,
            px: 2,
            py: 1,
            mr: left ? 1 : 0,
            ml: !left ? 1 : 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "left", color: "#ffffff" }}
          >
            {message}
          </Typography>
        </Grid>

        {left &&
          (
            <Typography
              variant="p"
              sx={{ textAlign: "left", color: "#ffffff", border: 0, pt: 1 }}
            >
              {fechaFormateada}
            </Typography>
          )}
      </Grid>
    </Grid>
  );
}

export default Message;
