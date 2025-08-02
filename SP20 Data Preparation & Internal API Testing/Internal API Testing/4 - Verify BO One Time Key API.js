import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    verify_onetime_key: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1s
  },
};

export default function () {
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/auth/verifyboonetimekey' ;

  const headers = {
    'Content-Type': 'application/json',
  };

  const payload = JSON.stringify({
    "onetimekey":"iZf3klGhcaE9ATTiM3bd2JGiF6kYhLEdVgmjfdeUaMIy1VDtX7bcpG4Dud8TNwKBjM11Kfoqab0JpOFXIJfN1OsEOFEXJiXwdsnt"
  });

  // POST request
  let res = http.post(url, payload, { headers });

  // Check response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response contains success': (r) => r.body.includes('success'),
  });

  // Log response for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response time: ${res.timings.duration} ms`);
  console.log(`Response body: ${res.body}`);
}
