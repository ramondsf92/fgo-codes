import Vue from "vue";
import App from "./App";
import "bootstrap";
import "./assets/app.scss";
import "./css/all.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
