import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';
import UserList from '../../components/UserList/UserList';
import { Grid } from '@mui/material';

function Friends() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getCurrentUser = async () => {
        try {
            const user = await getSession()
            setUser(user)
            if (user === null) {
                navigate('/')
            }
        } catch (err) {
            // not logged in
            console.log(err)
            setUser(null)
            navigate('/')
        }
        }
        getCurrentUser()
    }, [])
    
    return (
        <Grid
            display={'flex'}
            justifyContent={'center'}
        >
            <UserList />
            <UserList solicitudes={true}/>
        </Grid>
        
    )
}

export default Friends