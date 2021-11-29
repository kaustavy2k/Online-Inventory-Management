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
        name: "Requested Items",
        to: `/inventory/provide`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Alert",
        to: `/inventory/alert`,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Inventory",
        to: `/inventory/items`,
      },
    ],
  },
];

export default _nav;
