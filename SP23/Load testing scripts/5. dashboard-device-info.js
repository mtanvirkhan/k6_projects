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
  'auth0-authorization': 'Auth0-Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhtbEhzOTJvQ2ZvaWJmekhkWW81OSJ9.eyJjdXN0b21lcl9pZCI6IkFCQ0QxMjM0NTY3ODkwMTIzNDUzIiwiY3VzdG9tZXJfbmFtZSI6IkJKSVQgUUEgVCBDT1JQIiwiYWRtaW5fZW1haWwiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmdsb2JhbC5xYS5wb2NrZXRhbGsuY29tLyIsInN1YiI6ImF1dGgwfDY2ZDkyNTc3MDc1ZWUzZTBmYWUyODE3MSIsImF1ZCI6WyJodHRwczovL2FwaS5wb2NrZXRhbGsuY29tIiwiaHR0cHM6Ly9jcm93bi1xYS5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMzNDY3NDc1LCJleHAiOjE3MzM0NjkyNzUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJvcmdfaWQiOiJvcmdfdkJJbHM2cjZmU1duMlVQaiIsImF6cCI6ImJYMHZrbjkxcWVLYVN5d0tZTEdDSkU1dlZ2c0tvWVNTIn0.a6KtqsaierWgQqD4vHQEUfXBR-zNAe8wJCmM0dInU_hFFcpZT2Lrg8qdJ7O0h-dsns2SatMtzJWIVHLG11GK08TyICIEj2g-t7SHEUGHuAUVAPaomSgqMupUKsYwOo755k6d7M_hyhH2fd-oVtJGQFLMqL8ctubJobyACIqy_DypxxVlqEWmu6WYWDi6XcQYIX5R6IN8aJDE6ul63mmN47ov1N7R-KFEcQrba_3h9qi1uP7umVBCEAriOsp2MN1DHdLa_8cMf3MgX7zVJumQEV7Z1OCFSpaWlHEM5lRi8PO8OoRewZ9iGQdZLhKdVlHeGdUFwDEJALh1h0EpAtkeDQ',
    'console-authorization': 'Console-Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwicm9sZXMiOiJBZG1pbiIsInBsYW5zIjoiMyIsImlhdCI6MTczMzQ1MzIwNywiZXhwIjoxNzY0OTg5MjA3fQ.grqkY_AYpQw68p-fDyVJwd2NdSnXYLol0Hw-EVLRCitYaU4VyL1ieOcEzVXdMVJ4Ad0zPcQFchFw3v3svgERGg',
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