import AddItems from "./views/admin/Admin/AddItems";
import AskItems from "./views/admin/Admin/AskItems";
import AddUser from "./views/admin/Admin/AddUser";
import ManageUser from "./views/admin/Admin/ManageUser";
import Reports from "./views/admin/Admin/Reports";
import Permissions from "./views/admin/Admin/Permissions";

import RequestItems from "./views/admin/Lab/RequestItems";
import Status from "./views/admin/Lab/Status";
import Alert from "./views/admin/Lab/Alert";

import Payments from "./views/admin/Accountant/Payments";
import Transactionlist from "./views/admin/Accountant/Transactionlists";

import AddInventory from "./views/admin/Inventory/AddInventory";
import InventoryReports from "./views/admin/Inventory/InventoryReports";
import InventoryPermissions from "./views/admin/Inventory/InventoryPermissions";
import ShowInventory from "./views/admin/Inventory/ShowInventory";
import Dashboard from "./views/admin/Dashboard/Dashboard";
import UpdateProfile from "./views/admin/UpdateProfile/Update";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    role: [
      "admin",
      "lab-in-charge",
      "accountant",
      "inventory-in-charge",
      "superadmin",
    ],
  },
  {
    path: "/admin/add-item",
    name: "Add Item",
    component: AddItems,
    role: ["admin"],
  },
  {
    path: "/admin/ask-item",
    name: "Ask Item",
    component: AskItems,
    role: ["admin"],
  },
  {
    path: "/admin/permissions",
    name: "Permissions/Status",
    component: Permissions,
    role: ["admin"],
  },
  {
    path: "/admin/add-user",
    name: "Add User",
    component: AddUser,
    role: ["admin"],
  },
  {
    path: "/admin/manage",
    name: "Manage User",
    component: ManageUser,
    role: ["admin"],
  },
  {
    path: "/admin/reports",
    name: "Reports",
    component: Reports,
    role: ["admin"],
  },

  {
    path: "/lab/request",
    name: "Request Items",
    component: RequestItems,
    role: ["lab-in-charge"],
  },
  {
    path: "/lab/status",
    name: "Status",
    component: Status,
    role: ["lab-in-charge"],
  },
  {
    path: "/lab/report",
    name: "Report",
    component: Alert,
    role: ["lab-in-charge"],
  },
  {
    path: "/accounts/payments",
    name: "Payments",
    component: Payments,
    role: ["accountant"],
  },
  {
    path: "/accounts/history",
    name: "Transaction history",
    component: Transactionlist,
    role: ["accountant"],
  },

  {
    path: "/inventory/add-item",
    name: "Add Inventory",
    component: AddInventory,
    role: ["inventory-in-charge"],
  },
  {
    path: "/inventory/requests",
    name: "View Requests",
    component: InventoryPermissions,
    role: ["inventory-in-charge"],
  },
  {
    path: "/inventory/reports",
    name: "Add Report",
    component: InventoryReports,
    role: ["inventory-in-charge"],
  },
  {
    path: "/inventory/items",
    name: "My Inventory",
    component: ShowInventory,
    role: ["inventory-in-charge"],
  },
  {
    path: "/admin/update",
    name: "Update Profile",
    component: UpdateProfile,
    role: [
      "admin",
      "lab-in-charge",
      "accountant",
      "inventory-in-charge",
      "superadmin",
    ],
  },
];

export default routes;
