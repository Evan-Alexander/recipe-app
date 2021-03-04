import { TIMEOUT_SEC } from './config';
import Fraction from 'fraction.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const dataToSend = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([dataToSend, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {}
};

// export const getJSON = async function (url) {
//   try {
//     // promise.race will either fetch the url, but if the internet connection is too slow, the timeout function will run and throw the error to prevent the fetch from running forever
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (error) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const dataToSend = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([dataToSend, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fractions = function (string) {
//   // ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
//   const input = new Fraction(string).toString();

//   let output = input.includes('33/100')
//     ? input.split('33/100').join('1/3')
//     : input;

//   const nanCheck = output.includes('NaN') ? '' : output;
//   return nanCheck;
// };
export const fractions = quantity => {
  if (quantity) {
    const num = new Fraction(quantity).simplify(0.00001);
    return num.toFraction(true);
  }
  return '?';
};
