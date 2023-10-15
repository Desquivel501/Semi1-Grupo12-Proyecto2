
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar, 
} from '@mui/material';

function Message(props) {

    const { foto, message, date, left=true } = props

    const align = left ? 'left' : 'right'
    const color = left ? '#737475' : '#0a1a42'

    return (
        <Grid
            container
            direction="row"
            justifyContent={align}
            alignItems="center"
            sx={{ border: 0, my: 1, borderRadius: 3, pt:1 }}
        >

            <Grid container display='flex' justifyContent={align} alignItems={align} xs={12} sx={{ border: 0 }}>
                
                {
                    !left &&
                    <Typography
                        variant="p"
                        sx={{ textAlign: 'left', color: '#ffffff', border: 0, pt:1}}
                    >
                        {date}
                    </Typography>
                }
                
                <Grid item width='auto' sx={{ border: 0, backgroundColor: color, borderRadius: 3, px:2, py:1, mr: left ? 1 : 0, ml: !left ? 1 : 0,}}>  
                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'left', color: '#ffffff'}}
                    >
                        {message}
                    </Typography>
                </Grid>

                {
                    left &&
                    <Typography
                        variant="p"
                        sx={{ textAlign: 'left', color: '#ffffff', border: 0, pt:1}}
                    >
                        {date}
                    </Typography>
                }
                
            </Grid>
            

        </Grid>
    )
}

export default Message