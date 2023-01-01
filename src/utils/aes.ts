import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv ，可以和后端商议好，只要统一的给16位字符串即可
const key = CryptoJS.enc.Utf8.parse("uxdfppium1234567");
const iv = CryptoJS.enc.Utf8.parse('uxdfppium1234567');

export default {
  // AES 加密
  encrypt(data: any) {
    let srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },

  // AES 解密
  decrypt(data: any) {
    let base64 = CryptoJS.enc.Base64.parse(data);
    let src = CryptoJS.enc.Base64.stringify(base64);
    var decrypt = CryptoJS.AES.decrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  }
}