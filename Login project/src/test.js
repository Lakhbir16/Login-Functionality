
import CryptoJS from "crypto-js";

// --------Input all details-------------------------

let encryptedKey="0a0b83a53b751aab1f0c52bbdf8312ca79350201c3445226137711f391ed21dd"       
let encryptedIv="c04f7c3c429033f61059a8adc5e15337"
let encryptedOTP="8d0587f0dd58341985da0ce6b100a5c4"



const key = CryptoJS.enc.Hex.parse(encryptedKey);
const iv = CryptoJS.enc.Hex.parse(encryptedIv);


const decryptedOTP = CryptoJS.AES.decrypt(
  { ciphertext: CryptoJS.enc.Hex.parse(encryptedOTP) },
  key,
  { iv: iv }
).toString(CryptoJS.enc.Utf8);


console.log(decryptedOTP);






// "otp":"7f4d38be14a5935f91b7a6aa9b0540d5","key":"b18d564e6a9649d8b9362e021e405f5aaaa3a3bfe6327581f9aea745d6fe3d7b","iv":"671f28801041cc0c4eb44a9f1ebdff3e"}





// import CryptoJS from "crypto-js";

// // --------Input all details-------------------------

// let encryptedKey = "0a0b83a53b751aab1f0c52bbdf8312ca79350201c3445226137711f391ed21dd"
// let encryptedIv = "c04f7c3c429033f61059a8adc5e15337"

// const key = CryptoJS.enc.Hex.parse(encryptedKey);
// const iv = CryptoJS.enc.Hex.parse(encryptedIv);

// // Generate a random 4-digit OTP
// function generateOTP() {
//     return Math.floor(1000 + Math.random() * 9000).toString();
// }

// // Your 4-digit OTP
// const originalOTP = generateOTP();
// console.log("Original OTP:", originalOTP);

// // Encrypt the OTP
// const encryptedOTP = CryptoJS.AES.encrypt(originalOTP, key, { iv: iv });

// // Convert the encrypted result to a hexadecimal string
// const encryptedOTPHex = encryptedOTP.ciphertext.toString();

// console.log("Encrypted OTP (Hex):", encryptedOTPHex);

// // Now you can use this encryptedOTPHex as your encryptedOTP variable

// // Decryption (to verify)
// const decryptedOTP = CryptoJS.AES.decrypt(
//   { ciphertext: CryptoJS.enc.Hex.parse(encryptedOTPHex) },
//   key,
//   { iv: iv }
// ).toString(CryptoJS.enc.Utf8);

// console.log("Decrypted OTP:", decryptedOTP);
