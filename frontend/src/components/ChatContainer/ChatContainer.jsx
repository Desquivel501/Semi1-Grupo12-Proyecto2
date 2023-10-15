
import { 
    Grid,
    Paper,
    Box,
    Button,
    Typography,
    Avatar,
    TextField,
    Tooltip,
    IconButton,
} from '@mui/material';

import Comments from '../../components/Comments/Comments';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';

import conversation from '../../assets/conversation';

import Message from '../Message/Message';
import SendIcon from '@mui/icons-material/Send';

function ChatContainer() {

    const conversation_reverse = [...conversation].reverse()

    return (
        <Grid              
            xs={7}  
            sx={{ width: "100%", height: '100%', mt:2, pb:3, borderRadius: 3, px: 3, mx:1, backgroundColor: '#38393a' }}  
            component={Paper} 
        >
            <Grid
                xs={12}
                flexGrow={0}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="center"
                    sx={{ border: 0, my: 2, backgroundColor: "#737475", borderRadius: 3, py:1, pl:1 }}
                >
                    <Grid item display='flex' xs={2} sx={{ border: 0 }} justifyContent='center'>
                        <Box
                            component="img"
                            sx={{ 
                                maxWidth: '70%',
                                borderRadius: '50%', 
                            }}
                            alt="logo"
                            src='https://natusan.co.uk/cdn/shop/articles/natusan-blog-how-cat-years-work-header_600x600_crop_center.jpg?v=1674474680'
                        />
                    </Grid>
                    
                    <Grid item xs={7} sx={{ border: 0, pl:1 }}>
                        
                        <Typography
                            variant="h4"
                            sx={{ textAlign: 'left', color: '#ffffff'}}
                        >
                            Jane Smith
                        </Typography>

                    </Grid>

                </Grid>
            </Grid>

            <Grid
                xs={12}
                overflow={'auto'}
                sx={{ height: window.innerWidth < 1500 ? '57%' : '70%', px:1 }}
                display={'flex'}
                flexDirection={'column-reverse'}
            >
                {/* <Message
                    foto='https://natusan.co.uk/cdn/shop/articles/natusan-blog-how-cat-years-work-header_600x600_crop_center.jpg?v=1674474680'
                    message='Hi Michael, how are you doing today? Anything exciting happening? Thats great to hear'
                    date='2023-10-14 10:30:00'
                />

                <Message
                    foto='https://natusan.co.uk/cdn/shop/articles/natusan-blog-how-cat-years-work-header_600x600_crop_center.jpg?v=1674474680'
                    message='Hi Michael, how are you doing today?'
                    date='2023-10-14 10:30:00'
                    left={false}
                /> */}

                {
                    conversation_reverse.map((message, i) => (
                        <Message
                            key={i}
                            foto={message.Picture}
                            message={message.Message}
                            date={message.DateSent}
                            left={message.Side == 'Left'}
                        />
                    ))
                }

            </Grid>

            <Grid
                xs={12}
                sx = {{ my: 2, border:1, px:1, py:2, borderRadius: 3, backgroundColor: '#737475' }}
            >

                <Grid
                    container
                >
                    
                    <Grid item xs={11} sx={{ border: 0 }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline

                            fullWidth
                            sx={{borderRadius: 2, backgroundColor: '#909192' }}
                            placeholder="What's on your mind?"
                        />
                    </Grid>

                    <Grid item xs={1} sx={{ border: 0 }}>
                        <Tooltip title="Enviar">
                            <IconButton sx={{ color: 'white', display: 'block', }}>
                                <SendIcon fontSize='large'/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default ChatContainer 