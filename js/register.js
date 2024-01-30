import { register } from "./auth.js";

const registerbtn = document.querySelector("#register-btn");

registerbtn.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
