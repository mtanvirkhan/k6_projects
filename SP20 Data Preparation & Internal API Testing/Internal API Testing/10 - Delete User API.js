import http from 'k6/http';
import { check } from 'k6';

// Test options with scenario and thresholds
export const options = {
  scenarios: {
    single_iteration: {
      executor: 'per-vu-iterations', // Each VU executes a fixed number of iterations
      vus: 1,                         // 1 Virtual User
      iterations: 1,                  // Run only 1 iteration
      maxDuration: '1m',              // Timeout after 1 minute if the test takes too long
    },
  },
  thresholds: {
    // Response time should be less than 500ms for 95% of requests
    http_req_duration: ['p(95)<500'],
    // 100% of requests should return status code 200
    'checks{status:200}': ['rate>0.99'],
  },
};

export default function () {
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/deleteuser?boUserId=109';

  const params = {
    headers: {
      'accept': 'application/json',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NzQ2NDA0LCJpYXQiOjE3Mjk2NjAwMDR9.nwKBof_ZLKsSHAvkxlmzdxaXw8JyBHqDCCEKMHgDRwg',
      'content-type': 'application/json',
      'cookie': 'tracking_consent=%7B%22con%22%3A%7B%22CMP%22%3A%7B%22a%22%3A%22%22%2C%22m%22%3A%22%22%2C%22p%22%3A%22%22%2C%22s%22%3A%22%22%7D%7D%2C%22v%22%3A%222.1%22%2C%22region%22%3A%22BDC%22%2C%22reg%22%3A%22%22%7D; shopify_y=79c737c2-50b5-41fb-a493-3c04fc08bcc8;',
      'origin': 'https://cw-consolebo.global.qa.pocketalk.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
    }
  };

  // Send DELETE request
  const res = http.del(url, null, params);

  // Parse the response as JSON
  const jsonResponse = JSON.parse(res.body);

  console.log(jsonResponse);

  // Assertions (Checks)
  const result = check(res, {
    'status is 200': (r) => r.status === 200,
    'success is true': (r) => jsonResponse.success === true,
    'result_code is OK': (r) => jsonResponse.result_code === 'OK',
    'message is correct': (r) => jsonResponse.message === 'User account successfully deleted.'
  });

  // Tagging checks for threshold assertions
  result && res.status === 200 && check(res, { 'status:200': (r) => r.status === 200 });
}
