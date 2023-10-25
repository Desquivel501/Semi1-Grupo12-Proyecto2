
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

import { useNavigate } from 'react-router-dom';

import moment from 'moment'
// import 'moment/min/locales';

const loremIpsum  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis a elit egestas dictum id eget diam. Aenean nisi est, malesuada quis molestie nec, auctor id tortor. Proin vel diam id quam lacinia molestie. Sed elementum hendrerit nisi nec volutpat. Sed elementum, orci nec consequat hendrerit, erat elit vestibulum eros, a hendrerit urna tellus vel ex. Quisque pretium, orci nec rhoncus fermentum, justo lorem tincidunt turpis, sed pretium libero odio et nisl. Etiam ultricies massa eu tristique sodales. Suspendisse feugiat quis magna vel condimentum. Nulla consectetur fermentum pharetra. Quisque egestas libero aliquam, semper tellus sed, cursus leo. Vestibulum vel neque commodo, mattis sem a, viverra lacus. Cras sit amet vestibulum velit, et mattis odio. Nam nec malesuada odio. Praesent quam velit, mollis fringilla imperdiet eget, viverra non ipsum. In at ante mattis, vulputate nulla vitae, aliquet turpis. Donec lacinia mattis est, sit amet dictum tellus ultrices et. '

// const labels = ['Landscape', 'Photography', 'Nature', 'Sunset', 'Green']

import { postData, translate } from '../../api/api';


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


function PostPreview(props) {

    const { avatar, name, text, picture, labels = [], date, id } = props

    const [language, setLanguage] = useState('es')
    const [textTranslated, setTextTranslated] = useState(null)

    const navigate = useNavigate();

    const handleChange = async (event) => {
        setLanguage(event.target.value);

        if(event.target.value === 'es'){
            setTextTranslated(text)
        } else {
            
            const data = {
                text: text,
                targetLanguage: event.target.value,
                sourceLanguage: "es"
            }

            const endpoint = `/posts/translate`
            const res = await postData({endpoint, data})

            if(res){
                setTextTranslated(res.translatedText)
            }

        }

    };

    return (
        <Grid 
            item 
            xs={12}  
            sx={{ width: "100%", mt:3, pb:3, borderRadius: 3, px: 3, cursor: 'pointer', backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
            onClick={() => navigate(`/post/${id}`)}
        >

            <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
                sx={{ border: 0 }}
            >
                <Grid item display='flex' xs={1} sx={{ border: 0, mr:2 }} justifyContent='center'>
                    <Box
                        component="img"
                        sx={{ 
                          maxWidth: '100%',
                          borderRadius: '50%',  
                        }}
                        alt="logo"
                        src={avatar}
                    />
                </Grid>
                
                <Grid item xs={10} sx={{ border: 0 }}>
                    
                    <Typography
                        variant="h5"
                        sx={{ textAlign: 'left', mt: 2, color: '#ffffff'}}
                    >
                        {name}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'left', mb: 1, color: '#d2d3d3' }}
                    >
                        {moment(moment.utc(date).local()).fromNow()}
                    </Typography>

                </Grid>

                <Grid item xs={4} alignSelf={'right'}
                    sx={{ border: 0, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel sx={{color:'#fff'}}>Lenguaje</InputLabel>
                        <Select
                            value={language}
                            label="languaje"
                            onChange={handleChange}
                            sx={{ color: '#ffffff'}}
                        >
                            <MenuItem value={'es'}>Original</MenuItem>
                            <MenuItem value={'en'}>Ingles</MenuItem>
                            <MenuItem value={'fr'}>Frances</MenuItem>
                            <MenuItem value={'de'}>Aleman</MenuItem>
                            <MenuItem value={'ja'}>Japones</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sx={{ border: 0 }}>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ textAlign: 'left', mt: 1, mb: 2, color: '#ffffff' }}
                    >
                        {textTranslated ? textTranslated : text}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ border: 0 }} alignSelf='center'>
                    <Box
                        component="img"
                        sx={{
                        height: "auto",
                        maxWidth: "100%",
                        borderRadius: '5px',  
                        }}
                        alt="Logo"
                        src={picture}
                    />

                </Grid>

                <Grid item xs={12} sx={{ border: 0}} alignSelf='center'>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ textAlign: 'left', mt: 1 }}
                    >
                        {labels.map((label, i) => {
                            return i < 10 ?
                            <Button
                                key={i}
                                variant="contained"
                                size="small"
                                sx={{ 
                                    mr: 1, 
                                    mt: 1,
                                    backgroundColor: '#d2d3d3', 
                                    color: '#000000',
                                    "&:hover": {
                                        backgroundColor: "#7a7b7c",
                                    },
                                    }}
                            >
                                {label}
                            </Button>
                            :
                            null
                            })}
                    </Typography>
                </Grid>

            </Grid>
        
        </Grid>
    )
}

export default PostPreview