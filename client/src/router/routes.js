import loginPage from "../pages/Login.vue";
import registerPage from "../pages/Register.vue";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";

export const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        meta: { isAuth: true },
        component: UserProfile
      },
      {
        path: "auth",
        name: "Login",
        component: loginPage
      },
      {
        path: "register",
        name: "Sign up",
        component: registerPage
      }
    ]
  }
  // {
  //   path: "/",
  //   name: "index",
  //   component: homePage,
  //   meta: { title: `${DOMAIN_TITLE} | home` }
  // },
  // {
  //   path: '/news',
  //   name: 'news',
  //   component: newsPage,
  //   meta: { title: `${DOMAIN_TITLE} | news` },
  //   props: routePropResolver
  // },
  // {
  //   path: '/profile',
  //   component: profilePage,
  //   meta: { isAuth: true, title: `${DOMAIN_TITLE} | profile` },
  // children: [
  //   {
  //     path: '',
  //     name: 'profile',
  //     component: profilePostsPage
  //   }
  // ]
  // },
  // {
  //   path: "/auth",
  //   name: "login",
  //   component: loginPage,
  //   meta: { title: `${DOMAIN_TITLE} | login` }
  // },
  // {
  //   path: "*",
  //   component: notFoundPage,
  //   meta: { title: `${DOMAIN_TITLE} | not found` }
  // }
];
