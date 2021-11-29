import React from 'react'
import CIcon from '@coreui/icons-react'

const adminUrl = localStorage.getItem("ADMINURL");

const _navAuthor =  [
    {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: `${adminUrl}/dashboard`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      //text: 'NEW',
    }
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage User',
    route: `${adminUrl}/user`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add User',
        to: `${adminUrl}/add-user`,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User List',
        to: `${adminUrl}/user-list`,
      }
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Analyzer',
    route: `${adminUrl}/survey`,
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add analyzer',
        to: `${adminUrl}/survey/add-survey`,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'All analyzer',
        to: `${adminUrl}/survey/survey-list`,
      }
    ],
  },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Settings',
//     route: `${adminUrl}/tag`,
//     icon: 'cil-cursor',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Update Profile',
//         to: `${adminUrl}/user/update-profile`,
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Change Password',
//         to: `${adminUrl}/user/change-password`,
//       }
//     ],
//   },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: `${adminUrl}/logout`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',

    }
  }
]


export default _navAuthor
