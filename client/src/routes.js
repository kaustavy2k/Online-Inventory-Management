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

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/admin/add-item",
    name: "Add Item",
    component: AddItems,
  },
  {
    path: "/admin/ask-item",
    name: "Ask Item",
    component: AskItems,
  },
  {
    path: "/admin/permissions",
    name: "Permissions/Status",
    component: Permissions,
  },
  {
    path: "/admin/add-user",
    name: "Add User",
    component: AddUser,
  },
  {
    path: "/admin/manage",
    name: "Manage User",
    component: ManageUser,
  },
  {
    path: "/admin/reports",
    name: "Reports",
    component: Reports,
  },

  {
    path: "/lab/request",
    name: "Request Items",
    component: RequestItems,
  },
  {
    path: "/lab/status",
    name: "Status",
    component: Status,
  },
  {
    path: "/lab/report",
    name: "Report",
    component: Alert,
  },
  {
    path: "/accounts/payments",
    name: "Payments",
    component: Payments,
  },
  {
    path: "/accounts/history",
    name: "Transaction history",
    component: Transactionlist,
  },

  {
    path: "/inventory/add-item",
    name: "Add Inventory",
    component: AddInventory,
  },
  {
    path: "/inventory/requests",
    name: "View Requests",
    component: InventoryPermissions,
  },
  {
    path: "/inventory/reports",
    name: "Add Report",
    component: InventoryReports,
  },
  {
    path: "/inventory/items",
    name: "My Inventory",
    component: ShowInventory,
  },
];

export default routes;
