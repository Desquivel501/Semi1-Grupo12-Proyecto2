import * as React from 'react';
import { 
    Grid,
    Box,
 } from '@mui/material';
 import PostPreview from '../../components/PostPreview/PostPreview';
 import CreatePost from '../../components/CreatePost/CreatePost';
 import Filtros from '../../components/Filtros/Filtros';

function Home() {
    return (
        <>

            <Box
                component="main"
                display="flex"
                width="100%"
                sx={{
                    flexGrow: 1,
                    border: 0,
                    borderColor: 'primary.main',
                    mt:'70px',
                }}
                justifyContent='center'
            >

                <Grid
                    container
                    spacing={3}
                    sx={{ width: "30%", mx: 1}}
                    alignItems="top"
                    justifyContent="center"
                >
                    <Filtros />
       
                </Grid>
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "80%", mx: 1}}
                    alignItems="top"
                    justifyContent="center"
                >
                    <CreatePost />
                    
                    <PostPreview />

                    <PostPreview />

                    <PostPreview />
                
                </Grid>

                

            </Box>
        </>
    )
}

export default Home