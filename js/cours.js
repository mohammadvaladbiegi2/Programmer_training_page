import { getParam, getToken, switealert } from "./utils.js";

import { getAndShowSingleCours, load, getRealatedCours } from "./share.js";

window.addEventListener("load", async () => {
  const course_info__video = document.querySelector(".course-info__video");
  const course_info__title = document.querySelector(".course-info__title");
  const course_info__link = document.querySelector(".course-info__link");
  const course_info__text = document.querySelector(".course-info__text");
  const contComment = document.querySelector(
    ".course-info__total-comment-text"
  );
  const time_cours = document.querySelector("#time_cours");
  const course_info__register_title = document.querySelector(
    ".course-info__register-title"
  );
  const course_info__total_sale_number = document.querySelector(
    ".course-info__total-sale-number"
  );
  const collapseOne = document.querySelector("#collapseOne");
  const creatAtcours = document.querySelector("#creatAtcours");
  const commentsContentWrapper = document.querySelector(".comments__content");
  let shortName = null;
  await getParam("shortname").then((param) => {
    shortName = param;
  });
  // Handel info main cours
  await getAndShowSingleCours(shortName).then((data) => {
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

    contComment.innerHTML = `کامنت ها: ${data.comments.length}`;

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
    if (data.comments.length) {
      data.comments.forEach((comment) => {
        commentsContentWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div class="comments__item">
                <div class="comments__question">
                    <div class="comments__question-header">
                        <div class="comments__question-header-right">
                            <span class="comments__question-name comment-name">${
                              comment.creator.name
                            }</span>
                            <span class="comments__question-status comment-status">
                            (${
                              comment.creator.role === "USER"
                                ? "دانشجو"
                                : "مدرس"
                            })
                                </span>
                            <span class="comments__question-date comment-date">${comment.createdAt.slice(
                              0,
                              10
                            )}</span>
                        </div>
                        <div class="comments__question-header-left">
                            <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                        </div>
                    </div>
                    <div class="comments__question-text">
                       
                        <p class="comments__question-paragraph comment-paragraph">
                          ${comment.body}
                        </p>
                    </div>
                </div>
                ${
                  comment.answerContent
                    ? `
                      <div class="comments__ansewr">
                          <div class="comments__ansewr-header">
                              <div class="comments__ansewr-header-right">
                                  <span class="comments__ansewr-name comment-name">
                                 ${comment.answerContent.creator.username}
                                      </span>
                                  <span class="comments__ansewr-staus comment-status">
                                    (${
                                      comment.creator.role === "USER"
                                        ? "دانشجو"
                                        : "مدرس"
                                    })
                                  </span>
                                  <span class="comments__ansewr-date comment-date">1401/04/21</span>
                              </div>
                              <div class="comments__ansewr-header-left">
                                  <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                              </div>
                          </div>
                          <div class="comments__ansewr-text">
                              <p class="comments__ansewr-paragraph comment-paragraph">
                                ${comment.answerContent.body}
                              </p>
                          </div>
                      </div>
                    `
                    : ""
                }
              </div>
          `
        );
      });
    } else {
      commentsContentWrapper.insertAdjacentHTML(
        "beforeend",
        `
          <div class="alert alert-danger">هنوز هیچ کامنتی برای این دوره ثبت نشده</div>
        `
      );
    }
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

  let comment_body = document.querySelector("#comment_body");

  let comments__respond_btn = document.querySelector(".comments__respond-btn");

  comments__respond_btn.addEventListener("click", async () => {
    let token = await getToken();

    let comment = {
      body: comment_body.value,
      courseShortName: shortName,
      score: "5",
    };

    let res = await fetch("http://localhost:3501/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Brearer ${token}`,
      },
      body: JSON.stringify(comment),
    });
    if (res.status === 201) {
      switealert("کامنت با موفقیت ثبت شد", "success", "ok", () => {
        location.reload();
      });
      comment_body.value = "";
    } else {
      switealert("کامنت ثبت نشد", "error", "ok", () => {});
    }
  });
});
