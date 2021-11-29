import queryString from 'query-string';

//Signin API call
export const signin = user => {
    
    return fetch(`${process.env.REACT_APP_API_URL}/login`,{
        method:"POST",
        credentials: 'include',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:queryString.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('AuthData',JSON.stringify(data))
        next()
        //console.log(data);
    }
    
}

export const signout = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("AuthData");
    }
    next()
    
}