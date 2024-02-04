import { getme } from "../auth.js";
import { getToken } from "../utils.js";

window.addEventListener("load", () => {
  let home_notfications = document.getElementById("home_notfications");
  let home_notfications_btn = document.getElementById("home_notfications_btn");
  let notfications = document.querySelector(".home-notification-modal-list");
  let shownotifaction = false;
  const admin_name = document.getElementById("admin-name");
  const profile_image = document.getElementById("profile-image");
  let token = getToken();
  const seeNotifactionHandler = (id) => {
    // fetch(`http://localhost:3501/v1/notifications/see/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Brearer ${token}`,
    //   },
    // });
    alert("دیدم");
  };

  getme().then((data) => {
    console.log(data);
    if (data.role !== "ADMIN") {
      location.replace("../../index.html");
    }

    admin_name.innerHTML = data.username;
    profile_image.setAttribute("src", "../../images/IMG_1090_11zon.jpg");
    if (data.notifications.length) {
      data.notifications.map((messege) => {
        notfications.insertAdjacentHTML(
          "beforeend",
          `
          <li class="home-notification-modal-item">
          <span class="home-notification-modal-text">${messege.msg}</span>
          <label class="switch">
            
            <a href="#" onclick="seeNotifactionHandler('${messege._id}')">دیدم</a>
          </label>
        </li>
              `
        );
      });
    } else {
      notfications.innerHTML = ` <div class="alert alert-danger text-center">پیغامی وجود ندارد </div> `;
    }
  });
  window.seeNotifactionHandler = seeNotifactionHandler;
  home_notfications_btn.addEventListener("click", () => {
    shownotifaction = !shownotifaction;
    if (shownotifaction) {
      home_notfications.classList.add("active-modal-notfication");
    } else {
      home_notfications.classList.remove("active-modal-notfication");
    }
  });
});
