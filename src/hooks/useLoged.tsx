import { useState } from "react";

import getLogedStatus from '../api/getLoged';


const useLoged = ()=>{
    const [loged, setLoged] = useState(getLogedStatus())


    const setLogin = (token:string)=>{
        localStorage.setItem('token', token)
        setLoged(getLogedStatus()) 
    }

    const setLogout = ()=>{
        console.log('llamado')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setLoged(getLogedStatus())
    }

    return {loged, setLogin, setLogout}
}

export default useLoged