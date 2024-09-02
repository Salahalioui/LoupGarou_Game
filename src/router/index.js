import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoleLibrary from "../views/RoleLibrary.vue";
import PlayerLibrary from "../views/PlayerLibrary.vue";
import GameManagement from "../views/GameManagement.vue";
import AboutView from "@/views/AboutView.vue"; // Import the new view

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView, // Add the new route
  },
  {
    path: "/roles",
    name: "Roles",
    component: RoleLibrary,
  },
  {
    path: "/players",
    name: "Players",
    component: PlayerLibrary,
  },
  {
    path: "/game",
    name: "Game",
    component: GameManagement,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
