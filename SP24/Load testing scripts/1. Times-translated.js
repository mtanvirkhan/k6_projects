import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,         // 1 Virtual User (single user)
  iterations: 1,  // 1 iteration
  thresholds: {
    'http_req_duration': ['p(95)<2000'],  // 95% of requests should be under 2 seconds
    'http_req_failed': ['rate<0.01'],     // Less than 1% of requests should fail
  },
};

export default function () {
  const url_Day = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/translation-count-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=d';
  const url_Week = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/translation-count-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=w';
  const url_Month = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/translation-count-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=m';

  const headers = {
    'accept': 'application/json, text/plain, */*',
    'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzM0NTg2NDA2LCJleHAiOjE3MzQ1ODgyMDYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.PjmZ30n4j4XNie0qjseiBmauXsq0lb2EzecFk-Lk8moGFHSQzWefCT7jqELnmqZFelxboaJ21yfqFbQ_RQg0_BLjMIx7Tpe2O-zzGH4gFT52j4Fll5i1btW1KE2Pcd6k9cyIyT2VI6M8elNY029Qz9uHgOTrua1kgTBDt9y61TZLudV_05p6n78BcP8vFIygez_LS51BliRBzuwAn9WZgrw9FXfTPBp68st9M7Lq8IKoukDhPsqdFUpiIgERw37yprutQHNiQg4x41ZwV8tzd3y-EqPy8roBNH7uygDupqSTK4Ak27ApJLCI5DEHIisntiubBvq7mCCryA09VQp2Ew',
    'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczNDU3NTMzMSwiZXhwIjoxNzY2MTExMzMxfQ.mSeTVmqpUp0RqfWG_BMimqHyH1YTaCI6yDltW_FSNxvPJIDIOQ3Pj5NMoNEqGJ9KKV7VnRM0cJWsrlRrNPFqVg',
  };

  // url_Day request
  let res_Day= http.get(url_Day, { headers });
  check(res_Day, {
    'url_Day: status is 200': (r) => r.status === 200,
  });
  console.log(`url_Day Response status: ${res_Day.status}`);
  console.log(`url_Day Load time: ${res_Day.timings.duration} ms`);

  // url_Week request
  let res_Week= http.get(url_Week, { headers });
  check(res_Day, {
    'url_Week: status is 200': (r) => r.status === 200,
  });
  console.log(`url_Week Response status: ${res_Week.status}`);
  console.log(`url_Week Load time: ${res_Week.timings.duration} ms`);

  // url_Month request
  let res_Month= http.get(url_Month, { headers });
  check(res_Month, {
    'url_Month: status is 200': (r) => r.status === 200,
  });
  console.log(`url_Month Response status: ${res_Month.status}`);
  console.log(`url_Month Load time: ${res_Month.timings.duration} ms`);

  // Sleep between requests
  sleep(1); // Optional: Add sleep if simulating a pause between actions
}
