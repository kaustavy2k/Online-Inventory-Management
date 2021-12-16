import React from "react";
import CIcon from "@coreui/icons-react";
const user = JSON.parse(localStorage.getItem("client"));
let menu = [];
if (user.role === "admin") {
  menu = [
    {
      _tag: "CSidebarNavDropdown",
      name: "Admin",
      route: `/admin`,
      icon: "cil-cursor",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Permissions / Status",
          to: `/admin/permissions`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add Items",
          to: `/admin/add-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Ask For Items",
          to: `/admin/ask-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add User",
          to: `/admin/add-user`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Manage User",
          to: `/admin/manage`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Reports",
          to: `/admin/reports`,
        },
      ],
    },
  ];
} else if (user.role === "accountant") {
  menu = [
    {
      _tag: "CSidebarNavDropdown",
      name: "Accountant",
      route: `/accounts`,
      icon: "cil-cursor",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Make Payments",
          to: `accounts/payments`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Transaction History",
          to: `accounts/history`,
        },
      ],
    },
  ];
} else if (user.role === "inventory-in-charge") {
  menu = [
    {
      _tag: "CSidebarNavDropdown",
      name: "Inventory In-Charge",
      route: `/inventory`,
      icon: "cil-cursor",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Inventory",
          to: `/inventory/items`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add Inventory",
          to: `/inventory/add-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Report",
          to: `/inventory/reports`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "View Request",
          to: `/inventory/requests`,
        },
      ],
    },
  ];
} else if (user.role === "lab-in-charge") {
  menu = [
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
          name: "Status",
          to: `/lab/status`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Report",
          to: `/lab/report`,
        },
      ],
    },
  ];
} else {
  menu = [
    {
      _tag: "CSidebarNavDropdown",
      name: "Admin",
      route: `/admin`,
      icon: "cil-cursor",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Permissions / Status",
          to: `/admin/permissions`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add Items",
          to: `/admin/add-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Ask For Items",
          to: `/admin/ask-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add User",
          to: `/admin/add-user`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Manage User",
          to: `/admin/manage`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Reports",
          to: `/admin/reports`,
        },
      ],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Accountant",
      route: `/accounts`,
      icon: "cil-cursor",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Make Payments",
          to: `/accounts/payments`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Transaction History",
          to: `/accounts/history`,
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
          name: "Inventory",
          to: `/inventory/items`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Add Inventory",
          to: `/inventory/add-item`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Report",
          to: `/inventory/reports`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "View Request",
          to: `/inventory/requests`,
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
          name: "Status",
          to: `/lab/status`,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Report",
          to: `/lab/report`,
        },
      ],
    },
  ];
}
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: `admin/dashboard`,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  ...menu,
  {
    _tag: "CSidebarNavItem",
    name: "Update Profile",
    to: `/admin/update`,
    icon: "cil-cursor",
  },
];

export default _nav;
