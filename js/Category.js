import { insertCoursboxHTML, getAndShowAllcourses } from "./share.js";

window.addEventListener("load", async () => {
  let layot = "row";
  const layot_btn = document.querySelectorAll(".layot_btn");
  getAndShowAllcourses().then((data) => insertCoursboxHTML(layot, data));
  // handel layot cart cours
  layot_btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(String(e.target.className).includes("row"));
      layot_btn.forEach((icon) =>
        icon.classList.remove("courses-top-bar__icon--active")
      );
      e.target.classList.add("courses-top-bar__icon--active");
      if (String(e.target.className).includes("row")) {
        layot = "row";
        getAndShowAllcourses().then((data) => insertCoursboxHTML(layot, data));
      } else {
        layot = "colume";
        getAndShowAllcourses().then((data) => insertCoursboxHTML(layot, data));
      }
    });
  });
  // handel filtercours selectBox
  const selectbox = document.querySelectorAll(
    ".courses-top-bar__selection-item"
  );
  const selectboxTitle = document.querySelector(
    ".courses-top-bar__selection-title"
  );
  selectbox.forEach((select) => {
    select.addEventListener("click", (e) => {
      selectbox.forEach((active) => {
        active.classList.remove("courses-top-bar__selection-item--active");
      });
      e.target.classList.add("courses-top-bar__selection-item--active");
      selectboxTitle.innerHTML = "";
      selectboxTitle.insertAdjacentHTML(
        "beforeend",
        `
      ${e.target.innerHTML}
      <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
      `
      );
      switch (e.target.dataset.key) {
        case "defult":
          getAndShowAllcourses().then((data) =>
            insertCoursboxHTML(layot, data)
          );
          break;
        case "last":
          getAndShowAllcourses().then((data) =>
            insertCoursboxHTML(layot, [...data].reverse())
          );
          break;
        case "first":
          getAndShowAllcourses().then((data) =>
            insertCoursboxHTML(layot, data)
          );
          break;

        default:
          getAndShowAllcourses().then((data) =>
            insertCoursboxHTML("row", data)
          );
          break;
      }
    });
  });
  // handel search
  const Search_input_category_page = document.querySelector(
    "#Search_input_category_page"
  );
  Search_input_category_page.addEventListener("input", (e) => {
    // insertCoursboxHTML("row", data)}
    let value = e.target.value.toLowerCase().trim();
    getAndShowAllcourses().then((data) => {
      let filtercours = data.filter((cours) => cours.name.includes(value));
      insertCoursboxHTML(layot, filtercours);
    });
  });
});
