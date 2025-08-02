import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// Set options for a single virtual user and iteration
export let options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/private/corporation-delete?corpId=6g6EOptGGMLFrMHKWfeh';
    
    const params = {
        headers: {
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzI5ODMzNjA1LCJpYXQiOjE3Mjk3NDcyMDV9.zE6D-7ChtFbxMgdOmf4n6C1uFflL4nAK3OmNNzT2TFs',
            'content-type': 'application/json',
            'cookie': '_ga_2DLP278ETJ=GS1.1.1724912934.2.0.1724912934.0.0.0; _ga_YP22J0LB75=GS1.1.1726713909.12.0.1726713909.0.0.0; _gcl_au=1.1.1447242264.1729228498; _ga_M22JEL3M6T=GS1.1.1729228498.1.0.1729228498.60.0.0; _ga=GA1.1.1380924625.1729228499; cto_bundle=yzZ-n19PMW1JUXYlMkY3dXB6UCUyQkclMkZKeU5kUWNNRzBYVXFTTDNBSVVmWkdxZkN6V0I3dDY1djNFUjA5RTFiWURnN1U1T1RkVUhMMGIyTiUyQkpiWk5xR1BhVXd5SGFzWm5ZQUJPMmNGcXk5MTVmbUdmVGJYaTZmTEVxeU1oT2N3WGY1SWtxcWt4TjMwMHpweE1yS2hpc2ZvNVlFQXFadGRhVDZ4djhFSmd0ZnkwcnNiWDhnSSUzRA',
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

    // Send DELETE request
    let res = http.del(url, null, params);

    // Assertions to validate response
    check(res, {
        'status is 200': (r) => r.status === 200,  // Ensure the response status is 200 (OK)
        'response time is less than 500ms': (r) => r.timings.duration < 500,  // Ensure response time is below 500ms
        'transaction time is below 1 second': (r) => r.timings.duration < 1000,  // Ensure overall transaction is under 1 second
    });

    // Log response details
    console.log(`Status: ${res.status}`);
    console.log(`Status from response body: ${JSON.parse(res.body).status}`)
    console.log(`Response time: ${res.timings.duration} ms`);
    console.log(`Response body: ${res.body}`);

    // Parse and log the JSON response (if any)
    try {
        let jsonResponse = JSON.parse(res.body);
        console.log(`Parsed JSON: ${JSON.stringify(jsonResponse, null, 2)}`);
    } catch (err) {
        console.log('Response is not valid JSON or is empty.');
    }

    sleep(1);  // Optional delay before next iteration
}
