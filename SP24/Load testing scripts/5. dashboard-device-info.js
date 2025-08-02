import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,         // Single virtual user
    iterations: 1,  // Single iteration
    thresholds: {
      // Set response time threshold: 95% of requests should be under 2 seconds
      'http_req_duration': ['p(95)<2000'],
      // Set check for successful response codes
      'http_req_failed': ['rate<0.01'], // Less than 1% of requests should fail
    },
  };

export default function () {
  const url = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-device-info';
  
  const params = {
    headers: {
      'accept': 'application/json, text/plain, */*',
  'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzM0NTg2NDA2LCJleHAiOjE3MzQ1ODgyMDYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.PjmZ30n4j4XNie0qjseiBmauXsq0lb2EzecFk-Lk8moGFHSQzWefCT7jqELnmqZFelxboaJ21yfqFbQ_RQg0_BLjMIx7Tpe2O-zzGH4gFT52j4Fll5i1btW1KE2Pcd6k9cyIyT2VI6M8elNY029Qz9uHgOTrua1kgTBDt9y61TZLudV_05p6n78BcP8vFIygez_LS51BliRBzuwAn9WZgrw9FXfTPBp68st9M7Lq8IKoukDhPsqdFUpiIgERw37yprutQHNiQg4x41ZwV8tzd3y-EqPy8roBNH7uygDupqSTK4Ak27ApJLCI5DEHIisntiubBvq7mCCryA09VQp2Ew',
    'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczNDU3NTMzMSwiZXhwIjoxNzY2MTExMzMxfQ.mSeTVmqpUp0RqfWG_BMimqHyH1YTaCI6yDltW_FSNxvPJIDIOQ3Pj5NMoNEqGJ9KKV7VnRM0cJWsrlRrNPFqVg',
    },
  };

  const response = http.get(url, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  console.log(`Response status: ${response.body}`);
  console.log(`Load time: ${response.timings.duration} ms`);
  sleep(1);
}