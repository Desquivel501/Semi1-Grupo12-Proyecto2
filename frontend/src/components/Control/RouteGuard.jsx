import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../auth/authProvider"
import { getSession } from "../../auth/auth"
import { useEffect, useState } from "react"

function RouteGuard({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getCurrentUser = async () => {
        try {
            const user = await getSession()
            setUser(user)
        } catch (err) {
            // not logged in
            console.log(err)
            setUser(null)
        }
        }
        getCurrentUser()
    }, [])

//   console.log(user);

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default RouteGuard