import React from "react";
const AddItems = React.lazy(() => import("./views/admin/Admin/AddItems"));
const AskItems = React.lazy(() => import("./views/admin/Admin/AskItems"));
const AddUser = React.lazy(() => import("./views/admin/Admin/AddUser"));
const ManageUser = React.lazy(() => import("./views/admin/Admin/ManageUser"));

const Permissions = React.lazy(() => import("./views/admin/Admin/Permissions"));

// const Toaster = React.lazy(() =>
//   import("./views/notifications/toaster/Toaster")
// );
// const Tables = React.lazy(() => import("./views/base/tables/Tables"));

// const Breadcrumbs = React.lazy(() =>
//   import("./views/base/breadcrumbs/Breadcrumbs")
// );
// const Cards = React.lazy(() => import("./views/base/cards/Cards"));
// const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
// const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
// const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

// const Jumbotrons = React.lazy(() =>
//   import("./views/base/jumbotrons/Jumbotrons")
// );
// const ListGroups = React.lazy(() =>
//   import("./views/base/list-groups/ListGroups")
// );
// const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
// const Navs = React.lazy(() => import("./views/base/navs/Navs"));
// const Paginations = React.lazy(() =>
//   import("./views/base/paginations/Pagnations")
// );
// const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
// const ProgressBar = React.lazy(() =>
//   import("./views/base/progress-bar/ProgressBar")
// );
// const Switches = React.lazy(() => import("./views/base/switches/Switches"));

// const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
// const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
// const BrandButtons = React.lazy(() =>
//   import("./views/buttons/brand-buttons/BrandButtons")
// );
// const ButtonDropdowns = React.lazy(() =>
//   import("./views/buttons/button-dropdowns/ButtonDropdowns")
// );
// const ButtonGroups = React.lazy(() =>
//   import("./views/buttons/button-groups/ButtonGroups")
// );
// const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
// const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/admin/dashboard/Dashboard"));
// const CoreUIIcons = React.lazy(() =>
//   import("./views/icons/coreui-icons/CoreUIIcons")
// );
// const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
// const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
// const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
// const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
// const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
// const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
// const Typography = React.lazy(() =>
//   import("./views/theme/typography/Typography")
// );
// const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
// const Users = React.lazy(() => import("./views/users/Users"));
// const User = React.lazy(() => import("./views/users/User"));

// const AllProducts = React.lazy(() => import("./views/products/AllProducts"));
// const AddNewProducts = React.lazy(() =>
//   import("./views/products/AddNewProducts")
// );

const AddCategory = React.lazy(() =>
  import("./views/admin/category/AddCategory")
);
const CategoryList = React.lazy(() =>
  import("./views/admin/category/CategoryList")
);
const CategoryEdit = React.lazy(() =>
  import("./views/admin/category/EditCategory")
);

const AddTag = React.lazy(() => import("./views/admin/tag/AddTag"));
const TagList = React.lazy(() => import("./views/admin/tag/TagList"));
const TagEdit = React.lazy(() => import("./views/admin/tag/EditTag"));

const Logout = React.lazy(() => import("./views/admin/logout/Logout"));
const UserList = React.lazy(() => import("./views/admin/user"));
const ChangePassword = React.lazy(() =>
  import("./views/admin/user/Changepassword")
);
const UpdateProfile = React.lazy(() =>
  import("./views/admin/user/Updateprofile")
);
const EditUser = React.lazy(() => import("./views/admin/user/Edituser"));

const SurveyList = React.lazy(() => import("./views/admin/survey/survey"));
const AddSurvey = React.lazy(() =>
  import("./views/admin/survey/addSurvey/addsurvey")
);
const EditSurvey = React.lazy(() =>
  import("./views/admin/survey/editSurvey/editSurvey")
);
const ViewSurvey = React.lazy(() =>
  import("./views/admin/survey/viewSurvey/viewSurvey")
);

const AddRecommendation = React.lazy(() =>
  import("./views/admin/recommendation/addRecommendation/AddRecommendation")
);
const RecommendationList = React.lazy(() =>
  import("./views/admin/recommendation/Recommendation")
);
const EditRecommendation = React.lazy(() =>
  import("./views/admin/recommendation/editRecommendation/EditRecommendation")
);
//const ManageMedia = React.lazy(() => import('./views/admin/recommendation/ManageMedia'));

const Test = React.lazy(() => import("./views/admin/test/Test"));
// const Addquestion = React.lazy(() => import('./views/admin/question/Addquestion'));
// const Question = React.lazy(() => import('./views/admin/question/index'));
const Questionlist = React.lazy(() =>
  import("./views/admin/question/Questionlist")
);
// const Answer = React.lazy(() => import('./views/admin/question/Answer'));
const Editquestion = React.lazy(() =>
  import("./views/admin/question/edit question/Editquestion")
);
const surveypdf = React.lazy(() => import("./views/admin/survey/Pdf"));

const Addmembership = React.lazy(() =>
  import("./views/admin/membership/Addmembershiplavel")
);
const Listmembership = React.lazy(() =>
  import("./views/admin/membership/Listmembership")
);
const Editmembership = React.lazy(() =>
  import("./views/admin/membership/Editmembership")
);
const Testimoniallist = React.lazy(() =>
  import("./views/admin/testimonial/Testimoniallist")
);
const Mainslider = React.lazy(() =>
  import("./views/admin/mainslider/mainslider")
);

