export const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const loadFromLocal = (key) => {
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : null;
};
export const clearLocal = (key) => {
  localStorage.removeItem(key);
};