import http from 'k6/http';
import { check } from 'k6';

// Test configuration with 1 VU and 1 iteration
export const options = {
  scenarios: {
    single_iteration: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
    },
  },
  thresholds: {
    // Ensure that the request duration is below 500ms for 95% of the time
    http_req_duration: ['p(95)<500'],
    // 100% of checks should pass
    'checks': ['rate>0.99'],
  },
};

export default function () {
  // Set up request URL and headers
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/downloadcsvfrombackup?fileName=Device_Import_Check.csv';

  const params = {
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NjUzMDMyLCJpYXQiOjE3Mjk1NjY2MzJ9.M_kFibRMAkELtv05rm6xYftSCIitIH7sqHWjSTSWhcw',
      'cookie': '_ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _gcl_au=1.1.1447242264.1729228498; _ga_M22JEL3M6T=GS1.1.1729228498.1.0.1729228498.60.0.0; _ga=GA1.1.1380924625.1729228499; cto_bundle=yzZ-n19PMW1JUXYlMkY3dXB6UCUyQkclMkZKeU5kUWNNRzBYVXFTTDNBSVVmWkdxZkN6V0I3dDY1djNFUjA5RTFiWURnN1U1T1RkVUhMMGIyTiUyQkpiWk5xR1BhVXd5SGFzWm5ZQUJPMmNGcXk5MTVmbUdmVGJYaTZmTEVxeU1oT2N3WGY1SWtxcWt4TjMwMHpweE1yS2hpc2ZvNVlFQXFadGRhVDZ4djhFSmd0ZnkwcnNiWDhnSSUzRA; _ga_WBCCSLWJX2=GS1.1.1729234108.61.0.1729234108.0.0.0',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
    }
  };

  // Send GET request to download CSV
  const res = http.get(url, params);

  // Parse the response as text (CSV data)
  const csvContent = res.body;

  // Assertions (Checks)
  const result = check(res, {
    'status is 200': (r) => r.status === 200,
    'response contains CSV data': (r) => csvContent.includes('csv'),
  });

  // Log if checks pass or fail
  if (result) {
    console.log('CSV download successful');
  } else {
    console.error('CSV download failed');
  }
}
