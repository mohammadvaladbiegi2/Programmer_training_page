const switealert = (title, icon, buttons, clallback) => {
  Swal.fire({
    title,
    icon,
    buttons,
  }).then((resulte) => clallback(resulte));
};

const saveLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalstorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("user")).token;
};
const islogin = () => {
  const login = localStorage.getItem("user");
  return login ? true : false;
};

const getParam = async (key) => {
  const result = new URLSearchParams(window.location.search);

  return result.get(key);
};

const pageNatiosHandler = (data, page, pageCont) => {
  let endindex = page * pageCont;

  let startendex = endindex - pageCont;

  let maindata = data.slice(startendex, endindex);

  let Contpages = Math.ceil(data.length / pageCont);

  return { maindata, Contpages };
};

export {
  switealert,
  saveLocalStorage,
  getFromLocalstorage,
  getToken,
  islogin,
  getParam,
  pageNatiosHandler,
};
