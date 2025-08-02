import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // Number of Virtual Users
  iterations: 1, // Number of iterations per user
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1 second
  },
};

export default function () {
  const url = 'https://cw-consolebo.global.qa.pocketalk.com/iotconsoleapi-global-bo/api/authenticate';

  const headers = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'authorization': 'Basic YWRtaW46cWFfY0Buc29sZQ==', // Base64-encoded 'admin:qa_c@nsole'
    'content-type': 'application/json',
    'cookie': '_ga=GA1.1.1805768314.1688010701; _ga_2DLP278ETJ=GS1.1.1728040485.4.0.1728040485.0.0.0; _ga_WBCCSLWJX2=GS1.1.1729219054.43.0.1729219054.0.0.0', // Adjust cookies as necessary
    'origin': 'https://cw-consolebo.global.qa.pocketalk.com',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const payload = JSON.stringify({
    sub: "114751009888203098447",
    name: "M. Tanvir Khan",
    given_name: "M. Tanvir",
    family_name: "Khan",
    picture: "https://lh3.googleusercontent.com/a-/ALV-UjXDiP6gYSyGn1A58rNX1yxdAWxFY1VTILISTojkbgkAIgs2_cGUjjvtbjforLE56gg8HnV432Aw7fMqhlcES8BoOAIJYt9aD35gMeJmjCghbADyJeEAvRWH6vQ6L65H1YkcKamKMWBoCa23lZkRoSaFRxExGU_J80Ci7xciHs18jOz_sWK8YzpR1Tf-oEPojeAW81WbfzrX5kYPsM9A5clmbOXyUS5Vjnrp9ZKqBfTK_CLNsse2IQfQD1DpPOaSNuYvsU2nJTZsTNfeNbBmybIUEeeU4vmWedrDimjg1HtRxFqUGKWIcmVe3uMNpxNH9pi61hNGT71zWiLXAWi1n610wgnwcJZ_-HRM3x3dnByz0yx0Zgu77cXHUOW7uI7KRG3sqK42hNeDZCfmYLcBBMecXAnlfPoUMlFDJUuQ6z-ydhXi1Ijx7_iT8-zOsUmLVVNGNU_khF1c99tOIRpqxnjpNG5cZlREflZCKShYje3N5-UQi7JJeoTp8RD7FiLhiPUX_DsOZXeK8oWUHlErbNrTfUzsX6IRV_yJdqGjqw4Tmg2VPiT9an4Y7950pBIvEdk-e2SZDzDj9eXUGyu0LYuZiWFCvdPTyWUemQrDsjBVRZ8m-ll77eMGO9vNudV65476rY_md0N3x1iRo6uDvJn3KLULWHH9WwKvuG4__yep1BtN-3HKUumevjamCbWQ_nBdiuuF0hmGee0Us9fWztkRCirxL6mrDZ9n0UmWReinJd0QpHB8iB0AIpSMK7cMsEDeIDPSrZl846etqU3qHNpDozOw-atR8msBj69-4mvLtLJPg32qIS-eEEgLWU1Ps5x3ZZetAOSN4nqeGzvv5nsTYbK-wSqp4y_09L51AIEfT4YzMVf1vuW4cpTGbfa5Le4TNWnk2c8sxc6jlzZTQ_nkRbF5rWo_txhNyFEjdEz7qBJcGLY1JNQGdSnFIMcqQVxiT__fefG9H-6iKg-dGNpzbz0=s96-c",
    email: "tanvir.khan@bjitgroup.com",
    email_verified: true,
    access_token: "ya29.a0AcM612yqMplEQiZYVkS2SkWR22NWEBaotntvLxyUP4gSEvxEgFGH_P9JDVPvj37lawdqkZUrvBb7BmWEAeM7Ec4IGStq3NF23sUF0R5ZWWZN0gFRnVlW1eE6ASvxm29yUhUj5"
  });

  const res = http.post(url, payload, { headers });

  // Check if the response is successful
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Log response for debugging
  console.log(`Status: ${res.status}`);
  console.log(`Response time: ${res.timings.duration} ms`);
  console.log(`Response body: ${res.body}`);

  sleep(1);
}
