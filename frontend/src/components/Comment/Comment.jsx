
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar
} from '@mui/material';

import moment from 'moment'
let localeData = moment.updateLocale('es-us', {
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: 'unos segundos',
        ss: '%d segundos',
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un dia",
        dd: "%d dias",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años"
    }
});

function Comment(props) {

    const { nombre, comentario, foto, date } = props

    return (
        <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3 }}
        >
            <Grid item display='flex' xs={1} sx={{ border: 0, mr:2 }} justifyContent='center'>
                <Box
                    component="img"
                    sx={{ 
                        maxWidth: '70%',
                        borderRadius: '50%',  
                    }}
                    alt="logo"
                    src={foto}
                />
            </Grid>
            
            <Grid item xs={10} sx={{ border: 0 }}>
                
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'left', mt: 2, color: '#ffffff'}}
                >
                    {nombre}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{ color: '#d2d3d3', textAlign: 'left !important' }}
                >
                    {moment(moment.utc(date).local()).fromNow()}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ textAlign: 'left', mb: 1, color: '#e8e9e9' }}
                >
                    {comentario}
                </Typography>

            </Grid>

        </Grid>
    )
}

export default Comment