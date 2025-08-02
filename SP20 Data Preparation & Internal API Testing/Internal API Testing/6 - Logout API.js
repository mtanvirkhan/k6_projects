import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // Number of Virtual Users
  iterations: 1, // Number of iterations per user
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1 second
  },
};

export default function () {
  const url = 'https://global-console-bo.qa.pocketalk.com/iotconsoleapi-global-bo/api/logout';

  const headers = {
    'Content-Type': 'application/json',
  };

  const payload = JSON.stringify({
    access_key: "ya29.a0AcM612zIGWQiy4bqt1pbYGmpN5pvC3MRy0b6zf5UUh985LmiwvgJlACylFtTXk7si8ilBhsDIqiQN-Q8PoLhAqQv7Oe0OgPHFWH7N0IX9aQp8nlL79x0Rjiqu3RJsf-pVJKXU1M8tqIdY8WOx_Uyy7IUNjkWF2ebSB-0Zzq5aCgYKAZISARMSFQHGX2MiNgWDWx3GcoDzJFQuYtz3nA0175"
  });

  const res = http.post(url, payload, { headers });

  // Check if the response is successful
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Log response for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response time: ${res.timings.duration} ms`);
  console.log(`Response body: ${res.body}`);

  sleep(1);
}
