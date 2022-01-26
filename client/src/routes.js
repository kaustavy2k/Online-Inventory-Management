import React from "react";
const AddItems = React.lazy(() => import("./views/admin/Admin/AddItems"));
const AskItems = React.lazy(() => import("./views/admin/Admin/AskItems"));
const AddUser = React.lazy(() => import("./views/admin/Admin/AddUser"));
const ManageUser = React.lazy(() => import("./views/admin/Admin/ManageUser"));
const Reports = React.lazy(() => import("./views/admin/Admin/Reports"));
const Permissions = React.lazy(() => import("./views/admin/Admin/Permissions"));

const RequestItems = React.lazy(() => import("./views/admin/Lab/RequestItems"));
const Status = React.lazy(() => import("./views/admin/Lab/Status"));
const Alert = React.lazy(() => import("./views/admin/Lab/Alert"));

const Payments = React.lazy(() => import("./views/admin/Accountant/Payments"));
const Transactionlist = React.lazy(() =>
  import("./views/admin/Accountant/Transactionlists")
);

const AddInventory = React.lazy(() =>
  import("./views/admin/Inventory/AddInventory")
);
const InventoryReports = React.lazy(() =>
  import("./views/admin/Inventory/InventoryReports")
);
const InventoryPermissions = React.lazy(() =>
  import("./views/admin/Inventory/InventoryPermissions")
);
const ShowInventory = React.lazy(() =>
  import("./views/admin/Inventory/ShowInventory")
);
const Dashboard = React.lazy(() => import("./views/admin/Dashboard/Dashboard"));
const UpdateProfile = React.lazy(() =>
  import("./views/admin/UpdateProfile/Update")
);
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    role: JSON.parse(localStorage.getItem("client")).role,
  },
  {
    path: "/admin/add-item",
    name: "Add Item",
    component: AddItems,
    role: "admin",
  },
  {
    path: "/admin/ask-item",
    name: "Ask Item",
    component: AskItems,
    role: "admin",
  },
  {
    path: "/admin/permissions",
    name: "Permissions/Status",
    component: Permissions,
    role: "admin",
  },
  {
    path: "/admin/add-user",
    name: "Add User",
    component: AddUser,
    role: "admin",
  },
  {
    path: "/admin/manage",
    name: "Manage User",
    component: ManageUser,
    role: "admin",
  },
  {
    path: "/admin/reports",
    name: "Reports",
    component: Reports,
    role: "admin",
  },

  {
    path: "/lab/request",
    name: "Request Items",
    component: RequestItems,
    role: "lab-in-charge",
  },
  {
    path: "/lab/status",
    name: "Status",
    component: Status,
    role: "lab-in-charge",
  },
  {
    path: "/lab/report",
    name: "Report",
    component: Alert,
    role: "lab-in-charge",
  },
  {
    path: "/accounts/payments",
    name: "Payments",
    component: Payments,
    role: "accountant",
  },
  {
    path: "/accounts/history",
    name: "Transaction history",
    component: Transactionlist,
    role: "accountant",
  },

  {
    path: "/inventory/add-item",
    name: "Add Inventory",
    component: AddInventory,
    role: "inventory-in-charge",
  },
  {
    path: "/inventory/requests",
    name: "View Requests",
    component: InventoryPermissions,
    role: "inventory-in-charge",
  },
  {
    path: "/inventory/reports",
    name: "Add Report",
    component: InventoryReports,
    role: "inventory-in-charge",
  },
  {
    path: "/inventory/items",
    name: "My Inventory",
    component: ShowInventory,
    role: "inventory-in-charge",
  },
  {
    path: "/admin/update",
    name: "Update Profile",
    component: UpdateProfile,
    role: JSON.parse(localStorage.getItem("client")).role,
  },
];

export default routes;
