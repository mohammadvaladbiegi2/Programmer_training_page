import { getParam } from "./utils.js";

async function searchHandeler() {
  const courses = document.querySelector("#courses-container");
  const articlswrap = document.querySelector("#articles-wrapper");
  let searchvalue = null;
  await getParam("value").then((data) => (searchvalue = data));

  let res = await fetch(`http://localhost:3501/v1/search/${searchvalue}`);
  let data = await res.json();

  data.allResultCourses.length
    ? data.allResultCourses.map((cours) => {
        courses.insertAdjacentHTML(
          "beforeend",
          `
      <div class="col-4">
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
            <a href=course.html?shortname=${cours.shortName} class="course-box__footer-link">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>
      
        </div>
      </div>
      `
        );
      })
    : (courses.innerHTML = `<div class="alert alert-danger">دوره ای یافت نشد</div>`);

  data.allResultArticles.length
    ? data.allResultArticles.map((articl) => {
        articlswrap.insertAdjacentHTML(
          "beforeend",
          `
      <div class="col-4" >
      <div class="article-card">
        <div class="article-card__header">
          <a href=blog.html?articls=${articl.shortName} class="article-card__link-img">
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
          <a href=blog.html?articls=${articl.shortName} class="article-card__btn">بیشتر بخوانید</a>
        </div>
      </div>
    </div>
      `
        );
      })
    : (articlswrap.innerHTML = `<div class="alert alert-danger">مقاله ای یافت نشد</div>`);
}

window.addEventListener("load", async () => {
  searchHandeler();
});
