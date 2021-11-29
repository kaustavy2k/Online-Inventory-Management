import React from "react";
import CIcon from "@coreui/icons-react";

const adminUrl = localStorage.getItem("ADMINURL");

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: `/dashboard`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      //text: 'NEW',
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Manage Topic",
    route: `${adminUrl}/category`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Topic",
        to: `${adminUrl}/category/add-category`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "All Topic",
        to: `${adminUrl}/category/category-list`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Manage keyword",
    route: `${adminUrl}/tag`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add keyword",
        to: `${adminUrl}/tag/add-tag`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "All keyword",
        to: `${adminUrl}/tag/tag-list`,
      },
    ],
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Manage User',
  //   to: `${adminUrl}/user-list`,
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  //   badge: {
  //     color: 'info'
  //   }
  // },
  {
    _tag: "CSidebarNavDropdown",
    name: "Manage User",
    route: `${adminUrl}/user`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add User",
        to: `${adminUrl}/add-user`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "User List",
        to: `${adminUrl}/user-list`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Manage Analyzer",
    route: `${adminUrl}/survey`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add analyzer",
        to: `${adminUrl}/survey/add-survey`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "All analyzer",
        to: `${adminUrl}/survey/survey-list`,
      },
    ],
  },
  ,
  {
    _tag: "CSidebarNavDropdown",
    name: "Recommendation",
    route: `${adminUrl}/recommendation`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Recommendation",
        to: `${adminUrl}/recommendation/add-recommendation`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "All Recommendation",
        to: `${adminUrl}/recommendation/recommendation-list`,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Manage Question",
    to: `${adminUrl}/question/list-question`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Manage Membership Level",
    route: `${adminUrl}/category`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add Membership Level",
        to: `${adminUrl}/add-membership`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "All Membership Level",
        to: `${adminUrl}/all-membership`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "CMS",
    route: `${adminUrl}/category`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Testimonials",
        to: `${adminUrl}/testimonial`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Main Slider",
        to: `${adminUrl}/mainslider`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Settings",
    route: `${adminUrl}/tag`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Update Profile",
        to: `${adminUrl}/user/update-profile`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Change Password",
        to: `${adminUrl}/user/change-password`,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: `${adminUrl}/logout`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: `admin/dashboard`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      //text: 'NEW',
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Admin",
    route: `/admin`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Permissions",
        to: `/admin/permissions`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Items",
        to: `/admin/add-item`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Lab In-Charge",
    route: `/lab`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Request Item",
        to: `/lab/request`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Damage Report",
        to: `/lab/report`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Accounts",
    route: `/accounts`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Payments",
        to: `accounts/payments`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Payment History",
        to: `accounts/history`,
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Inventory In-Charge",
    route: `/inventory`,
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Provide Items",
        to: `/inventory/provide`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Alert",
        to: `/inventory/alert`,
      },
    ],
  },
];

// const _nav =  [
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     }
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Theme']
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Colors',
//     to: '/theme/colors',
//     icon: 'cil-drop',
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Typography',
//     to: '/theme/typography',
//     icon: 'cil-pencil',
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Components']
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Base',
//     route: '/base',
//     icon: 'cil-puzzle',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Breadcrumb',
//         to: '/base/breadcrumbs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Cards',
//         to: '/base/cards',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Carousel',
//         to: '/base/carousels',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Collapse',
//         to: '/base/collapses',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Forms',
//         to: '/base/forms',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Jumbotron',
//         to: '/base/jumbotrons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'List group',
//         to: '/base/list-groups',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Navs',
//         to: '/base/navs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Navbars',
//         to: '/base/navbars',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Pagination',
//         to: '/base/paginations',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Popovers',
//         to: '/base/popovers',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Progress',
//         to: '/base/progress-bar',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Switches',
//         to: '/base/switches',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tables',
//         to: '/base/tables',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tabs',
//         to: '/base/tabs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tooltips',
//         to: '/base/tooltips',
//       },
//     ],
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Buttons',
//     route: '/buttons',
//     icon: 'cil-cursor',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Buttons',
//         to: '/buttons/buttons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Brand buttons',
//         to: '/buttons/brand-buttons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Buttons groups',
//         to: '/buttons/button-groups',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Dropdowns',
//         to: '/buttons/button-dropdowns',
//       }
//     ],
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Charts',
//     to: '/charts',
//     icon: 'cil-chart-pie'
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Icons',
//     route: '/icons',
//     icon: 'cil-star',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'CoreUI Free',
//         to: '/icons/coreui-icons',
//         badge: {
//           color: 'success',
//           text: 'NEW',
//         },
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'CoreUI Flags',
//         to: '/icons/flags',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'CoreUI Brands',
//         to: '/icons/brands',
//       },
//     ],
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Notifications',
//     route: '/notifications',
//     icon: 'cil-bell',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Alerts',
//         to: '/notifications/alerts',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Badges',
//         to: '/notifications/badges',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Modal',
//         to: '/notifications/modals',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Toaster',
//         to: '/notifications/toaster'
//       }
//     ]
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Widgets',
//     to: '/widgets',
//     icon: 'cil-calculator',
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },
//   {
//     _tag: 'CSidebarNavDivider'
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Extras'],
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Pages',
//     route: '/pages',
//     icon: 'cil-star',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Login',
//         to: '/login',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Register',
//         to: '/register',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Error 404',
//         to: '/404',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Error 500',
//         to: '/500',
//       },
//     ],
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Disabled',
//     icon: 'cil-ban',
//     badge: {
//       color: 'secondary',
//       text: 'NEW',
//     },
//     addLinkClass: 'c-disabled',
//     'disabled': true
//   },
//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Labels']
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label danger',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-danger'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label info',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-info'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label warning',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-warning'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   }
// ]

export default _nav;
