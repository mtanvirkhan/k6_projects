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
  const url_Day = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/to-lang-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=d';
  const url_Week = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/to-lang-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=w';
  const url_Month = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/to-lang-list?corpId=ABCD1234567890123453&from=202412&to=202412&view=m';

  const headers = {
    'accept': 'application/json, text/plain, */*',
    'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMzNDY3NDc1LCJleHAiOjE3MzM0NjkyNzUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.a6KtqsaierWgQqD4vHQEUfXBR-zNAe8wJCmM0dInU_hFFcpZT2Lrg8qdJ7O0h-dsns2SatMtzJWIVHLG11GK08TyICIEj2g-t7SHEUGHuAUVAPaomSgqMupUKsYwOo755k6d7M_hyhH2fd-oVtJGQFLMqL8ctubJobyACIqy_DypxxVlqEWmu6WYWDi6XcQYIX5R6IN8aJDE6ul63mmN47ov1N7R-KFEcQrba_3h9qi1uP7umVBCEAriOsp2MN1DHdLa_8cMf3MgX7zVJumQEV7Z1OCFSpaWlHEM5lRi8PO8OoRewZ9iGQdZLhKdVlHeGdUFwDEJALh1h0EpAtkeDQ',
    'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczMzQ1MzIwNywiZXhwIjoxNzY0OTg5MjA3fQ.grqkY_AYpQw68p-fDyVJwd2NdSnXYLol0Hw-EVLRCitYaU4VyL1ieOcEzVXdMVJ4Ad0zPcQFchFw3v3svgERGg',
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
