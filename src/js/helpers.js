import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // promise.race will either fetch the url, but if the internet connection is too slow, the timeout function will run and throw the error to prevent the fetch from running forever
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {
    throw err;
  }
};

export const fractions = function (string) {
  // ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
  const input = new Fraction(string).toString();

  let output = input.includes('33/100')
    ? input.split('33/100').join('1/3')
    : input;

  const nanCheck = output.includes('NaN') ? '' : output;
  return nanCheck;
};
