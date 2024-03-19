import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
})

export const ContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({
        name: "Ionel",
        email: "Ionel@gmail.com"
    })
    const [userToken, setUserToken] = useState('1234')
    
    return (
        <StateContext.Provider value = {{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)

