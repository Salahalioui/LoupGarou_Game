import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

store
  .dispatch("initDB")
  .then(() => {
    app.use(store).use(router).mount("#app");
  })
  .catch((error) => {
    console.error("Failed to initialize the database:", error);
  });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("Service worker registered: ", registration);
      },
      (error) => {
        console.log("Service worker registration failed: ", error);
      }
    );
  });
}
