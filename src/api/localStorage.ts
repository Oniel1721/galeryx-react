export const getItem = (prop:string)=>{
    return localStorage.getItem(prop)
}

export const setItem = (prop:string, value:string)=>{
    localStorage.setItem(prop, value)
}

export const removeItem = (prop:string)=>{
    localStorage.removeItem(prop)
}