const routes = [
  // { path: '/',isPrivate:true, exact: true, name: 'Admin' },
  // { path: '/', name: 'Dashboard', component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  // { path: "/theme", name: "Theme", component: Colors, exact: true },
  // { path: "/theme/colors", name: "Colors", component: Colors },
  // { path: "/theme/typography", name: "Typography", component: Typography },
  // { path: "/base", name: "Base", component: Cards, exact: true },
  // { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  // { path: "/base/cards", name: "Cards", component: Cards },
  // { path: "/base/carousels", name: "Carousel", component: Carousels },
  // { path: "/base/collapses", name: "Collapse", component: Collapses },
  // { path: "/base/forms", name: "Forms", component: BasicForms },
  // { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  // { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  // { path: "/base/navbars", name: "Navbars", component: Navbars },
  // { path: "/base/navs", name: "Navs", component: Navs },
  // { path: "/base/paginations", name: "Paginations", component: Paginations },
  // { path: "/base/popovers", name: "Popovers", component: Popovers },
  // { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  // { path: "/base/switches", name: "Switches", component: Switches },
  // { path: "/base/tables", name: "Tables", component: Tables },
  // { path: "/base/tabs", name: "Tabs", component: Tabs },
  // { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  // { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  // { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  // {
  //   path: "/buttons/button-dropdowns",
  //   name: "Dropdowns",
  //   component: ButtonDropdowns,
  // },
  // {
  //   path: "/buttons/button-groups",
  //   name: "Button Groups",
  //   component: ButtonGroups,
  // },
  // {
  //   path: "/buttons/brand-buttons",
  //   name: "Brand Buttons",
  //   component: BrandButtons,
  // },
  // { path: "/charts", name: "Charts", component: Charts },
  // { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  // { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  // { path: "/icons/flags", name: "Flags", component: Flags },
  // { path: "/icons/brands", name: "Brands", component: Brands },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   component: Alerts,
  //   exact: true,
  // },
  // { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  // { path: "/notifications/badges", name: "Badges", component: Badges },
  // { path: "/notifications/modals", name: "Modals", component: Modals },
  // { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  // { path: "/widgets", name: "Widgets", component: Widgets },
  // { path: "/users", exact: true, name: "Users", component: Users },
  // { path: "/users/:id", exact: true, name: "User Details", component: User },

  // // { path: '/products', name: 'Products', component: AllProducts, exact: true },
  // // { path: '/products/all-products', name: 'All Products', component: AllProducts },
  // // { path: '/products/add-new-products', name: 'Add New Products', component: AddNewProducts },

  // { path: "/category", name: "category", component: AddCategory, exact: true },
  // {
  //   path: "/category/add-category",
  //   name: "Add Category",
  //   component: AddCategory,
  // },
  // {
  //   path: "/category/category-list",
  //   name: "Category List",
  //   component: CategoryList,
  // },
  // {
  //   path: "/category/category-edit/:id",
  //   name: "Category Edit",
  //   component: CategoryEdit,
  // },

  // { path: "/tag", name: "tag", component: AddTag, exact: true },
  // { path: "/tag/add-tag", name: "Add Tag", component: AddTag },
  // { path: "/tag/tag-list", name: "Tag List", component: TagList },
  // { path: "/tag/tag-edit/:id", name: "Tag Edit", component: TagEdit },

  // { path: "/logout", name: "Logout", component: Logout },
  // { path: "/add-user", name: "Add User", component: AddUser },
  // { path: "/user-list", name: "User List", component: UserList },
  {
    path: "/user/change-password",
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/user/update-profile",
    name: "Update Profile",
    component: UpdateProfile,
  },
  { path: "/user/edit-user/:id", name: "Update user", component: EditUser },

  { path: "/survey/survey-list", name: "Survey List", component: SurveyList },
  { path: "/survey/add-survey", name: "Survey Add", component: AddSurvey },
  {
    path: "/survey/edit-survey/:id",
    name: "Survey Edit",
    component: EditSurvey,
  },
  {
    path: "/survey/view-survey/:id",
    name: "Survey View",
    component: ViewSurvey,
  },

  {
    path: "/recommendation/recommendation-list",
    name: "Recommendation List",
    component: RecommendationList,
  },
  {
    path: "/recommendation/add-recommendation",
    name: "Recommendation Add",
    component: AddRecommendation,
  },
  {
    path: "/recommendation/edit-recommendation/:id",
    name: "Recommendation Edit",
    component: EditRecommendation,
  },
  //{ path: '/recommendation/media/:id', name: 'Manage Media', component: ManageMedia },

  { path: "/test/test", name: "test", component: Test },
  // { path: '/question/question-list/:id', name: 'Question', component: Question },
  {
    path: "/question/list-question/",
    name: "Question list",
    component: Questionlist,
  },
  // { path: '/question/add-question/:id', name: 'Add Question', component: Addquestion },
  {
    path: "/question/edit-question/:id",
    name: "Edit Question",
    component: Editquestion,
  },
  { path: "/survey-pdf/:id", name: "Survey pdf", component: surveypdf },
  // { path: '/question/manage-answer', name: 'Manage Answer', component:  Answer},
  { path: "/add-membership", name: "Add membership", component: Addmembership },
  {
    path: "/all-membership",
    name: "List membership",
    component: Listmembership,
  },
  {
    path: "/edit-membership",
    name: "Edit membership",
    component: Editmembership,
  },
  { path: "/testimonial", name: "Edit membership", component: Testimoniallist },
  { path: "/mainslider", name: "Edit slider", component: Mainslider },

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
];

export default routes;
