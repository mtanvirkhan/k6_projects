import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // Number of Virtual Users
  iterations: 1, // Number of iterations per user
};

export default function () {
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/userlist?searchText=&currentPageNumber=1&rowLimitPerPage=1&colName=invitedDt&sortDirection=DESC';

  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NTY5MDg2LCJpYXQiOjE3Mjk0ODI2ODZ9.CcHDJyfG-KLiEChWDECMGJIoHZcwiBzYZkXnXj45n54',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const res = http.get(url, { headers });

  // Assertions for response data
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is JSON': (r) => r.headers['Content-Type'] === 'application/json',
    'contains data array': (r) => Array.isArray(r.json('data.users')),
    'results are sorted DESC by invitedDt': (r) => {
      const results = r.json('data.results');
      if (results && results.length > 1) {
        return new Date(results[0].invitedDt) >= new Date(results[1].invitedDt);
      }
      return true;
    }
  });

  // Log response body for debugging
  console.log(`Response: ${res.body}`);

  sleep(1);
}
