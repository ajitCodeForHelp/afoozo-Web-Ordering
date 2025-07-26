import CryptoJS from "crypto-js";

const secretKey = "my-secret-key";

export const setSecureItem = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
  localStorage.setItem(key, encrypted);
};

export const getSecureItem = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const removeSecureItem = (key) => {
  localStorage.removeItem(key);
};
