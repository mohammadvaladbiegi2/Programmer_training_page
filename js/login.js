import { getme, login } from "./auth.js";
const login_btn = document.querySelector("#login_btn");

login_btn.addEventListener("click", (e) => {
  e.preventDefault();

  login();
});
