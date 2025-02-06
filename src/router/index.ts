import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import BikesListView from "../views/BikesListView.vue";
import BikeDetailView from "../views/BikeDetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: HomeView },
      { path: "bikes", name: "BikesList", component: BikesListView },
      {
        path: "bike/:id",
        name: "BikeDetail",
        component: BikeDetailView,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
