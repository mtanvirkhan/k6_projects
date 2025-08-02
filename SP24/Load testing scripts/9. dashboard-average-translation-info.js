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
  const url_ALL = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-average-translation-info?from=19700101&to=20241202';
  const url_Previous_Week = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-no-of-translation-info?from=20241209&to=20241215&type=NOTYEAR';
  const url_This_Week = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-no-of-translation-info?from=20241216&to=20241222&type=NOTYEAR';
  const url_Previous_Month = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-average-translation-info?from=20241101&to=20241130&type=NOTYEAR';
  const url_This_Month = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-average-translation-info?from=20241201&to=20241231&type=NOTYEAR';
  const url_Previous_Year = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-average-translation-info?from=20230101&to=20231231&type=YEAR';
  const url_This_Year = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-average-translation-info?from=20240101&to=20241231&type=YEAR';

  const headers = {
    'accept': 'application/json, text/plain, */*',
   'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzM0NTg2NDA2LCJleHAiOjE3MzQ1ODgyMDYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.PjmZ30n4j4XNie0qjseiBmauXsq0lb2EzecFk-Lk8moGFHSQzWefCT7jqELnmqZFelxboaJ21yfqFbQ_RQg0_BLjMIx7Tpe2O-zzGH4gFT52j4Fll5i1btW1KE2Pcd6k9cyIyT2VI6M8elNY029Qz9uHgOTrua1kgTBDt9y61TZLudV_05p6n78BcP8vFIygez_LS51BliRBzuwAn9WZgrw9FXfTPBp68st9M7Lq8IKoukDhPsqdFUpiIgERw37yprutQHNiQg4x41ZwV8tzd3y-EqPy8roBNH7uygDupqSTK4Ak27ApJLCI5DEHIisntiubBvq7mCCryA09VQp2Ew',
    'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczNDU3NTMzMSwiZXhwIjoxNzY2MTExMzMxfQ.mSeTVmqpUp0RqfWG_BMimqHyH1YTaCI6yDltW_FSNxvPJIDIOQ3Pj5NMoNEqGJ9KKV7VnRM0cJWsrlRrNPFqVg',
  };

  // url_ALL request
  let res_ALL = http.get(url_ALL, { headers });
  check(res_ALL, {
    'url_ALL: status is 200': (r) => r.status === 200,
  });
  console.log(`url_ALL Response status: ${res_ALL.status}`);
  console.log(`url_ALL Load time: ${res_ALL.timings.duration} ms`);

  // url_Previous_Week request
  let res_Previous_Week = http.get(url_Previous_Week, { headers });
  check(res_Previous_Week, {
    'url_Previous_Week: status is 200': (r) => r.status === 200,
  });
  console.log(`url_Previous_Week Response status: ${res_Previous_Week.status}`);
  console.log(`url_Previous_Week Load time: ${res_Previous_Week.timings.duration} ms`);

    // url_This_Week request
    let res_This_Week = http.get(url_This_Week, { headers });
    check(res_This_Week, {
      'url_Previous_Week: status is 200': (r) => r.status === 200,
    });
    console.log(`url_This_Week Response status: ${res_This_Week.status}`);
    console.log(`url_This_Week Load time: ${res_This_Week.timings.duration} ms`);

    // url_Previous_Month request
    let res_Previous_Month = http.get(url_Previous_Month, { headers });
    check(res_Previous_Month, {
      'url_Previous_Month: status is 200': (r) => r.status === 200,
    });
    console.log(`url_Previous_Month Response status: ${res_Previous_Month.status}`);
    console.log(`url_Previous_Month Load time: ${res_Previous_Month.timings.duration} ms`);

    // url_This_Month request
    let res_This_Month= http.get(url_This_Month, { headers });
    check(res_This_Month, {
      'url_This_Month: status is 200': (r) => r.status === 200,
      //'url_This_Month: response body contains expected data': (r) => r.body.includes("expected key or value"), // Adjust as needed
    });
    console.log(`url_This_Month Response status: ${res_This_Month.status}`);
    //console.log(`url_This_Month Response time: ${res_This_Month.timings.waiting} ms`);
    console.log(`url_This_Month Load time: ${res_This_Month.timings.duration} ms`);
    //console.log(`url_This_Month Body: ${res_This_Month.body}`);

    // url_Previous_Year request
    let res_Previous_Year= http.get(url_Previous_Year, { headers });
    check(res_Previous_Year, {
      'url_Previous_Year: status is 200': (r) => r.status === 200,
      //'url_Previous_Year: response body contains expected data': (r) => r.body.includes("expected key or value"), // Adjust as needed
    });
    console.log(`url_Previous_Year Response status: ${res_Previous_Year.status}`);
    //console.log(`url_Previous_Year Response time: ${res_Previous_Year.timings.waiting} ms`);
    console.log(`url_Previous_Year Load time: ${res_Previous_Year.timings.duration} ms`);
    //console.log(`url_Previous_Year Body: ${res_Previous_Year.body}`);

    // url_This_Year request
    let res_This_Year= http.get(url_This_Year, { headers });
    check(res_This_Year, {
      'url_This_Year: status is 200': (r) => r.status === 200,
      //'url_This_Year: response body contains expected data': (r) => r.body.includes("expected key or value"), // Adjust as needed
    });
    console.log(`url_This_Year Response status: ${res_This_Year.status}`);
    //console.log(`url_This_Year Response time: ${res_This_Year.timings.waiting} ms`);
    console.log(`url_This_Year Load time: ${res_This_Year.timings.duration} ms`);
    //console.log(`url_This_Year Body: ${res_This_Year.body}`);

  // Sleep between requests
  sleep(1); // Optional: Add sleep if simulating a pause between actions
}
