import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// Test configuration
export const options = {
    scenarios: {
        single_iteration: {
            executor: 'shared-iterations',
            vus: 1,                // 1 Virtual User
            iterations: 1,         // 1 iteration
            maxDuration: '10s',    // Maximum test duration
        },
    },
};

// Test function
export default function () {
    const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data-list?currentPageNumber=1&rowLimitPerPage=0&colName=registerDt&sortDirection=DESC';

    const headers = {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5ODMzNjA1LCJpYXQiOjE3Mjk3NDcyMDV9.zE6D-7ChtFbxMgdOmf4n6C1uFflL4nAK3OmNNzT2TFs',
        'content-type': 'application/json',
        'cookie': '_ga=GA1.1.933019060.1720427785; _ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _ga_WBCCSLWJX2=GS1.1.1728985241.59.0.1728985241.0.0.0',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    };

    const res = http.get(url, { headers });

    // Assertions
    const success = check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
        'content is JSON': (r) => r.headers['Content-Type'] === 'application/json',
    });

    // Log the status and the response body
    console.log(`Response status: ${res.status}`);
    const jsonResponse = JSON.parse(res.body);
    console.log(`Response body: ${JSON.stringify(jsonResponse, null, 2)}`);

    // If the body is JSON, parse it and log a specific field
    try {
        console.log(`First shipping data: ${JSON.stringify(jsonResponse.details[0])}`);
    } catch (e) {
        console.log('Failed to parse JSON response.');
    }

    sleep(1); // Simulate a 1-second delay
}
