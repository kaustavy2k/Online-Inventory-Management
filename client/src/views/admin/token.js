export const token = () =>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem('AuthData')){
        const localstoredata = JSON.parse(localStorage.getItem('AuthData'))
        const token = localstoredata.token;
        return token
    }else{
        return false
    }
    
}