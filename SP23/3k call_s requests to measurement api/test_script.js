import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    stress_test: {
      executor: 'constant-vus',
      vus: 1000, // Number of Virtual Users
      duration: '1s', // Duration for stress testing
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

const url = 'https://cw-console.us.qa.pocketalk.com/iotconsoleapi-co/api/pub/measurement';
const headers = {
  'Content-Type': 'application/json',
  'Cookie': 'XSRF-TOKEN=dd4577e3-9802-447a-8761-1571fc6fc587',
};

const payload = JSON.stringify({
  mcc: '440',
  mnc: '100',
  lac: '1234',
  cid: '12345678',
  networktype: 'mobile',
  fromlang: 'es',
  tolang: 'ar',
  fromlength: 63,
  tolength: 21,
  fromtext: 'සුභ සන්ධ්යාවක්_100_VUs',
  totext: 'শুভ সকাল_100_VUs',
  total: 1291,
  timestamp: '2024-10-22 08:50:33',
  imei1: '743219977000201',
  imei2: '743219978000201',
  ipaddress: '150.21.16.225',
  devicetype: 'POCKETALK3',
  version: '3.1.02_stg 0.4.8 3.0.4',
  description: [
    { api: 'Google Cloud Speech-to-Text', time: 321, type: 'STT-total', conversionEngine: '' },
    { api: 'Microsoft Text to Speech', time: 457, type: 'TTT-total', conversionEngine: 'Google' },
    { api: 'NICT', time: 513, type: 'TTS-total', conversionEngine: 'ResponsiveVoice' },
    { api: 'NICT', time: 96, type: 'TTS-connection', conversionEngine: 'ResponsiveVoice' },
    { api: 'NICT', time: 103, type: 'TTS-call', conversionEngine: 'ResponsiveVoice' },
    { api: 'NICT', time: 314, type: 'TTS-response', conversionEngine: 'ResponsiveVoice' },
  ],
});

export default function () {
  const start = new Date().getTime(); // Start time for load time calculation
  const res = http.post(url, payload, { headers });
  const end = new Date().getTime(); // End time for load time calculation

  const loadTime = end - start; // Calculate load time

  // Validate response
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Log results
  console.log(`Status code: ${res.status}`);
  console.log(`Load time: ${loadTime} ms`);

  sleep(0.01); // Optional small delay
}

export function handleSummary(data) {
  const currentTime = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDirectory = './html_report'; // Custom folder to store reports

  // Create HTML report
  return {
    [`${outputDirectory}/html_report_100_VUs_${currentTime}.html`]: htmlReport(data),
  };
}
