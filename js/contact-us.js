import { switealert } from "./utils.js";
import { newsletters } from "./share.js";

const $ = document;

const nameinpute = $.querySelector("#name");
const emailinpute = $.querySelector("#email");
const phoneinpute = $.querySelector("#phone");
const bodyinpute = $.querySelector("#body");
const submit = $.querySelector("#submit-btn");
const news_letter_submit_btn = $.querySelector("#news-letter-submit-btn");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  let msg = {
    name: nameinpute.value,
    email: emailinpute.value,
    phone: phoneinpute.value,
    body: bodyinpute.value,
  };

  let res = await fetch("http://localhost:3501/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });

  if (res.status === 201) {
    switealert("پیام ارسال شد", "success", "برو به صحفه اصلی", () => {
      location.href = "index.html";
    });

    nameinpute.value = "";
    emailinpute.value = "";
    phoneinpute.value = "";
    bodyinpute.value = "";
  } else {
    switealert("ارسال ناموفق", "error", "try again", () => {});
  }
});

news_letter_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  newsletters();
});
