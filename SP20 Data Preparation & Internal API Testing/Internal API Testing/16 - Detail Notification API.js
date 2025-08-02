import http from 'k6/http';
import { check, group } from 'k6';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Set options with one iteration
export let options = {
    scenarios: {
        single_iteration: {
            executor: 'per-vu-iterations',
            vus: 1,  // Only one virtual user
            iterations: 1,  // Only one iteration
            maxDuration: '1m',  // Maximum duration for the test
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],  // 95% of requests should be below 500ms
    },
};

export default function () {
    const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/get-notification-detail?notificationId=2684&serverRegionId=1';

    const params = {
        headers: {
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5NzQ2NDA0LCJpYXQiOjE3Mjk2NjAwMDR9.nwKBof_ZLKsSHAvkxlmzdxaXw8JyBHqDCCEKMHgDRwg',
            'content-type': 'application/json',
            'cookie': '_ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _gcl_au=1.1.1447242264.1729228498; _ga_M22JEL3M6T=GS1.1.1729228498.1.0.1729228498.60.0.0; _ga=GA1.1.1380924625.1729228499; cto_bundle=yzZ-n19PMW1JUXYlMkY3dXB6UCUyQkclMkZKeU5kUWNNRzBYVXFTTDNBSVVmWkdxZkN6V0I3dDY1djNFUjA5RTFiWURnN1U1T1RkVUhMMGIyTiUyQkpiWk5xR1BhVXd5SGFzWm5ZQUJPMmNGcXk5MTVmbUdmVGJYaTZmTEVxeU1oT2N3WGY1SWtxcWt4TjMwMHpweE1yS2hpc2ZvNVlFQXFadGRhVDZ4djhFSmd0ZnkwcnNiWDhnSSUzRA; _ga_WBCCSLWJX2=GS1.1.1729234108.61.0.1729234108.0.0.0',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        },
    };

    let res = http.get(url, params);

    // Validate and check conditions
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 1000ms': (r) => r.timings.duration < 1000,
        'transaction time OK': (r) => r.timings.duration < 1000, // Ensure total transaction time is less than 1 second
        'response contains valid JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    });

    // Log details to the console
    console.log(`Status: ${res.status}`);
    console.log(`Response body: ${res.body}`);
    console.log(`Response time: ${res.timings.waiting} ms`);
    console.log(`Load time: ${res.timings.duration} ms`);

    // Parse JSON response
    /*
    try {
        let jsonResponse = JSON.parse(res.body);
        console.log(`Parsed JSON: ${JSON.stringify(jsonResponse, null, 2)}`);
    } catch (err) {
        console.log('Error parsing JSON:', err);
    }
    */

    sleep(1); // Optional sleep to simulate waiting time
}