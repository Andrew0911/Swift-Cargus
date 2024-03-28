import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

function GuestLayout() {
    const {currentUser, userToken} = useStateContext();

    if(userToken) {
        return <Navigate to='/' />
    }
    
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default GuestLayout