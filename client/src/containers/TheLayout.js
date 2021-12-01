import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
const TheLayout = (props) => {
// if(retrieveAuthData!==null)
// {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar {...props}/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent {...props}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}
// else
// {
//   return(
//     <Redirect to={redirectUrl} />
//   )
// }
  
//}

export default TheLayout
