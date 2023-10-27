
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
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

import { postData } from '../../api/api';


function Comment(props) {

    const { nombre, comentario, foto, date } = props

    const [language, setLanguage] = useState('es')
    const [open, setOpen] = useState(false);
    const [textTranslated, setTextTranslated] = useState(null)

    const handleChange = async (event) => {
        setLanguage(event.target.value);

        if(event.target.value === 'es'){
            setTextTranslated(comentario)
        } else {
            
            const data = {
                text: comentario,
                targetLanguage: event.target.value,
                sourceLanguage: "es"
            }

            const endpoint = `/posts/translate`
            const res = await postData({endpoint, data})

            if(res){
                setTextTranslated(res.translatedText)
            }
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3, pb:0.5 }}
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
            
            <Grid item xs={9} sx={{ border: 0 }}>
                
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
                   {textTranslated ? textTranslated : comentario}
                </Typography>

            </Grid>

            <Grid item display='flex' xs={1} sx={{ border: 0, mr:2 }} justifyContent='center'>
                <FormControl fullWidth>
                    {/* <InputLabel sx={{color:'#fff'}}>Lenguaje</InputLabel> */}
                    <Select
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={language}
                        // label="languaje"
                        onChange={handleChange}
                        sx={{ color: '#ffffff'}}
                    >
                        <MenuItem value={'es'}>{open ? 'Español' : '🇪🇸'}</MenuItem>
                        <MenuItem value={'en'}>{open ? 'Ingles' : '🇺🇸'}</MenuItem>
                        <MenuItem value={'fr'}>{open ? 'Frances' : '🇫🇷'}</MenuItem>
                        <MenuItem value={'de'}>{open ? 'Aleman' : '🇩🇪'}</MenuItem>
                        <MenuItem value={'ja'}>{open ? 'Japones' : '🇯🇵'}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

        </Grid>
    )
}

export default Comment