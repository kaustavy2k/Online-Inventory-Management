import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DefaultProfile from "./avatar.png";

const TheHeaderDropdown = () => {
  // const localstoredata = JSON.parse(localStorage.getItem('AuthData'))
  // const username = localstoredata.data.name
  // const userimage = localstoredata.data.image
  // const userRole = localstoredata.data.admin_role.role_name
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <span style={{marginRight:"15px"}}><b>{} ({})</b></span>
     
        <div className="c-avatar">
         
          <CImg
            className="c-avatar-img"
           
            onError={i => (i.target.src = `${DefaultProfile}`)} 
          />
        </div>
      </CDropdownToggle>
    
    </CDropdown>
  )
}

export default TheHeaderDropdown
