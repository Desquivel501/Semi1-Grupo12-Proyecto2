
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

import { useNavigate } from 'react-router-dom';

const loremIpsum  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis a elit egestas dictum id eget diam. Aenean nisi est, malesuada quis molestie nec, auctor id tortor. Proin vel diam id quam lacinia molestie. Sed elementum hendrerit nisi nec volutpat. Sed elementum, orci nec consequat hendrerit, erat elit vestibulum eros, a hendrerit urna tellus vel ex. Quisque pretium, orci nec rhoncus fermentum, justo lorem tincidunt turpis, sed pretium libero odio et nisl. Etiam ultricies massa eu tristique sodales. Suspendisse feugiat quis magna vel condimentum. Nulla consectetur fermentum pharetra. Quisque egestas libero aliquam, semper tellus sed, cursus leo. Vestibulum vel neque commodo, mattis sem a, viverra lacus. Cras sit amet vestibulum velit, et mattis odio. Nam nec malesuada odio. Praesent quam velit, mollis fringilla imperdiet eget, viverra non ipsum. In at ante mattis, vulputate nulla vitae, aliquet turpis. Donec lacinia mattis est, sit amet dictum tellus ultrices et. '

const labels = ['Landscape', 'Photography', 'Nature', 'Sunset', 'Green']

function PostPreview() {

    const navigate = useNavigate();

    return (
        <Grid 
            item 
            xs={12}  
            sx={{ width: "100%", mt:3, pb:3, borderRadius: 3, px: 3, cursor: 'pointer', backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
            onClick={() => navigate('/post/1')}
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
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                </Grid>
                
                <Grid item xs={10} sx={{ border: 0 }}>
                    
                    <Typography
                        variant="h5"
                        sx={{ textAlign: 'left', mt: 2, color: '#ffffff'}}
                    >
                        John Smith
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'left', mb: 1, color: '#d2d3d3' }}
                    >
                        6h ago
                    </Typography>

                </Grid>
                
                <Grid item xs={12} sx={{ border: 0 }}>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ textAlign: 'left', mt: 1, mb: 2, color: '#ffffff' }}
                    >
                        {loremIpsum}
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
                        src='https://images.unsplash.com/photo-1612441804231-77a36b284856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
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
                                variant="contained"
                                size="small"
                                sx={{ 
                                    mr: 1, 
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