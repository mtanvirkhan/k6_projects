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
  const url1 = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-total-translation-info?from=20241104&to=20241110&type=NOTYEAR';
  const url2 = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/private/dashboard-total-translation-info?from=20241001&to=20241031&type=NOTYEAR';
  
  const headers = {
    'accept': 'application/json, text/plain, */*',
    'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMxNDE2ODgxLCJleHAiOjE3MzE0MTg2ODEsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.cPjVzGi-X1v7GNy_07BBsRgFJEnRr40CUxaHqAi16thBSFOzVbB1IUH-T8TMkmxqgBXTzcMl1qc7uOrde5KIMfa1fu1QoKDEsCDwIGBWKyzKVHucmte50PBdVbKPSC4sDEqvZXa3iGfceqWX8KERi_C0pnoakk4VlCqPtsCCribLR74eovXHpSArQZwWBmyyFv-QJmJdab6lGCiz4WS2sR38ZU7OZjSC7lTjM_GtXN5cGYIG2RgxVgGd5wKaWl0MBEqFV2MrDiD551u3mhMqWNVrVyDrcRFZHVD2kTQpIy2e9EgOL3mCEj6ZfosAAeeuYQeqGuFh7H2Na_EsEB3lNg',
      'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczMTM3OTIzMiwiZXhwIjoxNzYyOTE1MjMyfQ.Eod-fV6M60JSC71tsOQFO-eeZgKv3NjcLTINbGVc3CwJ0v1MN0Hm6kstEJtvsRzfNTQKT5Dm_PAsCdaopUWAVQ',
  };

  // First request
  let res1 = http.get(url1, { headers });
  check(res1, {
    'URL 1: status is 200': (r) => r.status === 200,
    'URL 1: response body contains expected data': (r) => r.body.includes("expected key or value"), // Adjust as needed
  });
  console.log(`URL 1 Response status: ${res1.status}`);
  console.log(`URL 1 Response time: ${res1.timings.waiting} ms`);
  console.log(`URL 1 Load time: ${res1.timings.duration} ms`);
  console.log(`URL 1 Body: ${res1.body}`);

  // Second request
  let res2 = http.get(url2, { headers });
  check(res2, {
    'URL 2: status is 200': (r) => r.status === 200,
    'URL 2: response body contains expected data': (r) => r.body.includes("expected key or value"), // Adjust as needed
  });
  console.log(`URL 2 Response status: ${res2.status}`);
  console.log(`URL 2 Response time: ${res2.timings.waiting} ms`);
  console.log(`URL 2 Load time: ${res2.timings.duration} ms`);
  console.log(`URL 2 Body: ${res2.body}`);

  // Sleep between requests
  sleep(1); // Optional: Add sleep if simulating a pause between actions
}
