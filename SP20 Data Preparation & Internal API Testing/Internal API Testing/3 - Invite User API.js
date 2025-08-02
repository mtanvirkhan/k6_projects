import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    test_scenario: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],  // Fail the test if more than 1% of requests fail
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1s
  },
};

export default function () {
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/inviteuser';

  const headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NTY3MjA3LCJpYXQiOjE3Mjk0ODA4MDd9.oIC2qPHbC9xR4lV36tEmjhAp_gN7Vbrn4PPftkM43AU',
    'content-type': 'application/json',
    'cookie': '_ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _gcl_au=1.1.1447242264.1729228498; _ga_M22JEL3M6T=GS1.1.1729228498.1.0.1729228498.60.0.0; _ga=GA1.1.1380924625.1729228499; cto_bundle=yzZ-n19PMW1JUXYlMkY3dXB6UCUyQkclMkZKeU5kUWNNRzBYVXFTTDNBSVVmWkdxZkN6V0I3dDY1djNFUjA5RTFiWURnN1U1T1RkVUhMMGIyTiUyQkpiWk5xR1BhVXd5SGFzWm5ZQUJPMmNGcXk5MTVmbUdmVGJYaTZmTEVxeU1oT2N3WGY1SWtxcWt4TjMwMHpweE1yS2hpc2ZvNVlFQXFadGRhVDZ4djhFSmd0ZnkwcnNiWDhnSSUzRA',
    'origin': 'https://cw-consolebo.global.qa.pocketalk.com',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const payload = JSON.stringify({
    "first_name": "SP20 Test 1",
    "last_name": "QA",
    "mail_address": "sp20_test_1@pocketalk.com",
    "bo_account_master_id": 1,
    "language_master_id": 1,
    "is_reinvited": true
  });

  // POST request
  let res = http.post(url, payload, { headers });

  // Check response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'success is true': (r) => JSON.parse(r.body).success === true,
    'message is correct': (r) => JSON.parse(r.body).message === 'Back-office user successfully re-invited.',
    'first name is correct': (r) => JSON.parse(r.body).data.first_name === 'SP20 Test 1',
    'last name is correct': (r) => JSON.parse(r.body).data.last_name === 'QA',
    'mail address is correct': (r) => JSON.parse(r.body).data.mail_address === 'sp20_test_1@pocketalk.com',
    'inviter is correct': (r) => JSON.parse(r.body).data.inviter === 'Alauddin Tuhin',
  });

  // Log response for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response time: ${res.timings.duration} ms`);
  console.log(`Response body: ${res.body}`);
}
