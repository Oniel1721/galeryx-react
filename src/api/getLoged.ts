const getLogedStatus = ()=>{
    return localStorage.getItem('token')?true:false
}

export default getLogedStatus