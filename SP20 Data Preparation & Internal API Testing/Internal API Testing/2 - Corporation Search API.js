import http from 'k6/http';
import { check } from 'k6';

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
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/corporation-list';

  // Manually construct query string
  const queryString = '?corporateListSearchParam=&currentPageNumber=1&rowLimitPerPage=1&colName=corpId&sortDirection=ASC&serverRegionIdList=';

  // Headers
  const headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NTY3MjA3LCJpYXQiOjE3Mjk0ODA4MDd9.oIC2qPHbC9xR4lV36tEmjhAp_gN7Vbrn4PPftkM43AU',
    'content-type': 'application/json',
    'cookie': '_ga=GA1.1.933019060.1720427785; _ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _ga_WBCCSLWJX2=GS1.1.1728985241.59.0.1728985241.0.0.0',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  // Make GET request with query parameters and headers
  let res = http.get(`${url}${queryString}`, { headers });

  // Check response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'content-type is application/json': (r) => r.headers['Content-Type'] === 'application/json',
  });

  // Log request/response details for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response Time: ${res.timings.duration} ms`);
  console.log(`Response Body: ${res.body}`);
}
