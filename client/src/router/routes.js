import LoginPage from "../pages/Login.vue";
import RegisterPage from "../pages/Register.vue";


import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Vacation from "@/pages/Vacation/Index.vue";
import { EditProfileForm, UserCard } from "@/pages";

export const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: { isAuth: true },
        component: Dashboard
      },
      {
        path: "/user",
        component: UserProfile,
        name: "User Profile",
        redirect: { name: "View Profile"},
        meta: { isAuth: true },
        children: [
          {
            path: "view",
            name: "View Profile",
            component: UserCard
          },
          {
            path: "edit",
            name: "Edit Profile",
            component: EditProfileForm
          }
        ]
      },
      {
        path: "vacation",
        name: "Vacation",
        meta: { isAuth: true },
        component: Vacation
      },
      {
        path: "auth",
        name: "Login",
        component: LoginPage
      },
      {
        path: "register",
        name: "Sign up",
        component: RegisterPage
      }
    ]
  }
];
