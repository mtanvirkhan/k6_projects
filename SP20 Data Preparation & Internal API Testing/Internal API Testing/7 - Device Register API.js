import http from 'k6/http';
import { check, sleep } from 'k6';
import { text } from 'k6/data';
import { SharedArray } from 'k6/data';

const currentTime = new Date().toISOString().replace(/[:.]/g, '-');

// Load CSV data
const csvData = new SharedArray('another data name', function () {
  return open('./Demo.csv')
    .split('\n')
    .filter((line) => line.trim() !== '') // Filter out empty lines
    .map((line) => line.replace('\r', '').split(','));
});

export const options = {
  vus: 1, // Number of Virtual Users
  iterations: 1, // Number of iterations per user
};

export default function () {

  const payload = csvData.join('\n'); // Join the CSV data back into a single string
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/register-devices';

  // Setup form-data
  const formData = {
    'csv_file': http.file(payload, `SP20 importing VUs 1 using k6 testing tool ${currentTime}`, 'text/csv'),
    'corp_id': 'ABCD1234567890123453',
  };

  // Headers
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NTY5MDg2LCJpYXQiOjE3Mjk0ODI2ODZ9.CcHDJyfG-KLiEChWDECMGJIoHZcwiBzYZkXnXj45n54',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://cw-consolebo.global.qa.pocketalk.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const res = http.post(url, formData, { headers });

  // Check if the response status is 200 (OK)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'result_code is OK': (r) => JSON.parse(r.body).result_code === 'OK',
    'message is Success.': (r) => JSON.parse(r.body).message === `Success.`,
    'data.status is 200': (r) => JSON.parse(r.body).data.status === `ALL_COMPLETE`,
  });

  // Log the response for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response body: ${res.body}`);

  sleep(1);
}
