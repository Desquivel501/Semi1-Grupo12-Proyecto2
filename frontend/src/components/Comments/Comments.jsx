
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar
} from '@mui/material';

import Comment from '../Comment/Comment';
import CreateComment from '../CreateComment/CreateComment';
import { AuthContext } from "../../auth/authProvider";
import { getData } from '../../api/api';

function Comments(props) {

    const { id } = props; 
    const { user} = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const start = async () => {
            try {
               
                const endpoint = `/posts/${id}/comments`

                const res = await getData({endpoint})
                console.log(res)

                if(Array.isArray(res)){
                    setComments(res)
                }


            } catch (err) {
                // not logged in
                console.log(err)
            }
        }
        start()
    }, [count])

    const updateComments = (comment) => {
        setCount(count + 1)
    }

    return (
        <Grid 
            item 
            xs={12}  
            sx={{ width: "100%", mt:2, pb:3, borderRadius: 3, px: 3, cursor: 'pointer', backgroundColor: '#38393a' }}  
            component={Paper} 
            justifyContent='center'
        >
            <Typography
                variant="h5"
                sx={{ textAlign: 'left', mt: 1, color: '#ffffff'}}
            >
                Comentarios
            </Typography>

            <CreateComment id={id} onChange={updateComments}/>
            
            {comments.map((comment, i) => (
                <Comment 
                    key={i}
                    nombre={comment.name + " " + comment.family_name}
                    comentario={comment.content}
                    foto={comment.avatar}
                    date={comment.date}
                />
            ))}
            
        </Grid>
    )
}

export default Comments