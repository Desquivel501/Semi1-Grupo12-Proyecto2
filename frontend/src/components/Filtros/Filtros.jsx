import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import SearchBar from '../SearchBar/SearchBar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { useState } from "react";

function Filtros(props) {

    const {onChange, tags = []} = props;
    
    const [etiquetas, setEtiquetas] = useState(['All', 'Landscape', 'Photography', 'Nature', 'Sunset', 'Green'])
    const [categoria, setCategoria] = useState([])
    const [search, setSearch] = useState("")


    const changeCategory = (event) => {
        // console.log(event.target.id)        
        
        var found = false
        for (var i = 0; i < categoria.length; i++){
            if(categoria[i] == event.target.id){
                found = true
                categoria.splice(i, 1)
                break;
            } 
        }
        if(!found){
            categoria.push(event.target.id)
        }

        onChange(
            {
                keyword: search,
                categorias: categoria
            }
        )
    }

    const handlePress = (text) => {
        setCategoria([])
        setSearch(text)
        onChange(
            {
                keyword: text,
                categorias: categoria
            }
        )
    }

    const filterTags = (tag) => {
        
        const str = tag.toLowerCase();
        const substr = search.toLowerCase();

        if (!str.includes(substr)) {
            return false;
        }
        return true;
    }

    const checkColor = {
        color: '#afafb0',
            '&.Mui-checked': {
            color: '#fff',
            }
    }

    return (
        <Grid
            item
            xs={12}
            sx={{border:0}}
            
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ border:0, pt:5, borderRadius: 3, backgroundColor: '#38393a' }}
                component={Paper}
                elevation={6}
            >

                <SearchBar onSearch={handlePress}/>

                <Divider variant="middle" sx={{my:2, width:'90%'}}/>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ border:0, mb:2}}
                    
                >
                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{border:0, mb:1}}
                    >
                        <Typography variant="h5" component="h5" align='center' 
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                            }}>
                            Etiquetas
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{border:0, mb:1, ml:2.5, pl:1.5}}
                        maxHeight='500px'
                        overflow={'auto'}
                    >
                        <FormGroup>

                            <FormControlLabel
                                key={0}
                                control={
                                    <Checkbox
                                        sx={checkColor}
                                        id='All'
                                        onChange={changeCategory}
                                    />
                                }
                                label='All'
                                sx={{color: '#fff'}}
                            />

                            {
                                tags.map((etiqueta, i) => (
                                    filterTags(etiqueta) ?
                                    <FormControlLabel
                                        key={i}
                                        control={
                                            <Checkbox
                                                sx={checkColor}
                                                id={etiqueta}
                                                onChange={changeCategory}
                                            />
                                        }
                                        label={etiqueta}
                                        sx={{color: '#fff'}}
                                    />
                                    :
                                    <></>
                                ))
                            }
                        </FormGroup>
                    </Grid>

                </Grid>


            </Grid>
        </Grid>
        
    );
}

export default Filtros