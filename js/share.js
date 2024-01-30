import { getme } from "./auth.js";
import { islogin, getParam } from "./utils.js";

const user_namebtn = document.querySelector(".user_name");
const top_bar = document.querySelector(".top-bar__menu");
const rout_btn = document.querySelector("#rout_btn");

window.addEventListener("load", () => {
  const checklogin = islogin();
  if (checklogin) {
    getme().then((data) => {
      data
        ? (user_namebtn.innerHTML = data.username)
        : (user_namebtn.innerHTML = "ثبت نام / ورود");
    });
  } else {
    rout_btn.setAttribute("href", "login.html");
  }
});
const topbarandler = async () => {
  const res = await fetch("http://localhost:3501/v1/menus/topbar");
  const data = await res.json();
  const shufelmenue = [...data].sort((a, b) => 0.5 - Math.random());

  shufelmenue.slice(0, 6).map((menue) => {
    top_bar.innerHTML += `  <li class="top-bar__item">
    <a href="${menue.href}" class="top-bar__link">${menue.title}</a>
  </li>`;
  });
};

const menuhandler = async () => {
  const main_header__menu = document.querySelector(".main-header__menu");
  const res = await fetch("http://localhost:3501/v1/menus");
  const data = await res.json();
  data.forEach((menue) =>
    main_header__menu.insertAdjacentHTML(
      "beforeend",
      ` <li class="main-header__item">
    <a href=category.html?cat=${menue.href.slice(
      15
    )} class="main-header__link">${menue.title}
    ${
      menue.submenus.length
        ? ` <i class="fas fa-angle-down main-header__link-icon"></i>`
        : ""
    }
     
      ${
        menue.submenus.length
          ? `   <ul class="main-header__dropdown">
      ${menue.submenus.map(
        (submenue) => ` <li class="main-header__dropdown-item">
      <a href=${submenue.href} class="main-header__dropdown-link">${submenue.title}</a>
    </li>`
      )}
      </ul>`
          : ""
      }
   
    </a>
  </li>`
    )
  );
};

window.addEventListener("load", async () => {
  await topbarandler();
  await menuhandler();
});

const getAndShowAllcourses = async () => {
  const res = await fetch("http://localhost:3501/v1/courses");
  const data = await res.json();

  return data;
};
const getPopularCourses = async () => {
  const res = await fetch("http://localhost:3501/v1/courses/popular");
  const data = await res.json();

  return data;
};
const getPresallCourses = async () => {
  const res = await fetch("http://localhost:3501/v1/courses/presell");
  const data = await res.json();

  return data;
};
const getShowAllArticls = async () => {
  const res = await fetch("http://localhost:3501/v1/articles");
  const data = res.json();

  return data;
};
const getAndShowCategoryCours = async () => {
  const categoryName = getParam("cat");

  const res = await fetch(
    `http://localhost:3501/v1/courses/category/${categoryName}`
  );
  const courses = await res.json();

  return courses;
};
const insertCoursboxHTML = (layot, data) => {
  const category_cours_page = document.querySelector("#category_cours_page");
  if (data.length) {
    if (layot === "row") {
      category_cours_page.innerHTML = "";
      data.map(
        (cours) =>
          (category_cours_page.innerHTML += `<div class="col-4">
      <div class="course-box">
        <a href="#">
          <img src=${cours.cover} alt="Course img" class="course-box__img" />
        </a>
        <div class="course-box__main">
          <a href="#" class="course-box__title">${cours.name}</a>
    
          <div class="course-box__rating-teacher">
            <div class="course-box__teacher">
              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" class="course-box__teacher-link">رضا دولتی</a>
            </div>
            <div class="course-box__rating">
            ${Array(5 - cours.courseAverageScore)
              .fill(0)
              .map(
                () =>
                  `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
              )
              .join("")}
              ${Array(cours.courseAverageScore)
                .fill(0)
                .map(
                  () =>
                    `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
                )
                .join("")}
            </div>
          </div>
    
          <div class="course-box__status">
            <div class="course-box__users">
              <i class="fas fa-users course-box__users-icon"></i>
              <span class="course-box__users-text">500</span>
            </div>
            <span class="course-box__price">1,000,000</span>
          </div>
        </div>
    
        <div class="course-box__footer">
          <a href="#" class="course-box__footer-link">
            مشاهده اطلاعات
            <i class="fas fa-arrow-left course-box__footer-icon"></i>
          </a>
        </div>
    
      </div>
    </div>`)
      );
    } else {
      category_cours_page.innerHTML = "";

      data.map(
        (cours) =>
          (category_cours_page.innerHTML += `<div class="col-12">
  <div class="course-box">
    <a href="#">
      <img src=${cours.cover} alt="Course img" class="course-box__img" />
    </a>
    <div class="course-box__main">
      <a href="#" class="course-box__title">${cours.name}</a>

      <div class="course-box__rating-teacher">
        <div class="course-box__teacher">
          <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
          <a href="#" class="course-box__teacher-link">رضا دولتی</a>
        </div>
        <div class="course-box__rating">
        ${Array(5 - cours.courseAverageScore)
          .fill(0)
          .map(
            () =>
              `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
          )
          .join("")}
          ${Array(cours.courseAverageScore)
            .fill(0)
            .map(
              () =>
                `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
            )
            .join("")}
        </div>
      </div>

      <div class="course-box__status">
        <div class="course-box__users">
          <i class="fas fa-users course-box__users-icon"></i>
          <span class="course-box__users-text">500</span>
        </div>
        <span class="course-box__price">1,000,000</span>
      </div>
    </div>

    <div class="course-box__footer">
      <a href="#" class="course-box__footer-link">
        مشاهده اطلاعات
        <i class="fas fa-arrow-left course-box__footer-icon"></i>
      </a>
    </div>

  </div>
</div>`)
      );
    }
  } else {
    category_cours_page.innerHTML = `<h1 class="alert alert-danger mt-5 text-center">دوره مورد نظر یافت نشد</h1>`;
  }
};
export let load = false;
const getAndShowSingleCours = async (shortname) => {
  const res = await fetch(`http://localhost:3501/v1/courses/${shortname}`);
  const data = await res.json();
  load = await true;
  return data;
};

const getRealatedCours = async (shortname) => {
  let res = await fetch(
    `http://localhost:3501/v1/courses/related/${shortname}`
  );
  let data = await res.json();
  return data;
};

export {
  getAndShowAllcourses,
  getPopularCourses,
  getPresallCourses,
  getShowAllArticls,
  getAndShowCategoryCours,
  insertCoursboxHTML,
  getAndShowSingleCours,
  getRealatedCours,
};
