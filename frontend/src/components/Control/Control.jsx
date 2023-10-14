// import { Navigate, Outlet } from "react-router-dom";
// import { getSession } from "../../auth/auth";

import { useState, useContext, useEffect} from "react"
import { AuthContext } from "../../auth/authProvider";
import { Navigate, Outlet } from "react-router-dom";

import { getSession } from "../../auth/auth";

export function ControlLogin(){
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await getSession()
                // console.log(user);
                setUser(user)
            } catch (err) {
                // not logged in
                // console.log("here")
                console.log(err)
                setUser(null)
            }
        }
        getCurrentUser()
    }, [])


    return user ? <Outlet /> : <Navigate to="/" />;
}

