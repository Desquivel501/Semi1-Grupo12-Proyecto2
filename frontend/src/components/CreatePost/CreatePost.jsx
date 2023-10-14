
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar,
    TextField,
    IconButton
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';

const loremIpsum  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis a elit egestas dictum id eget diam. Aenean nisi est, malesuada quis molestie nec, auctor id tortor. Proin vel diam id quam lacinia molestie. Sed elementum hendrerit nisi nec volutpat. Sed elementum, orci nec consequat hendrerit, erat elit vestibulum eros, a hendrerit urna tellus vel ex. Quisque pretium, orci nec rhoncus fermentum, justo lorem tincidunt turpis, sed pretium libero odio et nisl. Etiam ultricies massa eu tristique sodales. Suspendisse feugiat quis magna vel condimentum. Nulla consectetur fermentum pharetra. Quisque egestas libero aliquam, semper tellus sed, cursus leo. Vestibulum vel neque commodo, mattis sem a, viverra lacus. Cras sit amet vestibulum velit, et mattis odio. Nam nec malesuada odio. Praesent quam velit, mollis fringilla imperdiet eget, viverra non ipsum. In at ante mattis, vulputate nulla vitae, aliquet turpis. Donec lacinia mattis est, sit amet dictum tellus ultrices et. '

const labels = ['Landscape', 'Photography', 'Nature', 'Sunset', 'Green']

function CreatePost() {

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();


    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile();
          return;
        }
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        if (!selectedFile) {
          setPreview();
          return;
        }
    
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);


    return (
        <Grid 
            item 
            xs={12}  
            sx={{ width: "100%", mt:3, pb:3, borderRadius: 3, px: 3, cursor: 'pointer', backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
        >

            <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
                sx={{ border: 0 }}
            >
                <Grid item display='flex' xs={1} sx={{ border: 0, pr:2 }} justifyContent='center'>
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

                <Grid item xs={11} sx={{ border: 0 }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ mt: 2, borderRadius: 2, backgroundColor: '#909192' }}
                        placeholder="What's on your mind?"
                    />
                </Grid>


                {preview && (
                    <Grid item xs={12} sx={{ border: 0 }}>
                        <Box
                            component="img"
                            sx={{ 
                            mt: 2,
                            maxWidth: '100%',
                            borderRadius: '5px',  
                            }}
                            alt="logo"
                            src={preview}
                        />
                    </Grid>
                )}
                

                <Grid item display='flex' xs={12} sx={{ border: 0 }} justifyContent='right'>


                    <Button variant="contained" startIcon={<AttachFileIcon />}
                        sx={{backgroundColor: '#3f51b5', color: '#ffffff', mx:1, mt:2}}
                        component="label">
                        Upload image
                        <input
                            type="file"
                            id="file"
                            hidden
                            onChange={onSelectFile}
                            accept=".png, .jpeg, .jpg"
                            name="imagen"
                          />
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#3f51b5', color: '#ffffff', mx:1, mt:2}}
                    >
                        Post
                    </Button>  
                </Grid>
                

            </Grid>
        
        </Grid>
    )
}

export default CreatePost