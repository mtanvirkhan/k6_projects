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
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/create-notification';

  const payload = JSON.stringify({
    server_region_list: [1],
    notification_type: 'Announcement',
    user_type: 'ALL',
    destination_type: 'Bell',
    is_scheduled: false,
    notification_status: 'SUBMITTED',
    bell_message_title: 'API Testing k6 tool',
    bell_message_detail: 'Good Morning',
  });

  const params = {
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NzQ2NDA0LCJpYXQiOjE3Mjk2NjAwMDR9.nwKBof_ZLKsSHAvkxlmzdxaXw8JyBHqDCCEKMHgDRwg',
      'content-type': 'application/json',
      'cookie': '_ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _gcl_au=1.1.1447242264.1729228498; _ga_M22JEL3M6T=GS1.1.1729228498.1.0.1729228498.60.0.0; _ga=GA1.1.1380924625.1729228499; cto_bundle=yzZ-n19PMW1JUXYlMkY3dXB6UCUyQkclMkZKeU5kUWNNRzBYVXFTTDNBSVVmWkdxZkN6V0I3dDY1djNFUjA5RTFiWURnN1U1T1RkVUhMMGIyTiUyQkpiWk5xR1BhVXd5SGFzWm5ZQUJPMmNGcXk5MTVmbUdmVGJYaTZmTEVxeU1oT2N3WGY1SWtxcWt4TjMwMHpweE1yS2hpc2ZvNVlFQXFadGRhVDZ4djhFSmd0ZnkwcnNiWDhnSSUzRA; _ga_WBCCSLWJX2=GS1.1.1729234108.61.0.1729234108.0.0.0',
      'origin': 'https://cw-consolebo.global.qa.pocketalk.com',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    },
  };

  // Send POST request to create notification
  const res = http.post(url, payload, params);

  // Parse the response as JSON
  const jsonResponse = JSON.parse(res.body);

  // Log the response for debugging
  console.log(`jsonResponse: ${JSON.stringify(jsonResponse)}`);
  console.log(`Response time: ${res.timings.waiting} ms`);
  console.log(`Load time: ${res.timings.duration} ms`);

  // Assertions (Checks)
  const result = check(res, {
    'status is 201': (r) => r.status === 201,
    'success is true': (r) => jsonResponse.success === true, // Adjust based on actual structure
    'result_code is CREATED': (r) => jsonResponse.result_code === 'CREATED', // Adjust based on actual structure
    'message is Notification has been submitted': (r) => jsonResponse.message === 'Notification has been submitted' // Adjust based on actual expected message
  });

  // Tagging checks for threshold assertions
  result && res.status === 200 && check(res, { 'status:200': (r) => r.status === 200 });
}
