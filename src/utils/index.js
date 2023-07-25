export const getFromLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));

  return data || (key === "isUserLoggedIn" ? false : key === "cart" ? [] : "");
};

export const saveToLocalStorage = ({ key, data }) => {
  localStorage.setItem(key, JSON.stringify(data));
};
