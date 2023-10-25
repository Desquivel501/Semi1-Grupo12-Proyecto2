
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar,
    TextField,
    IconButton,
    Tooltip,
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../auth/authProvider";
import SendIcon from "@mui/icons-material/Send";

import { postData, sendFormData } from '../../api/api';
import Swal from 'sweetalert2';

const loremIpsum  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non felis a elit egestas dictum id eget diam. Aenean nisi est, malesuada quis molestie nec, auctor id tortor. Proin vel diam id quam lacinia molestie. Sed elementum hendrerit nisi nec volutpat. Sed elementum, orci nec consequat hendrerit, erat elit vestibulum eros, a hendrerit urna tellus vel ex. Quisque pretium, orci nec rhoncus fermentum, justo lorem tincidunt turpis, sed pretium libero odio et nisl. Etiam ultricies massa eu tristique sodales. Suspendisse feugiat quis magna vel condimentum. Nulla consectetur fermentum pharetra. Quisque egestas libero aliquam, semper tellus sed, cursus leo. Vestibulum vel neque commodo, mattis sem a, viverra lacus. Cras sit amet vestibulum velit, et mattis odio. Nam nec malesuada odio. Praesent quam velit, mollis fringilla imperdiet eget, viverra non ipsum. In at ante mattis, vulputate nulla vitae, aliquet turpis. Donec lacinia mattis est, sit amet dictum tellus ultrices et. '

const labels = ['Landscape', 'Photography', 'Nature', 'Sunset', 'Green']

function CreateComment(props) {

    const { id, onChange } = props;

    const { user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [text, setText] = useState('');

    const handleSubmit = async () => {

        console.log(id)

        const endpoint = `/posts/addComment`
        const data = {
            text: text,
            post: id,
            email: user.email
        }

        const res = await postData({endpoint, data})
        console.log(res)
        setText('')
        onChange(res)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ border: 0, my: 1, backgroundColor: "#737475", borderRadius: 3, py: 2 }}
        >

            <Grid item xs={11} sx={{ border: 0, pl: 1.5 }}>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    sx={{ borderRadius: 2, backgroundColor: "#909192" }}
                    placeholder="Comenta algo..."
                    onChange={(e)=>setText(e.target.value)}
                    value={text}
                />
            </Grid>

            <Grid item xs={1} sx={{ border: 0 }} 
                onClick={handleSubmit}
            >
                <Tooltip title="Enviar">
                    <IconButton sx={{ color: "white", display: "block" }}>
                    <SendIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Grid>
        
        </Grid>
    )
}

export default CreateComment