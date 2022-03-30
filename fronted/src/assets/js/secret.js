import * as CryptoJS from "crypto-js";

/**
 * 加密
 * @param {string} str 加密的内容
 * @param {string} key 加密的key
 * @param {string} iv 偏移量
 * @returns
 */
export const crypto = function (str, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);

  let encrypted = CryptoJS.AES.encrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};
/**
 * 解密
 * @param {string} str 解密的内容
 * @param {string} key 解密的key
 * @param {string} iv 偏移量
 * @returns
 */
export const decrypt = function (str, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
