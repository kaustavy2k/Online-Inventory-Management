import React from 'react'
import axios from "axios";

import { useHistory } from "react-router-dom";
import { token } from "../token";
const Logout = (props) => {
    let history = useHistory()

    //console.log('logout',localStorage.removeItem('AuthData'));
    //console.log('token',token())
   // return false
    

    axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/logout`,
    headers: {
      Bearer: token(),
    },
  }).then((res) => {
    localStorage.removeItem('AuthData');
    window.location.href='/admin/login';

  }).catch((err) => {
    console.log(err);
  });

   

    
    //history.push("/admin/login");
}

export default Logout;
