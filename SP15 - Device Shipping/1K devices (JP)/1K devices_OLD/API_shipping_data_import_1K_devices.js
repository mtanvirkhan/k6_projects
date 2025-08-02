import http from 'k6/http';
import { group, check } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Counter } from 'k6/metrics'; // Import Counter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Load CSV data
const csvData = new SharedArray('another data name', function () {
  return open('./SP15_1000_Devices_BJIT_Tanvir.csv')
    .split('\n')
    .filter((line) => line.trim() !== '') // Filter out empty lines
    .map((line) => line.replace('\r', '').split(','));
});

// Initialize Counter metrics
const successfulResponses = new Counter('successful_responses');
const myTrend = new Trend('response_time');
const myCounter = new Counter('failed_requests');

export const options = {
  vus: 1, // Adjust based on your test requirements
  iterations: 1, // Adjust based on your test requirements
  thresholds: {
    checks: ['rate==1.0'],
    http_req_waiting: ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    http_req_duration: ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    iteration_duration: ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    group_duration: ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    response_time: ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    http_req_failed: ['rate<0.01'],
    successful_responses: ['rate>0.0'],
    vus: ['value==4'],
    'http_req_duration{status:200}': ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000'],
    'http_req_duration{url:https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data/}': ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000']
  }
};

export default function () {
  group('Testing PT Console API', function () {
    const payload = csvData.join('\n'); // Join the CSV data back into a single string

    const JWT_token = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzIzMDk0MzMxLCJpYXQiOjE3MjMwMDc5MzF9.vry22SvBtBXjAxYdWQXbP5MTBCus7vESjCWZYIYeUA8'
      },
      timeout: '1000000ms'
    };

    //console.log(payload);

    const formData = {
      csv_file: http.file(payload, 'API_shipping_data_import_1K_devices.js', 'text/csv'),
    };

    group('Checking shipping device import', function () {
      let res = http.post(
        'https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data/',
        formData,
        JWT_token
      );
        // Record custom metrics
      myTrend.add(res.timings.duration);
      if (res.status !== 200) {
        myCounter.add(1);
      }

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);

      // Check response and increment counters
      const isStatus200 = res.status === 200;
      check(res, {
        'Status is 200 OK': (r) => r.status === 200,
        'Content-Type is application/json': (r) => r.headers['Content-Type'] === 'application/json',
      });

      if (isStatus200) {
        successfulResponses.add(1);
      } 
    });
  });
}

export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './HTML_report';
  return {
      [`${outputDirectory}/html_report_1000_devices_VUs_1_${currentTime}.html`]: htmlReport(data),
  };
}
