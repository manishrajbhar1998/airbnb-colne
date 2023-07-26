import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [isReady,setIsReady] = useState(false);
    useEffect(()=>{
        fetchCookieData()
    },[])

    const fetchCookieData = async () => {
        if(!user){
            setIsReady(true)
            const sessionData = JSON.parse(sessionStorage.getItem("airbndUser"));
            console.log("value ",sessionData?.token);
            const {data} = await axios.post('/profile',{token:sessionData?.token});
            setUser(data);
            setIsReady(false)

        }
    }
    return (
        <UserContext.Provider value={{user,setUser,isReady}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;