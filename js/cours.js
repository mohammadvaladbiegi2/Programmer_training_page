import { getParam } from "./utils.js";

import { getAndShowSingleCours, load, getRealatedCours } from "./share.js";

window.addEventListener("load", async () => {
  const course_info__video = document.querySelector(".course-info__video");
  const course_info__title = document.querySelector(".course-info__title");
  const course_info__link = document.querySelector(".course-info__link");
  const course_info__text = document.querySelector(".course-info__text");
  const time_cours = document.querySelector("#time_cours");
  const course_info__register_title = document.querySelector(
    ".course-info__register-title"
  );
  const course_info__total_sale_number = document.querySelector(
    ".course-info__total-sale-number"
  );
  const collapseOne = document.querySelector("#collapseOne");
  const creatAtcours = document.querySelector("#creatAtcours");
  let shortName = null;
  await getParam("shortname").then((param) => {
    shortName = param;
  });
  // Handel info main cours
  await getAndShowSingleCours(shortName).then((data) => {
    console.log(data);
    let hourCours = 0;
    let Stringtime = null;
    if (data.sessions.length) {
      const reduceTimeCours = data.sessions.reduce((prev, next) => {
        return +prev.updatedAt.slice(14, 16) + +next.updatedAt.slice(14, 16);
      });

      if (reduceTimeCours > 60) {
        hourCours = Math.floor(reduceTimeCours / 60);
        Stringtime = "ساعت";
      } else {
        hourCours = reduceTimeCours;
        Stringtime = "دقیقه";
      }
    }

    course_info__video.setAttribute("poster", data.cover);
    load
      ? (course_info__title.innerHTML = data.name)
      : (course_info__title.innerHTML = "loading");
    course_info__link.innerHTML = data.categoryID.title;
    course_info__text.innerHTML = data.description;
    creatAtcours.innerHTML = data.createdAt.slice(0, 10);
    course_info__total_sale_number.innerHTML = data.courseStudentsCount;
    data.isUserRegisteredToThisCourse
      ? (course_info__register_title.innerHTML = `<i class="fas fa-graduation-cap course-info__register-icon"></i>
    دانشجو دوره هستید
    `)
      : (course_info__register_title.innerHTML = "ثبت نام در دوره");

    data.sessions.length
      ? data.sessions.map(
          (S, index) =>
            (collapseOne.innerHTML += `<div class="accordion-body introduction__accordion-body">
  <div class="introduction__accordion-right">
    <span class="introduction__accordion-count">${index + 1}</span>
    <i class="fab fa-youtube introduction__accordion-icon"></i>
    ${
      S.isUserRegisteredToThisCourse
        ? ` <a href="#" class="introduction__accordion-link">
    ${S.title}
   </a>`
        : ` <span  class="introduction__accordion-link">
   ${S.title}
  </span>`
    }
   
  </div>
  <div class="introduction__accordion-left">
    <span class="introduction__accordion-time">
      ${S.updatedAt.slice(14, 19)}
    </span>
    ${
      data.isUserRegisteredToThisCourse
        ? ""
        : `<i class="fa-solid fa-lock"></i>`
    }
  </div>
</div>`)
        )
      : (collapseOne.innerHTML = `<div class="accordion-body introduction__accordion-body">
      <div class="introduction__accordion-right">
        <span class="introduction__accordion-count">1</span>
        <i class="fab fa-youtube introduction__accordion-icon"></i>
        <a href="#" class="introduction__accordion-link">
          هنوز قسمتی در نظر گرفته نشده
        </a>
      </div>
    </div>`);
    time_cours.innerHTML =
      hourCours > 0 ? `${hourCours} ${Stringtime}` : `دوره شروع نشده`;
  });
  // handel related Cours
  await getRealatedCours(shortName).then((data) => {
    const Realted_Cours_container = document.querySelector(
      "#Realted_Cours_container"
    );
    const Realted_Cours_container_Main = document.querySelector(
      "#Realted_Cours_container_Main"
    );

    data.length
      ? data.forEach((cours) => {
          Realted_Cours_container.innerHTML += `<li class="course-info__courses-list-item">
      <a href=course.html?shortname=${cours.shortName} class="course-info__courses-link">
        <img src=${cours.cover} alt="Course Cover" class="course-info__courses-img" />
        <span class="course-info__courses-text">
          ${cours.name}
        </span>
      </a>
    </li>`;
        })
      : (Realted_Cours_container_Main.innerHTML = "دوره مرتبط موجود نیست");
  });
});
