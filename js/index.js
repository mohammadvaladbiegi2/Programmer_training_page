const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingMinutesCount = $.querySelector("#minutes-counter");
const landingUsersCount = $.querySelector("#users-counter");
const news_letter_submit_btn = $.querySelector("#news-letter-submit-btn");
const main_header__left = $.querySelector(".main-header__left");
import { getme } from "./auth.js";
import {
  getAndShowAllcourses,
  getPopularCourses,
  getPresallCourses,
  getShowAllArticls,
  newsletters,
} from "./share.js";
import { switealert } from "./utils.js";

const lastCourses = () => {
  const latest_courses_index_page = document.querySelector(
    "#latest_courses_index_page"
  );
  getAndShowAllcourses().then((data) =>
    data.map((cours) => {
      latest_courses_index_page.innerHTML += ` <div class="col-4">
    <div class="course-box">
      <a href=course.html?shortname=${cours.shortName}>
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
        <a href=${cours.shortName} class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>`;
    })
  );
};

const popularecours = () => {
  const Pre_sale_courses_index_page = document.querySelector(
    "#popular_courses_index_page"
  );

  getPopularCourses().then((data) =>
    data.forEach((cours) => {
      Pre_sale_courses_index_page.insertAdjacentHTML(
        "beforeend",
        ` <div class="swiper-slide">
    <div class="course-box">
      <a href=course.html?shortname=${cours.shortName}>
        <img src=${cours.cover} alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href=course.html?shortname=${
          cours.shortName
        } class="course-box__title">${cours.name}</a>

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
  </div>`
      );
    })
  );
};

const presellcours = () => {
  const Pre_sale_courses_index_page = document.querySelector(
    "#Pre_sale_courses_index_page"
  );

  getPresallCourses().then((data) =>
    data.forEach((cours) => {
      Pre_sale_courses_index_page.insertAdjacentHTML(
        "beforeend",
        `
    <div class="swiper-slide">
                <div class="course-box">
                  <a href=course.html?shortname=${cours.shortName}>
                    <img src=${cours.cover} alt="Course img" class="course-box__img" />
                  </a>
                  <div class="course-box__main">
                    <a href=course.html?shortname=${cours.shortName} class="course-box__title">${cours.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">رضا دولتی</a>
                      </div>
                      <div class="course-box__rating">
                        <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
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
              </div>
    `
      );
    })
  );
};
const Articls = () => {
  const Articles_index_page = document.getElementById("Articles_index_page");

  getShowAllArticls().then((data) =>
    data.slice(0, 3).map(
      (articl) =>
        (Articles_index_page.innerHTML += `<div class="col-4" >
    <div class="article-card">
      <div class="article-card__header">
        <a href="#" class="article-card__link-img">
          <img src=${articl.cover} class="article-card__img w-100" alt="Article Cover" />
        </a>
      </div>
      <div class="article-card__content">
        <a href="#" class="article-card__link">
         ${articl.title}
        </a>
        <p class="article-card__text">
         ${articl.description}
        </p>
        <a href=${articl.shortName} class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>`)
    )
  );
};

window.addEventListener("load", async () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم !";
  let typeIndex = 0;
  popularecours();
  typeWriter(landingText, typeIndex);
  makeCounter(40, landingCoursesCount);
  makeCounter(3_320, landingMinutesCount);
  makeCounter(3_071, landingUsersCount);
  await lastCourses();
  await popularecours();
  await presellcours();
  await Articls();
});

getme().then((data) => {
  if (data.role === "ADMIN") {
    main_header__left.insertAdjacentHTML(
      "beforeend",
      `
    <a href="/panel/main/index.html" class="main-header__profile" >
    <span class="main-header__profile-text user_name">ورود به پنل ادمین</span>
  </a>
    `
    );
  }
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function makeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter === max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter++;
  }, 0.1);
}

news_letter_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  newsletters();
});

let landing__searchbar_input = document.querySelector(
  ".landing__searchbar-input"
);
let landing__searchbar_btn = document.querySelector(".landing__searchbar-btn");

window.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    let value = landing__searchbar_input.value;
    let search = value.toLowerCase().trim();

    if (landing__searchbar_input.value.length) {
      location.href = `search.html?value=${search}`;
      landing__searchbar_input.value = "";
    } else {
      switealert("خطا ورودی \n مقدار جستجو خالی است ", "error", "ok", () => {});
    }
  }
  landing__searchbar_btn.addEventListener("click", () => {
    let value = landing__searchbar_input.value;
    let search = value.toLowerCase().trim();

    if (landing__searchbar_input.value.length) {
      location.href = `search.html?value=${search}`;
      landing__searchbar_input.value = "";
    } else {
      switealert("خطا ورودی \n مقدار جستجو خالی است ", "error", "ok", () => {});
    }
  });
});
