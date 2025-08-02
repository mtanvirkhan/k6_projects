import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load CSV data
const csvData = new SharedArray('another data name', function () {
  return open('./SP13_Shipping_Load_Testing_7_devices_50K+data.csv')
    .split('\n')
    .filter((line) => line.trim() !== '') // Filter out empty lines
    .map((line) => line.replace('\r', '').split(','));
});

console.log(csvData);


export const options = {
    vus: 1,
    iterations: 1
}

export default function () {
  group("Testing PT Console API", function () {
    const payload = csvData.join('\n'); // Join the CSV data back into a single string

    console.log(payload);

    const params = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW52aXIua2hhbkBiaml0Z3JvdXAuY29tIiwiZXhwIjoxNzIyMzI3MTQyLCJpYXQiOjE3MjIyNDA3NDJ9.GbXg_3LEa8gzXQfEhl2galCV8Afsc7ZMEsgFWI8yxgE',
        // 'Content-Type': 'multipart/form-data', // Do not set Content-Type header manually
      },
      timeout: '1000s'
    };

    const formData = {
      csv_file: http.file(payload, 'SP13_Shipping_Load_Testing_7_devices_50K+data.csv', 'text/csv'),
    };

    //console.log(formData);

    sleep(30);

    group("Checking shipping data upload", function () {
      let res = http.post('https://qa-global-consolebk.pocketalk.com/iotconsoleapi-global-bo/api/private/shipping-data/', formData, params);

      console.log(`Response status: ${res.status}`);
      console.log(`Response body: ${res.body}`);

      check(res, {
        "Status is 200 OK": (r) => r.status === 200,
        "Content-Type is JSON": (r) => r.headers["Content-Type"] === 'application/json',
        "Content-Length is smaller than 200": (r) => parseInt(r.headers["Content-Length"]) < 200
      });
    });
  });

  
}
