import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Counter, Gauge } from 'k6/metrics'; // Import Gauge for throughput and other metrics
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

let logData = '';

// Load CSV data
const csvData = new SharedArray('another data name', function () {
  return open('./SP16_45K_devices_BJIT_Rifat.csv')
    .split('\n')
    .filter((line) => line.trim() !== '') // Filter out empty lines
    .map((line) => line.replace('\r', '').split(','));
});

// Initialize custom metrics
const successfulResponses = new Counter('successful_responses');
const failedRequests = new Counter('failed_requests');
const responseTimeTrend = new Trend('response_time'); // Latency measurement
const requestSize = new Counter('request_size');
const responseSize = new Counter('response_size');
const throughputGauge = new Gauge('throughput'); // For calculating throughput (requests per second)
const bandwidthGauge = new Gauge('bandwidth'); // For calculating bandwidth (bytes per second)

export const options = {
  scenarios: {
    default: {
      executor: 'constant-vus',
      vus: 1,
      duration: '45m', // Increase the total test duration
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
    http_req_waiting: ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    http_req_duration: ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    iteration_duration: ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    group_duration: ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    response_time: ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    http_req_failed: ['rate<0.01'],
    successful_responses: ['rate>0.0'],
    vus: ['value==4'],
    'http_req_duration{status:200}': ['avg<1000000', 'min<1000000', 'med<1000000', 'max<1000000', 'p(95)<1000000', 'p(90)<1000000'],
    'http_req_duration{url:https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data/}': ['avg<200000', 'min<200000', 'med<200000', 'max<200000', 'p(95)<200000', 'p(90)<200000']
  }
};

export default function () {
  group('Testing PT Console API', function () {
    const payload = csvData.join('\n'); // Join the CSV data back into a single string

    const JWT_token = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXRvbi5taWFoQGJqaXRncm91cC5jb20iLCJleHAiOjE3MjM3MTIwMjcsImlhdCI6MTcyMzYyNTYyN30.bwEXIIep1WVpKQDMSwmFjZ0RDpJ8ly1FpEMZ0h4BnkY'
      },
      timeout: '6000000ms'
    };

    const formData = {
      csv_file: http.file(payload, 'Up-loading 45K devices US_VUs 1 using k6 testing tool', 'text/csv'),
    };

    group('Checking shipping device import', function () {
      let startTime = new Date().getTime(); // Record start time
      let res = http.post(
        'https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data/',
        formData,
        JWT_token
      );
      let endTime = new Date().getTime(); // Record end time

      let requestDuration = (endTime - startTime) / 1000; // Duration in seconds
      let payloadSize = payload.length; // Payload size in bytes
      let responseSizeBytes = res.body.length; // Response size in bytes

      // Record custom metrics
      responseTimeTrend.add(res.timings.duration); // Record latency
      requestSize.add(payloadSize); // Record request size
      responseSize.add(responseSizeBytes); // Record response size
      throughputGauge.add(1 / requestDuration); // Requests per second
      bandwidthGauge.add((payloadSize + responseSizeBytes) / requestDuration); // Bytes per second

      if (res.status !== 200) {
        failedRequests.add(1);
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
        logData += `Successful request with status ${res.status}\n`; // Store status log information
      } else {
        logData += `Failed request with status ${res.status}\n`; // Store status log information
      }

      // Add think time
      sleep(Math.random() * 2); // Random sleep time between 0 and 2 seconds
    });
  });
}

export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './HTML_.jpg_report';

  // Add log data to summary
  data.logData = logData;

  return {
    [`${outputDirectory}/html_report_45K_devices_US_VUs 1_${currentTime}.html`]: htmlReport(data),
  };
}
