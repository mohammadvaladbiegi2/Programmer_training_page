import { switealert, saveLocalStorage, getToken } from "./utils.js";
const register = () => {
  const nameinpute = document.querySelector("#name");
  const usernameinpute = document.querySelector("#username");
  const emailinpute = document.querySelector("#email");
  const phoneinpute = document.querySelector("#phone");
  const passwordinpute = document.querySelector("#password");

  const newUser = {
    name: nameinpute.value.trim(),
    username: usernameinpute.value.trim(),
    email: emailinpute.value.trim(),
    phone: phoneinpute.value.trim(),
    password: passwordinpute.value.trim(),
    confirmPassword: passwordinpute.value.trim(),
  };

  fetch("http://localhost:3501/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => {
      res.status === 201
        ? switealert(
            "ثبت نام موفقیت امیز",
            "success",
            "Ok",
            () => (location.href = "index.html")
          )
        : res.status === 409
        ? switealert("نام کاربری قبلا استفاده شده", "error", "تلاش دوباره")
        : switealert("ثبت نام ناموفق", "error", "تلاش دوباره");

      return res.json();
    })
    .then((resulte) => {
      saveLocalStorage("user", { token: resulte.accessToken });
    });
};

const login = () => {
  const user_nameinpute = document.querySelector("#user_name");
  const passwordinpute = document.querySelector("#password");

  const userinfo = {
    identifier: user_nameinpute.value.trim(),
    password: passwordinpute.value.trim(),
  };

  fetch("http://localhost:3501/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userinfo),
  })
    .then((res) => {
      res.status === 200
        ? switealert(
            "ورود موفق",
            "success",
            "برو به پنل",
            () => (location.href = "index.html")
          )
        : switealert(
            "نام کاربری یا رمز عبور اشتباه است",
            "error",
            "تلاش دوباره"
          );
      return res.json();
    })
    .then((resulte) => {
      saveLocalStorage("user", { token: resulte.accessToken });
    });
};

const getme = async () => {
  const token = getToken();

  if (!token) return false;

  const res = await fetch("http://localhost:3501/v1/auth/me", {
    headers: {
      Authorization: `Brearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
};
export { register, login, getme };
